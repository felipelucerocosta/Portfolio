/**
 * main.js — Portfolio App Orchestrator v6
 * Tech Aquatic Glass — Complete Visual Evolution
 * Handles: Typewriter, Skills, Project Grid, Modal, Lightbox,
 *          3D Museum, Scroll Spy, Navbar Scroll, Mobile Drawer,
 *          Card Tilt 3D, Scroll Reveal, Decorative Bubbles.
 */

'use strict';

// ──────────────────────────────────────────
// NAVBAR: Scroll behavior + Mobile Drawer
// ──────────────────────────────────────────
function initNavbar() {
    const navbar     = document.getElementById('navbar');
    const hamburger  = document.getElementById('nav-hamburger');
    const navMenu    = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks   = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const openMenu = () => {
        navMenu.classList.add('open');
        navOverlay.classList.add('active');
        hamburger.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        navOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        navMenu.classList.remove('open');
        navOverlay.classList.remove('active');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        navOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    hamburger?.addEventListener('click', () => {
        navMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    navOverlay?.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
    });
}

// ──────────────────────────────────────────
// SCROLL SPY
// ──────────────────────────────────────────
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    if (!navLinks.length) return;

    const sectionIds = Array.from(navLinks).map(l => l.dataset.section);
    const sections   = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const setActive = (id) => {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        },
        { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    sections.forEach(s => observer.observe(s));
}

// ──────────────────────────────────────────
// TYPEWRITER
// ──────────────────────────────────────────
const phrases = [
    "Interfaces Frontend.",
    "Arquitecturas de Red LAN.",
    "Sistemas & Software.",
    "Proyectos de Robótica.",
    "Experiencias Web 3D."
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const phrase = phrases[phraseIndex];

    if (isDeleting) {
        el.textContent = phrase.substring(0, charIndex--);
    } else {
        el.textContent = phrase.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === phrase.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 350);
    } else {
        setTimeout(typeEffect, isDeleting ? 38 : 105);
    }
}

// ──────────────────────────────────────────
// SKILLS RENDERER — floating chips in glass panels
// ──────────────────────────────────────────
const categoryDescriptions = {
    frontend: "Desarrollo de interfaces modernas, dinámicas y accesibles con tecnologías web de vanguardia.",
    backend:  "Arquitectura de APIs, bases de datos relacionales y lógica de servidor robusta.",
    redes:    "Diseño, implementación y optimización de infraestructuras de red LAN y conectividad.",
    hardware: "Ensamblado, reparación de hardware, robótica, electrónica y herramientas de gestión técnica.",
    blandas:  "Competencias profesionales para trabajo en equipo, resolución de problemas y gestión efectiva."
};

function getLevelColor(level) {
    if (!level) return '#546e8a';
    if (level.includes('Avanzado'))  return '#00f0ff';
    if (level.includes('Intermedio')) return '#0891b2';
    if (level.includes('Básico'))    return '#546e8a';
    return '#546e8a';
}

function renderSkills() {
    Object.keys(skillsData).forEach(category => {
        const container = document.getElementById(`${category}-skills`);
        if (!container) return;
        container.innerHTML = '';

        // Inject description above grid
        const panel = container.closest('.skills-category-card');
        if (panel) {
            const existingDesc = panel.querySelector('.category-desc');
            if (!existingDesc && categoryDescriptions[category]) {
                const desc = document.createElement('p');
                desc.className = 'category-desc';
                desc.textContent = categoryDescriptions[category];
                container.before(desc);
            }
        }

        skillsData[category].forEach(skill => {
            const div = document.createElement('div');
            div.className = 'skill-item';

            const iconHtml = skill.isSvg
                ? (svgIcons[skill.icon] || '')
                : `<i class="${skill.icon}"></i>`;

            const levelColor = getLevelColor(skill.level);
            const levelHtml  = skill.level
                ? `<span class="skill-level-dot" style="background:${levelColor};box-shadow:0 0 6px ${levelColor}40;" title="${skill.level}"></span>`
                : '';

            div.innerHTML = `
                <span class="skill-icon">${iconHtml}</span>
                <span class="skill-name">${skill.name}</span>
                ${levelHtml}
            `;
            container.appendChild(div);
        });
    });
}

