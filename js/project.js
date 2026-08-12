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
    
    if (!projectColor) projectColor = '#00f7ff';
    
    document.documentElement.style.setProperty('--project-color', projectColor);
    
    const hexToRgbLocal = (hex) => {
        if (!hex) return { r: 0, g: 247, b: 255 };
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 247, b: 255 };
    };
    
    const rgb = hexToRgbLocal(projectColor.startsWith('#') ? projectColor : '#00f7ff');
    document.documentElement.style.setProperty('--project-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    
    // Llenar datos
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-longDesc').textContent = project.longDesc;
    
    const tagsContainer = document.getElementById('project-tags-inline');
    if (tagsContainer) {
        tagsContainer.innerHTML = project.tags.map(t => `<span class="tag-premium-modern"><i class="${tagIcons[t] || 'fas fa-code'}"></i> ${t}</span>`).join('');
    }
    
    const featuresContainer = document.getElementById('project-features-main');
    if (featuresContainer) {
        featuresContainer.innerHTML = project.features.map(f => {
            const parts = f.split(':');
            if (parts.length > 1) {
                return `<div class="feature-item"><i class="fas fa-check feature-icon"></i> <div><strong style="color: #fff;">${parts[0]}:</strong>${parts.slice(1).join(':')}</div></div>`;
            }
            return `<div class="feature-item"><i class="fas fa-check feature-icon"></i> <div>${f}</div></div>`;
        }).join('');
    }
    
    const linksContainer = document.getElementById('project-links-inline');
    if (linksContainer) {
        let linksHTML = '';
        if (project.repo && project.repo !== "#") {
            linksHTML += `<a href="${project.repo}" target="_blank" class="btn-console"><i class="fab fa-github"></i> Código Fuente</a>`;
        }
        if (project.demo && project.demo !== "#") {
            linksHTML += `<a href="${project.demo}" target="_blank" class="btn-console"><i class="fas fa-external-link-alt"></i> Aplicación / Demo</a>`;
        }
        linksHTML += `<a href="index.html#projects" class="btn-console" style="background: rgba(0, 247, 255, 0.15); border-color: var(--project-color);"><i class="fas fa-cube"></i> Experiencia Museo 3D</a>`;
        linksContainer.innerHTML = linksHTML;
    }
    
    // Campos detallados
    document.getElementById('project-problem').textContent = project.problem || 'No especificado.';
    document.getElementById('project-duration').textContent = project.duration || 'No especificado.';

    let lightboxGroups = [];

    // Versiones
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
    
    // Complicaciones
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
    
    window.lightboxGroups = lightboxGroups;
    window.currentGroupIndex = 0;
    window.currentLightboxIndex = 0;
    
    setupLightbox();
    
    document.getElementById('project-main').style.display = 'block';
});

function openLightboxGroup(groupIndex, imageIndex) {
    if (!window.lightboxGroups || window.lightboxGroups.length === 0) return;
    window.currentGroupIndex = groupIndex;
    window.currentLightboxIndex = imageIndex;
    
    updateLightbox();
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
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
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });
}
