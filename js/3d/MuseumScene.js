/**
 * MuseumScene.js — 3D Submarine Tech Museum Experience ("VER PROCESO")
 * Built with Three.js. Render an interactive submarine research facility / data center
 * with 3D project timeline totems, holographic screens, and camera trajectory.
 */
class ProjectMuseumEngine {
    constructor() {
        this.container = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.projectData = null;
        this.totems = [];
        this.activeTotemIndex = 0;
        this.isInitialized = false;
        this.clock = new THREE.Clock();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        // Camera target interpolation
        this.targetCamPos = new THREE.Vector3(0, 30, 250);
        this.targetLookAt = new THREE.Vector3(0, 10, 0);
        this.currentLookAt = new THREE.Vector3(0, 10, 0);

        // Interaction state
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.cameraAngle = { azimuth: 0, polar: Math.PI / 6 };
    }

    init(projectData) {
        this.projectData = projectData;
        this.container = document.getElementById('museum-3d-canvas-container');
        if (!this.container || typeof THREE === 'undefined') return;

        // Reset if previously initialized
        if (this.renderer) {
            this.container.innerHTML = '';
            this.totems = [];
            this.activeTotemIndex = 0;
        }

        // 1. Scene & Fog Setup (Abyssal Underwater Research Facility)
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x020617, 0.002);
        this.scene.background = new THREE.Color(0x020617);

        // 2. Camera Setup
        this.camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.set(0, 40, 220);

        // 3. Renderer Setup
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // 4. Lighting Setup (Underwater Volumetric Ambiance)
        const ambientLight = new THREE.AmbientLight(0x0b132b, 1.8);
        this.scene.add(ambientLight);

        const mainSpot = new THREE.SpotLight(0x00f7ff, 3.5, 800, Math.PI / 4, 0.5, 1);
        mainSpot.position.set(0, 300, 100);
        mainSpot.castShadow = true;
        this.scene.add(mainSpot);

        const accentSpot = new THREE.SpotLight(0xb15eff, 2.5, 600, Math.PI / 3, 0.5, 1);
        accentSpot.position.set(-200, 150, -100);
        this.scene.add(accentSpot);

        // 5. Build Submarine Environment Structure
        this.buildFacilityRoom();

        // 6. Build Project Timeline Totems
        this.buildProjectTotems();

        // 7. Event Listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.renderer.domElement.addEventListener('click', this.onCanvasClick.bind(this));
        this.setupDragEvents();

