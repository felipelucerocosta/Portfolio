

// Global Variables
let currentGalleryIndex = 0;
let currentProjectImages = [];
let currentRotation = 0;
let isDragging = false;
let startX = 0;
let previousX = 0;
let velocity = 0;
let animationId = null;

// Typewriter Logic
const typewriterElement = document.getElementById('typewriter');
const phrases = ["Interfaces Frontend.", "Arquitectura de Redes.", "Experiencias Web.", "Infraestructura LAN."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        el.textContent = currentPhrase.substring(0, charIndex--);
    } else {
        el.textContent = currentPhrase.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentPhrase.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 150);
    }
}

// Project Rendering
function renderProjects(filter = 'todos') {
    const projectContainer = document.getElementById('project-container');
    if (!projectContainer) return;

    const filteredProjects = filter === 'todos' ? projects : projects.filter(p => p.theme === filter);
    projectContainer.innerHTML = '';
    
    filteredProjects.forEach((project, index) => {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.dataset.id = project.id;
        div.dataset.index = index;
        
        // Random neon color if using default var
        const projectColor = (project.color.startsWith('var') || !project.color) ? neonColors[index % neonColors.length] : project.color;
        div.style.setProperty('--project-color', projectColor);
        
        const rgb = hexToRgb(projectColor);
        if (rgb) div.style.setProperty('--project-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        
        div.style.animationDelay = `${index * 0.1}s`;
        
        div.innerHTML = `
            <div class="project-card-inner">
                <div class="glare"></div>
                <div class="project-img">
                    <div class="mesh-bg"></div>
                    ${(() => {
                        let imgSrc = '';
                        let altTxt = 'Logo';
                        if (project.theme === 'programas') imgSrc = 'img/Tecnología y productividad en acción.png';
                        else if (project.theme === 'web') imgSrc = 'img/Logo minimalista con globo y www.png';
                        else if (project.theme === 'ia') imgSrc = 'img/IA.png';
                        
                        return imgSrc 
                            ? `<img src="${imgSrc}" class="project-logo-img" alt="${altTxt}" onerror="this.src='https://via.placeholder.com/150?text=${project.theme}'">`
                            : `<i class="${project.icon} project-logo"></i>`;
                    })()}
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                    <div class="project-action">Ver Detalles <i class="fas fa-plus"></i></div>
                </div>
            </div>
        `;
        div.addEventListener('click', () => {
            if (div.classList.contains('active')) openModal(project);
        });
        projectContainer.appendChild(div);
    });
    
    initCarousel();
    initTilt();
}

// Carousel Logic
function initCarousel() {
    const ring = document.getElementById('project-container');
    const cards = ring?.querySelectorAll('.project-card');
    if (!cards || cards.length === 0) return;

    const angle = 360 / cards.length;
    const radius = window.innerWidth < 900 ? 650 : 1100;

    cards.forEach((card, i) => {
        const cardAngle = i * angle;
        card.style.setProperty('--card-angle', `${cardAngle}deg`);
        card.style.setProperty('--card-radius', `${radius}px`);
        card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;
        card.setAttribute('data-angle', cardAngle);
    });

    currentRotation = 0;
    applyRotation(ring, 0, angle);
}

function applyRotation(ring, rotation, angle) {
    if (!ring) return;
    ring.style.transform = `rotateY(${rotation}deg)`;
    updateActiveCard(rotation, angle);
}

function updateActiveCard(rotation, angle) {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;
    
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    let activeIndex = 0;
    let minDiff = 360;

    cards.forEach((card, i) => {
        const cardAngle = parseFloat(card.getAttribute('data-angle'));
        const totalAngle = (cardAngle + normalizedRotation) % 360;
        let diff = totalAngle > 180 ? 360 - totalAngle : totalAngle;
        card.style.zIndex = Math.round(1000 - (diff * 2));

        if (diff < minDiff) {
            minDiff = diff;
            activeIndex = i;
        }
    });
    
    cards.forEach((card, i) => {
        card.classList.toggle('active', i === activeIndex);
        const isNeighbor = i === (activeIndex + 1) % cards.length || i === (activeIndex - 1 + cards.length) % cards.length;
        card.classList.toggle('neighbor', isNeighbor);
    });
}

// Modal Functions
function openModal(project) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-category').textContent = project.category;
    document.getElementById('modal-long-desc').textContent = project.longDesc;
    document.getElementById('modal-icon').className = project.icon;
    
    const root = document.documentElement;
    const projectColor = project.color.startsWith('var--') ? getComputedStyle(root).getPropertyValue('--' + project.color.split('--')[1]).trim() : project.color;
    modal.style.setProperty('--modal-color', projectColor);

    const rgb = hexToRgb(projectColor);
    if(rgb) modal.style.setProperty('--modal-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);

    document.getElementById('modal-tags').innerHTML = project.tags.map(t => `<span class="tag-premium"><i class="${tagIcons[t] || 'fas fa-code'}"></i> ${t}</span>`).join('');
    document.getElementById('modal-features-list').innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
    
    const repoBtn = document.getElementById('modal-repo');
    if (repoBtn) {
        repoBtn.href = project.repo;
        repoBtn.style.display = (project.repo && project.repo !== "#") ? "flex" : "none";
    }
    
    const demoBtn = document.getElementById('modal-demo');
    if (demoBtn) {
        demoBtn.href = project.demo;
        demoBtn.style.display = (project.demo && project.demo !== "#") ? "flex" : "none";
    }

    const processBtn = document.getElementById('modal-process');
    if (processBtn) {
        processBtn.href = 'project.html?id=' + project.id;
    }

    currentProjectImages = project.images || [];
    currentGalleryIndex = 0;
    renderGallery();

    modal.classList.add('active');
    document.body.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-active');
        document.body.style.overflow = '';
    }
}

