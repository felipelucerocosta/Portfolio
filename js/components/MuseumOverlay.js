/**
 * MuseumOverlay.js — UI Overlay & Controller for the 3D Submarine Project Museum
 * Handles transition screens, depth meters, HUD panels, and stage controls.
 */
class MuseumOverlayController {
    constructor() {
        this.currentProject = null;
        this.currentStageIndex = 0;
    }

    openMuseum(project) {
        if (!project) return;
        this.currentProject = project;
        this.currentStageIndex = 0;

        const overlay = document.getElementById('museum-overlay');
        if (!overlay) return;

        // 1. Show Submarine Dive Loading Screen
        const loading = document.getElementById('museum-loading-screen');
        const depthReadout = document.getElementById('museum-depth-readout');
        const loadingText = document.getElementById('museum-loading-text');

        overlay.classList.add('active');
        document.body.classList.add('museum-active');
        document.body.style.overflow = 'hidden';

        if (loading && depthReadout && loadingText) {
            loading.style.display = 'flex';
            loading.style.opacity = '1';

            let depth = 0;
            const depthInterval = setInterval(() => {
                depth += 45;
                if (depth > 1200) depth = 1200;
                depthReadout.textContent = `${depth}m`;
                if (depth >= 1200) clearInterval(depthInterval);
            }, 40);

            loadingText.textContent = "INICIALIZANDO SISTEMA SUBMARINO...";
            setTimeout(() => {
                loadingText.textContent = `CONECTANDO A ARCHIVO DE PROYECTO: ${project.title.toUpperCase()}...`;
            }, 600);
            setTimeout(() => {
                loadingText.textContent = "DESCENDIENDO A ESTACIÓN DE INVESTIGACIÓN ABISAL (1200M)...";
            }, 1200);

            // Hide loading after 1.8s and launch Three.js 3D Museum
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 400);

                this.setupHUD(project);

                // Initialize 3D Engine
                if (window.ProjectMuseumEngine) {
                    window.ProjectMuseumEngine.init(project);
                }
            }, 1800);
        } else {
            this.setupHUD(project);
            if (window.ProjectMuseumEngine) {
                window.ProjectMuseumEngine.init(project);
            }
        }
    }

    closeMuseum() {
        const overlay = document.getElementById('museum-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.classList.remove('museum-active');
            document.body.style.overflow = '';
        }
    }

    setupHUD(project) {
        // Update Title & Category
        const titleEl = document.getElementById('museum-hud-title');
        const catEl = document.getElementById('museum-hud-category');
        if (titleEl) titleEl.textContent = project.title;
        if (catEl) catEl.textContent = project.category;

        // Render Timeline Stepper Buttons
        const stepper = document.getElementById('museum-hud-stepper');
        if (stepper) {
            stepper.innerHTML = '';
            const stages = project.timeline || [];

            stages.forEach((stage, idx) => {
                const btn = document.createElement('button');
                btn.className = `museum-step-btn ${idx === 0 ? 'active' : ''}`;
                btn.dataset.index = idx;
                btn.innerHTML = `
                    <span class="step-num">${stage.step || '0' + (idx + 1)}</span>
                    <span class="step-title">${stage.title || 'Etapa ' + (idx + 1)}</span>
                `;
                btn.addEventListener('click', () => {
                    this.selectStage(idx);
                });
                stepper.appendChild(btn);
            });
        }
    }

    selectStage(index) {
        this.currentStageIndex = index;
        if (window.ProjectMuseumEngine) {
            window.ProjectMuseumEngine.focusTotem(index);
        }
    }

    updateStageHUD(stageData, currentNum, totalNum) {
        const panelTitle = document.getElementById('museum-stage-title');
        const panelDate = document.getElementById('museum-stage-date');
        const panelDesc = document.getElementById('museum-stage-desc');
        const panelTech = document.getElementById('museum-stage-tech');
        const panelGallery = document.getElementById('museum-stage-gallery');
        const counterEl = document.getElementById('museum-stage-counter');

        if (counterEl) counterEl.textContent = `ESTACIÓN ${currentNum} DE ${totalNum}`;
        if (panelTitle) panelTitle.textContent = stageData.title || `Etapa ${currentNum}`;
        if (panelDate) panelDate.textContent = stageData.date || '';
        if (panelDesc) panelDesc.textContent = stageData.desc || 'Sin descripción adicional para esta estación.';

        // Render Technologies Used in this stage
        if (panelTech) {
            if (stageData.tech && stageData.tech.length > 0) {
                panelTech.innerHTML = stageData.tech.map(t => `<span class="museum-tag"><i class="fas fa-microchip"></i> ${t}</span>`).join('');
                panelTech.parentElement.style.display = 'block';
            } else {
                panelTech.parentElement.style.display = 'none';
            }
        }

        // Render Stage Screenshots / Images Grid
        if (panelGallery) {
            if (stageData.images && stageData.images.length > 0) {
                panelGallery.innerHTML = stageData.images.map((img, idx) => `
                    <div class="museum-thumb-box" onclick="window.openLightboxSingle('${img}')">
                        <img src="${img}" alt="Captura" onerror="this.src='https://via.placeholder.com/300x180/020617/00f7ff?text=Captura+de+Proyecto'">
                        <div class="thumb-overlay"><i class="fas fa-search-plus"></i> Ampliar</div>
                    </div>
                `).join('');
                panelGallery.parentElement.style.display = 'block';
            } else {
                panelGallery.parentElement.style.display = 'none';
            }
        }

        // Update Stepper Active State
        const buttons = document.querySelectorAll('.museum-step-btn');
        buttons.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === (currentNum - 1));
        });
    }
}

// Global Singleton Instance
window.MuseumOverlayController = new MuseumOverlayController();

// Global Lightbox Single helper
window.openLightboxSingle = function(imgSrc) {
    if (window.openLightboxGroup) {
        window.openLightboxGroup(0, 0, [imgSrc]);
    }
};
