/**
 * OceanScene.js — Abyssal Ocean 3D Background Engine using Three.js
 * Creates an interactive underwater environment with bioluminescent particles,
 * network node connections, subaquatic light rays, and camera drift.
 */
class OceanSceneEngine {
    constructor() {
        this.container = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.particles = null;
        this.particlePositions = null;
        this.particleVelocities = [];
        this.linesMesh = null;
        this.raysGroup = null;
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.clock = new THREE.Clock();
        this.isInitialized = false;
        this.particleCount = window.innerWidth < 768 ? 60 : 140;
        this.maxDistance = 160;
    }

    init() {
        if (this.isInitialized) return;
        
        this.container = document.getElementById('ocean-3d-canvas-container');
        if (!this.container || typeof THREE === 'undefined') return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x020617, 0.0018);

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            2000
        );
        this.camera.position.set(0, 0, 500);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Create 3D Scene Elements
        this.createParticlesAndNetwork();
        this.createLightRays();

        // Event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));

        this.isInitialized = true;
        this.animate();
    }

    createParticlesAndNetwork() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);

        const cyanColor = new THREE.Color(0x00f7ff);
        const purpleColor = new THREE.Color(0xb15eff);

        for (let i = 0; i < this.particleCount; i++) {
            const x = (Math.random() - 0.5) * 1200;
            const y = (Math.random() - 0.5) * 800;
            const z = (Math.random() - 0.5) * 1000;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            this.particleVelocities.push({
                x: (Math.random() - 0.5) * 0.4,
                y: (Math.random() - 0.5) * 0.4 + 0.1, // Subtle upward drift like underwater bubbles
                z: (Math.random() - 0.5) * 0.4,
                phase: Math.random() * Math.PI * 2
            });

            const mixedColor = Math.random() > 0.4 ? cyanColor : purpleColor;
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create glowing particle points
        const textureCanvas = document.createElement('canvas');
        textureCanvas.width = 64;
        textureCanvas.height = 64;
        const ctx = textureCanvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(0, 247, 255, 0.8)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);

        const pointTexture = new THREE.CanvasTexture(textureCanvas);

        const material = new THREE.PointsMaterial({
            size: 14,
            vertexColors: true,
            map: pointTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);

        // Lines Geometry for Network Topology
        const lineGeometry = new THREE.BufferGeometry();
        const maxLines = this.particleCount * (this.particleCount - 1) / 2;
        const linePositions = new Float32Array(maxLines * 6);
        const lineColors = new Float32Array(maxLines * 6);

        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        const lineMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 0.4
        });

        this.linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.linesMesh);
    }

    createLightRays() {
        this.raysGroup = new THREE.Group();
        const rayCount = 5;

        for (let i = 0; i < rayCount; i++) {
            const geometry = new THREE.CylinderGeometry(5, 80 + i * 20, 1200, 16, 1, true);
            const material = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x00f7ff : 0xb15eff,
                transparent: true,
                opacity: 0.035,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            const ray = new THREE.Mesh(geometry, material);
            ray.position.set((i - 2) * 250, 200, (i - 2) * 100);
            ray.rotation.z = -0.3 + (i * 0.08);
            ray.rotation.x = 0.2;

            this.raysGroup.add(ray);
        }

        this.scene.add(this.raysGroup);
    }

    onMouseMove(event) {
        this.mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 120;
        this.mouse.targetY = -(event.clientY / window.innerHeight - 0.5) * 80;
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

        // Smooth camera movement following mouse
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.03;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.03;
        this.camera.position.x = this.mouse.x;
        this.camera.position.y = this.mouse.y;
        this.camera.lookAt(0, 0, 0);

        // Animate particles & network
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            const linePositions = this.linesMesh.geometry.attributes.position.array;
            const lineColors = this.linesMesh.geometry.attributes.color.array;

            let vertexIndex = 0;
            let colorIndex = 0;
            let numConnected = 0;

            for (let i = 0; i < this.particleCount; i++) {
                const vel = this.particleVelocities[i];
                positions[i * 3] += vel.x + Math.sin(time + vel.phase) * 0.2;
                positions[i * 3 + 1] += vel.y;
                positions[i * 3 + 2] += vel.z + Math.cos(time + vel.phase) * 0.2;

                // Boundary reset
                if (positions[i * 3 + 1] > 450) positions[i * 3 + 1] = -450;
                if (Math.abs(positions[i * 3]) > 650) positions[i * 3] *= -0.9;

                // Check distance to other particles for network links
                for (let j = i + 1; j < this.particleCount; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < this.maxDistance) {
                        const alpha = 1.0 - (dist / this.maxDistance);

                        linePositions[vertexIndex++] = positions[i * 3];
                        linePositions[vertexIndex++] = positions[i * 3 + 1];
                        linePositions[vertexIndex++] = positions[i * 3 + 2];

                        linePositions[vertexIndex++] = positions[j * 3];
                        linePositions[vertexIndex++] = positions[j * 3 + 1];
                        linePositions[vertexIndex++] = positions[j * 3 + 2];

                        // Bioluminescent cyan-purple gradient lines
                        const r = 0.0;
                        const g = 0.97 * alpha;
                        const b = 1.0 * alpha;

                        lineColors[colorIndex++] = r;
                        lineColors[colorIndex++] = g;
                        lineColors[colorIndex++] = b;

                        lineColors[colorIndex++] = r;
                        lineColors[colorIndex++] = g;
                        lineColors[colorIndex++] = b;

                        numConnected++;
                    }
                }
            }

            this.particles.geometry.attributes.position.needsUpdate = true;
            this.linesMesh.geometry.setDrawRange(0, numConnected * 2);
            this.linesMesh.geometry.attributes.position.needsUpdate = true;
            this.linesMesh.geometry.attributes.color.needsUpdate = true;
        }

        // Animate volumetric light rays
        if (this.raysGroup) {
            this.raysGroup.children.forEach((ray, idx) => {
                ray.rotation.y = Math.sin(time * 0.2 + idx) * 0.1;
                ray.position.x += Math.sin(time * 0.3 + idx) * 0.15;
            });
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Global singleton instance
window.OceanSceneEngine = new OceanSceneEngine();