function renderGallery() {
    const slider = document.getElementById('gallery-slider');
    const dotsContainer = document.getElementById('gallery-dots');
    const icon = document.getElementById('modal-icon');
    if (!slider || !dotsContainer) return;

    slider.innerHTML = '';
    dotsContainer.innerHTML = '';

    if (currentProjectImages.length > 0) {
        if(icon) icon.style.opacity = '0.1';
        currentProjectImages.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${img}" alt="Captura ${index + 1}" onerror="this.src='https://via.placeholder.com/800x450/000000/39ff14?text=Captura+indisponible'">`;
            slider.appendChild(item);

            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentGalleryIndex = index;
                updateGalleryUI();
            });
            dotsContainer.appendChild(dot);
        });
        updateGalleryUI();
    } else {
        if(icon) icon.style.opacity = '1';
    }
}

function updateGalleryUI() {
    const slider = document.getElementById('gallery-slider');
    const dots = document.querySelectorAll('.dot');
    if (slider) slider.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentGalleryIndex));
}

function hexToRgb(hex) {
    if (!hex) return { r: 177, g: 94, b: 255 };
    if (hex.startsWith('var')) return { r: 177, g: 94, b: 255 };
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 177, g: 94, b: 255 };
}

function initTilt() {
    const cards = document.querySelectorAll('.project-card:not(.tilt-applied), .timeline-content:not(.tilt-applied), .image-box:not(.tilt-applied)');
    cards.forEach(card => {
        card.classList.add('tilt-applied');
        // For project cards, we transform the 'inner', for timeline and image-box we transform the card itself
        const target = card.classList.contains('project-card') ? card.querySelector('.project-card-inner') : card;
        if (!target) return;

        card.addEventListener('mousemove', (e) => {
            if (card.classList.contains('project-card') && !card.classList.contains('active')) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const isTimeline = card.classList.contains('timeline-content');
            const isImageBox = card.classList.contains('image-box');
            const isLeft = isTimeline && card.closest('.timeline-item').offsetLeft < 100; // Rough check for side
            
            const divisor = isTimeline ? 10 : (isImageBox ? 15 : 8); 
            let rotateX = (centerY - y) / divisor; 
            let rotateY = (x - centerX) / divisor;
            
            // Add base rotation to face the center for timeline
            if (isTimeline) {
                rotateY += (isLeft ? 15 : -15); // Base tilt towards center
            }
            
            const zDepth = isTimeline ? '45px' : (isImageBox ? '20px' : '55px');
            const scale = isTimeline ? 1.05 : (isImageBox ? 1.03 : 1.05);
            target.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${zDepth}) scale3d(${scale}, ${scale}, ${scale})`;
            
            const glare = target.querySelector('.glare');
            if (glare) {
                const percX = (x / rect.width) * 100;
                const percY = (y / rect.height) * 100;
                glare.style.setProperty('--x', `${percX}%`);
                glare.style.setProperty('--y', `${percY}%`);
                const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                const maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
                glare.style.opacity = (dist / maxDist) * 0.3;
            }

            const mesh = target.querySelector('.mesh-bg');
            if (mesh) {
                const mx = (x - centerX) / 20;
                const my = (y - centerY) / 20;
                mesh.style.transform = `translate3d(${mx}px, ${my}px, -10px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            target.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0) scale3d(1, 1, 1)`;
            const glare = target.querySelector('.glare');
            if (glare) glare.style.opacity = '0';
            const mesh = target.querySelector('.mesh-bg');
            if (mesh) mesh.style.transform = `translate3d(0, 0, 0)`;
        });
    });
}

// Initialization and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Render Categorized Skills
    Object.keys(skillsData).forEach(category => {
        const container = document.getElementById(`${category}-skills`);
        if (container) {
            skillsData[category].forEach(skill => {
                const div = document.createElement('div');
                div.className = 'skill-item';
                if (skill.isSvg) {
                    div.innerHTML = `${svgIcons[skill.icon]}<span class="skill-name">${skill.name}</span>`;
                } else {
                    div.innerHTML = skill.isImage 
                        ? `<img src="${skill.icon}" alt="${skill.name}" class="skill-icon-img"><span class="skill-name">${skill.name}</span>`
                        : `<i class="${skill.icon}"></i><span class="skill-name">${skill.name}</span>`;
                }
                
                if (skill.level) {
                    let levelColor = '#00f7ff'; // Cyan as intermediate/default
                    if (skill.level.includes('Auxiliar') || skill.level.includes('Básico')) levelColor = '#94a3b8'; // Elegant Slate
                    if (skill.level === 'Avanzado') levelColor = '#b15eff'; // Bioluminescent Purple
                    
                    div.innerHTML += `<span class="skill-level-badge" style="border-color: ${levelColor}; color: ${levelColor}; box-shadow: inset 0 0 8px ${levelColor}22, 0 0 8px ${levelColor}11;">${skill.level}</span>`;
                }
                
                container.appendChild(div);
            });
        }
    });

    // Render Projects
    renderProjects();

    // Filters Setup
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (document.startViewTransition) {
                document.startViewTransition(() => {
                    renderProjects(btn.dataset.filter);
                });
            } else {
                const ring = document.getElementById('project-container');
                if (ring) {
                    ring.style.transition = 'opacity 0.3s ease';
                    ring.style.opacity = '0';
                    setTimeout(() => {
                        renderProjects(btn.dataset.filter);
                        ring.style.transition = 'transform 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease';
                        ring.style.opacity = '1';
                    }, 300);
                } else {
                    renderProjects(btn.dataset.filter);
                }
            }
        });
    });

    // Education Timeline
    const timeline = document.getElementById('education-timeline');
    if (timeline) {
        education.forEach(item => {
            const div = document.createElement('div');
            div.className = 'timeline-item';
            div.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-date">${item.date}</span>
                    <h3 class="timeline-title">${item.title}</h3>
                    <span class="timeline-org">${item.org}</span>
                    <p class="timeline-desc">${item.desc}</p>
                </div>
            `;
            timeline.appendChild(div);
        });
    }

    // Modal Close Logic
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target.id === 'project-modal') closeModal(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // Gallery Controls
    document.querySelector('.gallery-prev')?.addEventListener('click', () => {
        if (currentProjectImages.length <= 1) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateGalleryUI();
    });
    document.querySelector('.gallery-next')?.addEventListener('click', () => {
        if (currentProjectImages.length <= 1) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % currentProjectImages.length;
        updateGalleryUI();
    });

    // Navbar scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (nav) {
            if(window.scrollY > 50) {
                nav.style.background = 'rgba(2, 6, 23, 0.98)';
                nav.style.height = '70px';
                nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                nav.style.background = 'rgba(2, 6, 23, 0.85)';
                nav.style.height = '80px';
                nav.style.boxShadow = 'none';
            }
        }
    });

    // Intersection Observer
    const reveals = document.querySelectorAll('.sections, .about-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => {
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(50px)';
        reveal.style.transition = 'all 0.8s ease-out';
        observer.observe(reveal);
    });

    // Mobile Menu
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // Scroll-Spy
    const spySections = document.querySelectorAll('.scroll-spy-target, .sections');
    window.addEventListener('scroll', () => {
        let current = '';
        spySections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) current = section.getAttribute('id');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').includes(current));
        });
    });

    // Carousel Interaction
    const ring = document.getElementById('project-container');
    const scene = document.querySelector('.project-scene');
    if (ring && scene) {
        const handleStart = (e) => {
            isDragging = true;
            startX = e.pageX || e.touches[0].pageX;
            previousX = startX;
            ring.style.transition = 'none';
        };
        const handleMove = (e) => {
            if (!isDragging) return;
            const x = e.pageX || e.touches[0].pageX;
            const deltaX = x - previousX;
            previousX = x;
            currentRotation += (deltaX * 0.2);
            applyRotation(ring, currentRotation, 360 / ring.querySelectorAll('.project-card').length);
            velocity = deltaX;
        };
        const handleEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            ring.style.transition = 'transform 0.7s cubic-bezier(0.15, 0.85, 0.25, 1)';
            
            // Pronounced inertia
            currentRotation += (velocity * 4); 
            
            // Snap to the nearest project
            const cardsCount = ring.querySelectorAll('.project-card').length;
            const angleStep = 360 / cardsCount;
            currentRotation = Math.round(currentRotation / angleStep) * angleStep;

            applyRotation(ring, currentRotation, angleStep);
            velocity = 0;
        };
        scene.addEventListener('mousedown', handleStart);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
        scene.addEventListener('touchstart', handleStart);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleEnd);

        // Keyboard arrows for Carousel
        window.addEventListener('keydown', (e) => {
            if (document.body.classList.contains('modal-active')) return;
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

            const cardsCount = ring.querySelectorAll('.project-card').length;
            if (cardsCount === 0) return;
            const angleStep = 360 / cardsCount;

            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                ring.style.transition = 'transform 0.7s cubic-bezier(0.15, 0.85, 0.25, 1)';
                
                // Snap the rotation just in case it was dragged slightly without a full snap
                currentRotation = Math.round(currentRotation / angleStep) * angleStep;
                
                if (e.key === 'ArrowRight') {
                    currentRotation -= angleStep; // Navigate to the next item on the right
                } else if (e.key === 'ArrowLeft') {
                    currentRotation += angleStep; // Navigate to the previous item on the left
                }
                                applyRotation(ring, currentRotation, angleStep);
            }
        });
    }

    // Start Typewrite
    typeEffect();
    initTilt();
    initDecorations();
});

