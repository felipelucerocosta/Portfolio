document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    
    if (!idParam) {
        window.location.href = 'index.html';
        return;
    }
    
    const projectId = parseInt(idParam);
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        window.location.href = 'index.html';
        return;
    }
    
    // Configurar el color dinámico del proyecto
    const root = document.documentElement;
    let projectColor = project.color;
    
    if (projectColor && projectColor.startsWith('var(--')) {
        const varName = projectColor.match(/var\((--.*?)\)/);
        if (varName && varName[1]) {
            projectColor = getComputedStyle(root).getPropertyValue(varName[1]).trim();
        }
    }
    
    if (!projectColor) projectColor = '#39ff14'; // Fallback a neon green
    
    document.documentElement.style.setProperty('--project-color', projectColor);
    
    const hexToRgbLocal = (hex) => {
        if (!hex) return { r: 57, g: 255, b: 20 };
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 57, g: 255, b: 20 };
    };
    
    const rgb = hexToRgbLocal(projectColor.startsWith('#') ? projectColor : '#39ff14');
    document.documentElement.style.setProperty('--project-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    
    // Llenar datos
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-longDesc').textContent = project.longDesc;
    
    const tagIcons = {
        'ReactJS': 'devicon-react-original colored',
        'Node.js': 'devicon-nodejs-plain colored',
        'Express': 'devicon-express-original',
        'PostgreSQL': 'devicon-postgresql-plain colored',
        'Javascript': 'devicon-javascript-plain colored',
        'Python': 'devicon-python-plain colored',
        'Django': 'devicon-django-plain',
        'C#': 'devicon-csharp-plain colored',
        '.NET': 'devicon-dot-net-plain colored',
        'SQL Server': 'devicon-microsoftsqlserver-plain',
        'HTML5': 'devicon-html5-plain colored',
        'CSS3': 'devicon-css3-plain colored',
        'Tailwind': 'devicon-tailwindcss-plain colored',
        'Java': 'devicon-java-plain colored',
        'PHP': 'devicon-php-plain colored',
        'Sass': 'devicon-sass-original colored',
        'Next.js': 'devicon-nextjs-original',
        'TypeScript': 'devicon-typescript-plain colored',
        'Supabase': 'devicon-supabase-plain colored',
        'Firebase': 'devicon-firebase-plain colored',
        'Stripe': 'fab fa-stripe',
        'WebSockets': 'fas fa-plug',
        'Socket.io': 'devicon-socketio-original',
        'MongoDB': 'devicon-mongodb-plain colored',
        'React Native': 'devicon-react-original colored',
        'Expo': 'fas fa-mobile-alt'
    };

    const tagsContainer = document.getElementById('project-tags-inline');
    if (tagsContainer) {
        tagsContainer.innerHTML = project.tags.map(t => `<span class="tag-premium"><i class="${tagIcons[t] || 'fas fa-code'}"></i> ${t}</span>`).join('');
    }
    
    const featuresContainer = document.getElementById('project-features-main');
    if (featuresContainer) {
        featuresContainer.innerHTML = project.features.map(f => {
            const parts = f.split(':');
            if (parts.length > 1) {
                return `<li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: var(--project-color); margin-right: 8px;"></i> <strong>${parts[0]}:</strong>${parts.slice(1).join(':')}</li>`;
            }
            return `<li><i class="fas fa-check" style="color: var(--project-color); margin-right: 8px;"></i> ${f}</li>`;
        }).join('');
    }
    
    const linksContainer = document.getElementById('project-links-inline');
    if (linksContainer) {
        let linksHTML = '';
        if (project.repo && project.repo !== "#") {
            linksHTML += `<a href="${project.repo}" target="_blank" class="tag-premium" style="text-decoration: none; cursor: pointer; color: #fff;"><i class="fab fa-github"></i> Ver Código</a>`;
        }
        if (project.demo && project.demo !== "#") {
            linksHTML += `<a href="${project.demo}" target="_blank" class="tag-premium" style="text-decoration: none; cursor: pointer; color: #fff;"><i class="fas fa-external-link-alt" style="color: var(--project-color);"></i> Visitar Proyecto</a>`;
        }
        linksContainer.innerHTML = linksHTML;
    }
    
    // Nuevos campos detallados
    document.getElementById('project-problem').textContent = project.problem || 'No especificado.';
    document.getElementById('project-duration').textContent = project.duration || 'No especificado.';

    let lightboxGroups = [];

    // --- Versiones y Entregables (Con Imágenes) ---
    const vGallery = document.getElementById('project-versions-timeline');
    if (project.versions && project.versions.length > 0) {
        vGallery.innerHTML = project.versions.map(stage => {
            if (stage.images && stage.images.length > 0) {
                lightboxGroups.push([...stage.images]);
                const groupIdx = lightboxGroups.length - 1;
                
                const imagesHtml = `<div class="gallery-images-grid">${stage.images.map((img, imgIdx) => 
                    `<img src="${img}" alt="${stage.stage}" onclick="openLightboxGroup(${groupIdx}, ${imgIdx})" onerror="this.style.display='none'">`
                ).join('')}</div>`;
                
                return `
                    <div class="horizontal-timeline-item">
                        <h3 class="horizontal-timeline-title">${stage.stage}</h3>
                        <p class="horizontal-timeline-desc">${stage.desc}</p>
                        ${imagesHtml}
                    </div>
                `;
            } else {
                return `
                    <div class="horizontal-timeline-item">
                        <h3 class="horizontal-timeline-title">${stage.stage}</h3>
                        <p class="horizontal-timeline-desc">${stage.desc}</p>
                    </div>
                `;
            }
        }).join('');
    } else if (project.images && project.images.length > 0) {
        lightboxGroups.push([...project.images]);
        vGallery.innerHTML = `
            <div class="horizontal-timeline-item">
                <h3 class="horizontal-timeline-title">Galería General</h3>
                <p class="horizontal-timeline-desc">Visualizaciones del proyecto.</p>
                <div class="gallery-images-grid">
                    ${project.images.map((img, idx) => `<img src="${img}" alt="Screenshot" onclick="openLightboxGroup(0, ${idx})" onerror="this.style.display='none'">`).join('')}
                </div>
            </div>`;
    } else {
        vGallery.innerHTML = '<p class="about-text" style="opacity: 0.5; padding-top: 1rem;">No hay versiones ni fotos registradas de este proyecto.</p>';
    }
    
    // --- Complicaciones y Soluciones (Sin Imágenes) ---
    const cTimeline = document.getElementById('project-complications-timeline');
    if (project.complications && project.complications.length > 0) {
        cTimeline.innerHTML = project.complications.map(comp => `
            <div class="horizontal-timeline-item">
                <h3 class="horizontal-timeline-title" style="color: #ff4757;">${comp.stage}</h3>
                <p class="horizontal-timeline-desc" style="margin-bottom: 0.5rem; color: #ccc;"><strong>Dificultad:</strong> ${comp.desc}</p>
                <p class="horizontal-timeline-desc" style="color: #2ed573;"><strong>Solución:</strong> ${comp.solution}</p>
            </div>
        `).join('');
    } else {
        cTimeline.innerHTML = '<p class="about-text" style="opacity: 0.5; padding-top: 1rem;">No hubo complicaciones mayores documentadas.</p>';
    }
    
    // Configurar el entorno global del lightbox
    window.lightboxGroups = lightboxGroups;
    window.currentGroupIndex = 0;
    window.currentLightboxIndex = 0;
    
    setupLightbox();
    
    // Mostrar contenido
    document.getElementById('project-main').style.display = 'block';
    
    // Fondo binario animado
    const binaryBg = document.querySelector('.binary-bg');
    if (binaryBg) {
        let binaryContent = '';
        // Increase character count drastically to fill large screens completely
        for (let i = 0; i < 25000; i++) binaryContent += Math.random() > 0.5 ? '0' : '1' + (i % 50 === 0 ? ' ' : '');
        binaryBg.textContent = binaryContent;
        
        setInterval(() => {
            const idx = Math.floor(Math.random() * binaryContent.length);
            binaryContent = binaryContent.substring(0, idx) + (Math.random() > 0.5 ? '0' : '1') + binaryContent.substring(idx + 1);
            binaryBg.textContent = binaryContent;
        }, 150);
    }
    
    // Red base
    initNetworkCanvas();
});