        this.isInitialized = true;
        this.focusTotem(0);
        this.animate();
    }

    buildFacilityRoom() {
        // Metallic Grated Floor with Bioluminescent Grid
        const floorGeo = new THREE.PlaneGeometry(1200, 1200, 40, 40);
        const floorMat = new THREE.MeshStandardMaterial({
            color: 0x070d1e,
            roughness: 0.4,
            metalness: 0.8,
            wireframe: false
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -20;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Bioluminescent Grid Lines on Floor
        const gridHelper = new THREE.GridHelper(1200, 40, 0x00f7ff, 0x0b132b);
        gridHelper.position.y = -19.5;
        this.scene.add(gridHelper);

        // Submarine Conduit Pillars & Floating Particles
        const pillarGeo = new THREE.CylinderGeometry(15, 20, 400, 16);
        const pillarMat = new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            roughness: 0.3,
            metalness: 0.9
        });

        for (let i = -2; i <= 2; i += 2) {
            const leftPillar = new THREE.Mesh(pillarGeo, pillarMat);
            leftPillar.position.set(-350, 180, i * 220);
            this.scene.add(leftPillar);

            const rightPillar = new THREE.Mesh(pillarGeo, pillarMat);
            rightPillar.position.set(350, 180, i * 220);
            this.scene.add(rightPillar);
        }
    }

    buildProjectTotems() {
        const timelineData = this.projectData.timeline || [];
        if (timelineData.length === 0) return;

        const totemSpacing = 160;
        const startX = -((timelineData.length - 1) * totemSpacing) / 2;

        const linePoints = [];

        timelineData.forEach((stage, idx) => {
            const posX = startX + idx * totemSpacing;
            const posZ = Math.sin(idx * 0.8) * 40; // Curved organic trajectory
            const posY = 0;

            linePoints.push(new THREE.Vector3(posX, posY - 15, posZ));

            // Totem Pedestal Assembly
            const totemGroup = new THREE.Group();
            totemGroup.position.set(posX, posY, posZ);
            totemGroup.userData = { index: idx, stageData: stage };

            // 1. Base Ring (Bioluminescent)
            const ringGeo = new THREE.CylinderGeometry(24, 28, 6, 32);
            const ringMat = new THREE.MeshStandardMaterial({
                color: idx === 0 ? 0x00f7ff : 0x0f172a,
                emissive: 0x00f7ff,
                emissiveIntensity: 0.3,
                metalness: 0.8,
                roughness: 0.2
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.y = -17;
            ring.receiveShadow = true;
            totemGroup.add(ring);

            // 2. Pedestal Column
            const colGeo = new THREE.BoxGeometry(20, 45, 20);
            const colMat = new THREE.MeshStandardMaterial({
                color: 0x0f172a,
                metalness: 0.9,
                roughness: 0.3
            });
            const col = new THREE.Mesh(colGeo, colMat);
            col.position.y = 8;
            col.castShadow = true;
            totemGroup.add(col);

            // 3. Holographic Monitor Screen
            const screenFrameGeo = new THREE.BoxGeometry(60, 40, 4);
            const screenFrameMat = new THREE.MeshStandardMaterial({
                color: 0x020617,
                metalness: 0.9,
                roughness: 0.1
            });
            const screenFrame = new THREE.Mesh(screenFrameGeo, screenFrameMat);
            screenFrame.position.y = 48;
            totemGroup.add(screenFrame);

            // Screen Display Surface
            const screenGeo = new THREE.PlaneGeometry(54, 34);
            let screenMat;

            if (stage.images && stage.images.length > 0) {
                const textureLoader = new THREE.TextureLoader();
                const texture = textureLoader.load(stage.images[0]);
                screenMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            } else {
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 320;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#020617';
                ctx.fillRect(0, 0, 512, 320);
                ctx.fillStyle = '#00f7ff';
                ctx.font = 'bold 24px monospace';
                ctx.fillText(`ETAPA ${stage.step || idx + 1}`, 30, 80);
                ctx.fillText(stage.title || 'Información', 30, 140);
                const canvasTexture = new THREE.CanvasTexture(canvas);
                screenMat = new THREE.MeshBasicMaterial({ map: canvasTexture });
            }

            const screenMesh = new THREE.Mesh(screenGeo, screenMat);
            screenMesh.position.set(0, 48, 2.2);
            screenMesh.userData = { isScreen: true, imageSrc: stage.images ? stage.images[0] : null };
            totemGroup.add(screenMesh);

            // 4. Floating Hologram Beacon Node
            const beaconGeo = new THREE.OctahedronGeometry(6, 0);
            const beaconMat = new THREE.MeshStandardMaterial({
                color: 0x00f7ff,
                emissive: 0x00f7ff,
                emissiveIntensity: 0.8,
                wireframe: true
            });
            const beacon = new THREE.Mesh(beaconGeo, beaconMat);
            beacon.position.y = 78;
            beacon.name = "beacon";
            totemGroup.add(beacon);

            this.scene.add(totemGroup);
            this.totems.push({ group: totemGroup, data: stage, index: idx, beacon: beacon, ringMat: ringMat });
        });

        // Glow Conduit Cable Connecting All Totems in 3D
        if (linePoints.length > 1) {
            const curve = new THREE.CatmullRomCurve3(linePoints);
            const tubeGeo = new THREE.TubeGeometry(curve, 64, 2.5, 8, false);
            const tubeMat = new THREE.MeshBasicMaterial({
                color: 0x00f7ff,
                wireframe: true,
                transparent: true,
                opacity: 0.6
            });
            const tube = new THREE.Mesh(tubeGeo, tubeMat);
            this.scene.add(tube);
        }
    }

    focusTotem(index) {
        if (index < 0 || index >= this.totems.length) return;
        this.activeTotemIndex = index;

        const totem = this.totems[index];
        const group = totem.group;

        // Smooth target camera interpolation
        this.targetCamPos.set(group.position.x, group.position.y + 35, group.position.z + 110);
        this.targetLookAt.set(group.position.x, group.position.y + 35, group.position.z);

        // Highlight totem rings
        this.totems.forEach((t, i) => {
            if (i === index) {
                t.ringMat.emissive.setHex(0x00f7ff);
                t.ringMat.emissiveIntensity = 1.2;
            } else {
                t.ringMat.emissive.setHex(0x0b132b);
                t.ringMat.emissiveIntensity = 0.2;
            }
        });

        // Update UI HUD in DOM
        if (window.MuseumOverlayController) {
            window.MuseumOverlayController.updateStageHUD(totem.data, index + 1, this.totems.length);
        }
    }

    onCanvasClick(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            let obj = intersects[0].object;
            while (obj && !obj.userData.stageData && !obj.userData.isScreen && obj.parent) {
                obj = obj.parent;
            }

            if (obj && obj.userData.stageData) {
                this.focusTotem(obj.userData.index);
            } else if (obj && obj.userData.isScreen && obj.userData.imageSrc) {
                if (window.openLightboxGroup) {
                    window.openLightboxGroup(0, 0, [obj.userData.imageSrc]);
                }
            }
        }
    }

    setupDragEvents() {
        const dom = this.renderer.domElement;

        dom.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;

            const deltaX = e.clientX - this.previousMousePosition.x;
            const deltaY = e.clientY - this.previousMousePosition.y;

            this.camera.position.x -= deltaX * 0.3;
            this.camera.position.y += deltaY * 0.3;

            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
        });
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = this.clock.getElapsedTime();

        // Smooth camera lerp
        this.camera.position.lerp(this.targetCamPos, 0.05);
        this.currentLookAt.lerp(this.targetLookAt, 0.05);
        this.camera.lookAt(this.currentLookAt);

        // Animate floating beacons on totems
        this.totems.forEach((totem, i) => {
            if (totem.beacon) {
                totem.beacon.rotation.y = time * 0.8 + i;
                totem.beacon.position.y = 78 + Math.sin(time * 2 + i) * 3;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }
}

window.ProjectMuseumEngine = new ProjectMuseumEngine();
