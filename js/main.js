/**
 * main.js — Portfolio App Orchestrator v5
 * Handles: Typewriter, Skills, Project Grid, Modal, Lightbox,
 *          3D Museum, Scroll Spy, Navbar Scroll, Mobile Drawer.
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

    // Scroll → add .scrolled class
    let lastScroll = 0;
    const onScroll = () => {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 60);
        lastScroll = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile drawer open/close
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

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Keyboard: Escape closes menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
    });
}

// ──────────────────────────────────────────
// SCROLL SPY: Active nav link detection
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
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        {
            rootMargin: '-20% 0px -65% 0px',
            threshold: 0
        }
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
// SKILLS RENDERER
// ──────────────────────────────────────────
function renderSkills() {
    Object.keys(skillsData).forEach(category => {
        const container = document.getElementById(`${category}-skills`);
        if (!container) return;
        container.innerHTML = '';

        skillsData[category].forEach(skill => {
            const div = document.createElement('div');
            div.className = 'skill-item glass-card';

            const iconHtml = skill.isSvg
                ? (svgIcons[skill.icon] || '')
                : `<i class="${skill.icon}"></i>`;

            let badgeHtml = '';
            if (skill.level) {
                let c = '#00f7ff';
                if (skill.level.includes('Avanzado')) c = '#b15eff';
                if (skill.level.includes('Básico'))   c = '#64748b';
                badgeHtml = `<span class="skill-level-badge" style="border-color:${c};color:${c}">${skill.level}</span>`;
            }

            div.innerHTML = `
                <div class="skill-icon">${iconHtml}</div>
                <span class="skill-name">${skill.name}</span>
                ${badgeHtml}
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

        // Tag chips (max 3)
        const tagsHtml = project.tags.slice(0, 3)
            .map(t => `<span class="tag-mini"><i class="${tagIcons[t] || 'fas fa-code'}"></i>${t}</span>`)
            .join('');

        card.innerHTML = `
            <div class="project-img">
                <img src="${previewImg}"
                     class="project-logo-img"
                     alt="${project.title}"
                     loading="lazy"
                     onerror="this.src='https://placehold.co/400x220/020617/00f7ff?text=${encodeURIComponent(project.title)}'">
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

        // Animation stagger
        card.style.animationDelay = `${index * 0.06}s`;
        container.appendChild(card);
    });
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

    document.getElementById('modal-title').textContent    = project.title;
    document.getElementById('modal-category').textContent = project.category;
    document.getElementById('modal-long-desc').textContent = project.longDesc;
    const iconEl = document.getElementById('modal-icon');
    if (iconEl) iconEl.className = project.icon || '';

    // Tags
    document.getElementById('modal-tags').innerHTML = project.tags
        .map(t => `<span class="tag-premium"><i class="${tagIcons[t] || 'fas fa-code'}"></i> ${t}</span>`)
        .join('');

    // Features
    document.getElementById('modal-features-list').innerHTML = project.features
        .map(f => `<li><i class="fas fa-check-circle" style="color:var(--highlight)"></i> ${f}</li>`)
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

    // Museum trigger button inside modal
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
                onerror="this.src='https://placehold.co/800x450/020617/00f7ff?text=Captura+de+Proyecto'">`;
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
// HELPER UTILITIES
// ──────────────────────────────────────────
function hexToRgb(hex) {
    if (!hex || hex.startsWith('var')) return { r: 0, g: 247, b: 255 };
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) }
             : { r: 0, g: 247, b: 255 };
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

    // 7. Modal close
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

    // 8. Lightbox keyboard
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
});