// --- Decoraciones (Redes y Números flotantes) ---
function initDecorations() {
    // Canvas Network — Abyssal Bioluminescent Topology
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;
        const mouse = { x: null, y: null, radius: 200 };
        let time = 0;

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        const initCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            particles = [];
            const density = window.innerWidth < 768 ? 30 : 65;
            for (let i = 0; i < density; i++) {
                const isCyan = Math.random() > 0.45;
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 2.2 + 0.6,
                    originalRadius: Math.random() * 2.2 + 0.6,
                    isCyan: isCyan,
                    // Subtle drift oscillation per particle
                    phase: Math.random() * Math.PI * 2,
                    amplitude: Math.random() * 0.15 + 0.05,
                    // Trail history for jellyfish-like effect
                    trail: []
                });
            }
        };

        const drawNetwork = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.008;

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                // Sinusoidal drift for organic underwater movement
                p.vx += Math.sin(time + p.phase) * p.amplitude * 0.01;
                p.vy += Math.cos(time + p.phase * 1.3) * p.amplitude * 0.01;
                // Damping to prevent runaway velocity
                p.vx *= 0.998;
                p.vy *= 0.998;

                // Mouse interaction — gentle attraction (bioluminescent swarm)
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - p.x;
                    let dy = mouse.y - p.y;
                    let dist = Math.hypot(dx, dy);
                    if (dist < mouse.radius) {
                        let force = (mouse.radius - dist) / mouse.radius;
                        p.x += (dx / dist) * force * 0.6;
                        p.y += (dy / dist) * force * 0.6;
                        p.radius = p.originalRadius * (1 + force * 1.2);
                    } else {
                        p.radius += (p.originalRadius - p.radius) * 0.05;
                    }
                } else {
                    p.radius += (p.originalRadius - p.radius) * 0.05;
                }

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Store trail positions (keep last 4)
                p.trail.push({ x: p.x, y: p.y });
                if (p.trail.length > 4) p.trail.shift();

                // Draw faint particle trail (jellyfish tentacle feel)
                if (p.trail.length > 1) {
                    for (let t = 0; t < p.trail.length - 1; t++) {
                        const trailAlpha = (t / p.trail.length) * 0.12;
                        const trailR = p.radius * (t / p.trail.length) * 0.6;
                        ctx.beginPath();
                        ctx.arc(p.trail[t].x, p.trail[t].y, trailR, 0, Math.PI * 2);
                        ctx.fillStyle = p.isCyan
                            ? `rgba(0, 247, 255, ${trailAlpha})`
                            : `rgba(177, 94, 255, ${trailAlpha})`;
                        ctx.fill();
                    }
                }

                // Draw glowing bioluminescent node
                const pulseScale = 1 + Math.sin(time * 2 + p.phase) * 0.15;
                const drawR = p.radius * pulseScale;
                ctx.beginPath();
                ctx.arc(p.x, p.y, drawR, 0, Math.PI * 2);
                ctx.fillStyle = p.isCyan ? 'rgba(0, 247, 255, 0.7)' : 'rgba(177, 94, 255, 0.7)';
                ctx.shadowBlur = 12;
                ctx.shadowColor = p.isCyan ? '#00f7ff' : '#b15eff';
                ctx.fill();
                ctx.shadowBlur = 0;

                // Draw network connections with gradient
                for (let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    const maxDist = 200;
                    if (dist < maxDist) {
                        let opacity = 0.25 * (1 - dist / maxDist);

                        // Boost opacity for mouse-adjacent connections
                        if (mouse.x !== null && mouse.y !== null) {
                            const midX = (p.x + p2.x) / 2;
                            const midY = (p.y + p2.y) / 2;
                            const mouseDist = Math.hypot(mouse.x - midX, mouse.y - midY);
                            if (mouseDist < mouse.radius) {
                                opacity += 0.15 * (1 - mouseDist / mouse.radius);
                            }
                        }

                        if (opacity > 0.02) {
                            const grad = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                            grad.addColorStop(0, p.isCyan
                                ? `rgba(0, 247, 255, ${opacity})`
                                : `rgba(177, 94, 255, ${opacity})`);
                            grad.addColorStop(1, p2.isCyan
                                ? `rgba(0, 247, 255, ${opacity * 0.6})`
                                : `rgba(177, 94, 255, ${opacity * 0.6})`);
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = grad;
                            ctx.lineWidth = 0.6;
                            ctx.stroke();
                        }
                    }
                }
            }
            requestAnimationFrame(drawNetwork);
        };

        window.addEventListener('resize', initCanvas);
        initCanvas();
        drawNetwork();
    }

    // Burbujas Marinas Bioluminiscentes
    const fnContainer = document.getElementById('floating-numbers-container');
    if (fnContainer) {
        const createBubble = () => {
            const bubble = document.createElement('div');
            bubble.className = 'floating-bubble';

            const size = Math.random() * 18 + 6; // 6px to 24px
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';

            bubble.style.left = Math.random() * 95 + 'vw';

            const dur = 10 + Math.random() * 10; // 10s to 20s — slower, more serene
            bubble.style.animationDuration = dur + 's';

            // Random bioluminescent tint
            if (Math.random() > 0.5) {
                bubble.style.setProperty('--primary-rgb', '177, 94, 255');
            } else {
                bubble.style.setProperty('--primary-rgb', '0, 247, 255');
            }

            fnContainer.appendChild(bubble);

            setTimeout(() => {
                bubble.remove();
            }, dur * 1000);
        };

        setInterval(createBubble, 800); // Slightly less frequent for elegance
    }
}