// ──────────────────────────────────────────
// PROJECT GRID RENDERING
// ──────────────────────────────────────────
function renderProjects(filter = 'todos') {
    const container = document.getElementById('project-container');
    if (!container) return;

    const list = filter === 'todos'
        ? projects
        : projects.filter(p => p.theme === filter);

    container.innerHTML = '';

    list.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.id = project.id;

        // Fallback image
        let previewImg = (project.images && project.images.length > 0)
            ? project.images[0]
            : (project.theme === 'programas'
                ? 'img/Tecnología y productividad en acción.png'
                : project.theme === 'web'
                    ? 'img/Logo minimalista con globo y www.png'
                    : 'img/packet_tracer.png');

        // Tech pills (max 3)
        const tagsHtml = project.tags.slice(0, 3)
            .map(t => {
                const icon = tagIcons[t] || 'fas fa-code';
                return `<span class="tag-mini"><i class="${icon}"></i>${t}</span>`;
            })
            .join('');

        card.innerHTML = `
            <div class="project-img">
                <img src="${previewImg}"
                     class="project-logo-img"
                     alt="${project.title}"
                     loading="lazy"
                     onerror="this.src='https://placehold.co/400x220/020917/00f0ff?text=${encodeURIComponent(project.title)}'">
                <span class="project-category-badge">${project.category}</span>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="project-card-tags">${tagsHtml}</div>
                <div class="project-card-actions">
                    <button class="btn-card btn-card-preview" data-action="preview" aria-label="Ver proyecto ${project.title}">
                        <i class="fas fa-eye"></i> VER PROYECTO
                    </button>
                    <button class="btn-card btn-card-process" data-action="museum" aria-label="Ver proceso de ${project.title}">
                        <i class="fas fa-cube"></i> VER PROCESO
                    </button>
                </div>
            </div>
        `;

        // Events
        card.querySelector('[data-action="preview"]').addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(project);
        });

        card.querySelector('[data-action="museum"]').addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.MuseumOverlayController) {
                window.MuseumOverlayController.openMuseum(project);
            }
        });

        // Stagger animation delay
        card.style.transitionDelay = `${index * 0.04}s`;
        card.classList.add('reveal');

        container.appendChild(card);
    });

    // Trigger scroll reveal after render
    requestAnimationFrame(() => initScrollReveal());

    // Re-apply tilt to new cards
    initCardTilt();
}

// ──────────────────────────────────────────
// EDUCATION TIMELINE
// ──────────────────────────────────────────
function renderTimeline() {
    const timeline = document.getElementById('education-timeline');
    if (!timeline || !window.education) return;
    timeline.innerHTML = '';

    education.forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content glass-card">
                <span class="timeline-date">${item.date}</span>
                <h3 class="timeline-title">${item.title}</h3>
                <span class="timeline-org">${item.org}</span>
                <p class="timeline-desc">${item.desc}</p>
            </div>
        `;
        timeline.appendChild(div);
    });
}

// ──────────────────────────────────────────
// MODAL: Project Preview
// ──────────────────────────────────────────
let currentGalleryIndex = 0;
let currentProjectImages = [];

function openModal(project) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    document.getElementById('modal-title').textContent     = project.title;
    document.getElementById('modal-category').textContent  = project.category;
    document.getElementById('modal-long-desc').textContent = project.longDesc;
    const iconEl = document.getElementById('modal-icon');
    if (iconEl) iconEl.className = project.icon || '';

    // Tags
    document.getElementById('modal-tags').innerHTML = project.tags
        .map(t => `<span class="tag-premium"><i class="${tagIcons[t] || 'fas fa-code'}"></i> ${t}</span>`)
        .join('');

    // Features
    document.getElementById('modal-features-list').innerHTML = project.features
        .map(f => `<li><i class="fas fa-check-circle" style="color:var(--cyan)"></i> ${f}</li>`)
        .join('');

    // Links
    const repoBtn = document.getElementById('modal-repo');
    const demoBtn = document.getElementById('modal-demo');
    if (repoBtn) {
        repoBtn.href = project.repo || '#';
        repoBtn.style.display = (project.repo && project.repo !== '#') ? 'flex' : 'none';
    }
    if (demoBtn) {
        demoBtn.href = project.demo || '#';
        demoBtn.style.display = (project.demo && project.demo !== '#') ? 'flex' : 'none';
    }

    // Museum trigger inside modal
    const museumBtn = document.getElementById('modal-process-trigger');
    if (museumBtn) {
        museumBtn.onclick = () => {
            closeModal();
            if (window.MuseumOverlayController) {
                window.MuseumOverlayController.openMuseum(project);
            }
        };
    }

    // Gallery
    currentProjectImages = project.images || [];
    currentGalleryIndex  = 0;
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
    const dots   = document.getElementById('gallery-dots');
    if (!slider || !dots) return;

    slider.innerHTML = '';
    dots.innerHTML   = '';

    if (currentProjectImages.length > 0) {
        currentProjectImages.forEach((img, i) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${img}" alt="Captura ${i + 1}"
                onclick="window.openLightboxGroup(0,${i},currentProjectImages)"
                onerror="this.src='https://placehold.co/800x450/020917/00f0ff?text=Captura+de+Proyecto'">`;
            slider.appendChild(item);

            const dot = document.createElement('div');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                currentGalleryIndex = i;
                updateGalleryUI();
            });
            dots.appendChild(dot);
        });
        updateGalleryUI();
    }
}