// --- LIGHTBOX LOGIC ---
function openLightboxGroup(groupIndex, imageIndex) {
    if (!window.lightboxGroups || window.lightboxGroups.length === 0) return;
    window.currentGroupIndex = groupIndex;
    window.currentLightboxIndex = imageIndex;
    
    updateLightbox();
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Evitar scroll
    }
}

function updateLightbox() {
    const imgElement = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    const group = window.lightboxGroups[window.currentGroupIndex];
    
    if (imgElement && group) {
        imgElement.src = group[window.currentLightboxIndex];
        counter.textContent = `${window.currentLightboxIndex + 1} / ${group.length}`;
    }
}

function setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!modal) return;

    const closeLightbox = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    const nextImage = () => {
        const group = window.lightboxGroups[window.currentGroupIndex];
        if (!group) return;
        window.currentLightboxIndex = (window.currentLightboxIndex + 1) % group.length;
        updateLightbox();
    };

    const prevImage = () => {
        const group = window.lightboxGroups[window.currentGroupIndex];
        if (!group) return;
        window.currentLightboxIndex = (window.currentLightboxIndex - 1 + group.length) % group.length;
        updateLightbox();
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    
    // Cerrar si hace clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // Soporte para flechas del teclado
    window.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });
}

function initNetworkCanvas() {
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        const initCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            particles = [];
            const density = window.innerWidth < 768 ? 20 : 45;
            for (let i = 0; i < density; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    radius: Math.random() * 1.5 + 0.5
                });
            }
        };

        // Determinar el color una vez por fuera del loop para optimizar el rendimiento (evita lag)
        const rootStyle = getComputedStyle(document.documentElement);
        const projRgb = rootStyle.getPropertyValue('--project-color-rgb').trim() || '112, 0, 255';

        const drawNetwork = () => {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${projRgb}, 0.5)`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 180) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${projRgb}, ${0.25 - dist / (180 * 4)})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawNetwork);
        };

        window.addEventListener('resize', initCanvas);
        initCanvas();
        drawNetwork();
    }
}