function updateGalleryUI() {
    const slider = document.getElementById('gallery-slider');
    const dotEls = document.querySelectorAll('.dot');
    if (slider) slider.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;
    dotEls.forEach((d, i) => d.classList.toggle('active', i === currentGalleryIndex));
}

// Gallery navigation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.gallery-prev')?.addEventListener('click', () => {
        if (currentProjectImages.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateGalleryUI();
    });
    document.querySelector('.gallery-next')?.addEventListener('click', () => {
        if (currentProjectImages.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % currentProjectImages.length;
        updateGalleryUI();
    });
});

// ──────────────────────────────────────────
// LIGHTBOX
// ──────────────────────────────────────────
let activeLightboxImages = [];
let activeLightboxIndex  = 0;

window.openLightboxGroup = function(groupIndex = 0, imageIndex = 0, customArray = null) {
    activeLightboxImages = customArray || currentProjectImages;
    if (!activeLightboxImages || activeLightboxImages.length === 0) return;
    activeLightboxIndex = imageIndex;
    updateLightboxModal();
    const lb = document.getElementById('lightbox-modal');
    if (lb) lb.style.display = 'block';
};

window.nextLightboxImage = function() {
    if (!activeLightboxImages.length) return;
    activeLightboxIndex = (activeLightboxIndex + 1) % activeLightboxImages.length;
    updateLightboxModal();
};

window.prevLightboxImage = function() {
    if (!activeLightboxImages.length) return;
    activeLightboxIndex = (activeLightboxIndex - 1 + activeLightboxImages.length) % activeLightboxImages.length;
    updateLightboxModal();
};

function updateLightboxModal() {
    const img     = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    if (img)     img.src = activeLightboxImages[activeLightboxIndex];
    if (counter) counter.textContent = `${activeLightboxIndex + 1} / ${activeLightboxImages.length}`;
}

// ──────────────────────────────────────────
// PROJECT FILTERS
// ──────────────────────────────────────────
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });
}

// ──────────────────────────────────────────
// SCROLL REVEAL — IntersectionObserver
// ──────────────────────────────────────────
function initScrollReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        // Make all reveal elements immediately visible
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ──────────────────────────────────────────
// CARD TILT 3D — Subtle mouse-based perspective
// ──────────────────────────────────────────
function initCardTilt() {
    // Disable on mobile / touch / reduced-motion
    const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice() || prefersReduced()) return;

    const tiltCards = document.querySelectorAll(
        '.project-card, .about-card-mini'
    );

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (isTouchDevice() || prefersReduced()) return;

            const rect   = card.getBoundingClientRect();
            const cx     = rect.left + rect.width / 2;
            const cy     = rect.top  + rect.height / 2;
            const dx     = e.clientX - cx;
            const dy     = e.clientY - cy;

            const maxTilt = 4; // degrees
            const rotX = -(dy / (rect.height / 2)) * maxTilt;
            const rotY =  (dx / (rect.width  / 2)) * maxTilt;

            card.style.transform    = `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
            card.style.transition   = 'transform 0.12s ease-out';
            card.style.willChange   = 'transform';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform  = '';
            card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.36s ease, border-color 0.36s ease';
            card.style.willChange = 'auto';
        });
    });
}

// ──────────────────────────────────────────
// DECORATIVE BUBBLES — Ambient underwater effect
// ──────────────────────────────────────────
function initBubbles() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const bubbleConfigs = [
        // [sectionId, count, sizes, positions]
        ['skills',   2, [120, 80],  [{ top: '10%', right: '3%' }, { bottom: '15%', left: '2%' }]],
        ['projects', 1, [160],      [{ top: '5%',  right: '2%' }]],
    ];

    const style = document.createElement('style');
    style.id = 'bubble-styles';
    style.textContent = `
        .deco-bubble {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            opacity: ${prefersReduced ? 0 : 1};
        }
        @keyframes bubble-float {
            0%   { transform: translateY(0px) scale(1); }
            40%  { transform: translateY(-20px) scale(1.03); }
            70%  { transform: translateY(-10px) scale(0.97); }
            100% { transform: translateY(0px) scale(1); }
        }
    `;
    document.head.appendChild(style);

    if (prefersReduced) return;

    bubbleConfigs.forEach(([sectionId, count, sizes, positions]) => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        // Ensure section has position relative for absolute children
        section.style.position = 'relative';
        section.style.overflow = 'hidden';

        positions.slice(0, count).forEach((pos, i) => {
            const size     = sizes[i] || sizes[0];
            const duration = 14 + i * 6;
            const delay    = i * 3;

            const bubble = document.createElement('div');
            bubble.className = 'deco-bubble';

            Object.assign(bubble.style, {
                width:       `${size}px`,
                height:      `${size}px`,
                background:  `radial-gradient(circle at 35% 35%, rgba(0,240,255,0.06) 0%, rgba(0,200,224,0.02) 50%, transparent 70%)`,
                border:      '1px solid rgba(0,240,255,0.05)',
                backdropFilter: 'blur(2px)',
                animation:   `bubble-float ${duration}s ease-in-out ${delay}s infinite`,
                ...pos
            });

            section.appendChild(bubble);
        });
    });
}

// ──────────────────────────────────────────
// HELPER UTILITIES
// ──────────────────────────────────────────
function hexToRgb(hex) {
    if (!hex || hex.startsWith('var')) return { r: 0, g: 240, b: 255 };
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) }
             : { r: 0, g: 240, b: 255 };
}

// ──────────────────────────────────────────
// APP INIT
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

    // 1. 3D Ocean Background
    if (window.OceanSceneEngine) {
        window.OceanSceneEngine.init();
    }

    // 2. Navbar
    initNavbar();
    initScrollSpy();

    // 3. Typewriter
    typeEffect();

    // 4. Skills
    renderSkills();

    // 5. Projects
    renderProjects();
    initFilters();

    // 6. Timeline
    renderTimeline();

    // 7. Modal close events
    document.querySelector('.modal-close')?.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target.id === 'project-modal') closeModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            const lb = document.getElementById('lightbox-modal');
            if (lb) lb.style.display = 'none';
        }
    });

    // 8. Lightbox keyboard navigation
    window.addEventListener('keydown', (e) => {
        const lb = document.getElementById('lightbox-modal');
        if (!lb || lb.style.display !== 'block') return;
        if (e.key === 'ArrowRight') window.nextLightboxImage();
        if (e.key === 'ArrowLeft')  window.prevLightboxImage();
    });

    // 9. Smooth scroll with offset compensation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target   = document.getElementById(targetId);
            if (!target) return;
            e.preventDefault();
            const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
            const offset = target.getBoundingClientRect().top + window.scrollY - navH - 24;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });

    // 10. Scroll Reveal — static elements
    // Add reveal class to key static elements
    const revealTargets = [
        '.section-header',
        '.about-grid',
        '.timeline-item',
        '.contact-card-v2'
    ];
    revealTargets.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
        });
    });
    initScrollReveal();

    // 11. Card Tilt 3D
    initCardTilt();

    // 12. Decorative Bubbles
    initBubbles();
});
