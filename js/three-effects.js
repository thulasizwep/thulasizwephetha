/**
 * Three.js Effects
 * Creates 3D background effects and interactive elements
 */

class ThreeBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.clock = new THREE.Clock();
        
        this.init();
    }
    
    init() {
        if (typeof THREE === 'undefined') return;
        
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLights();
        this.createObjects();
        this.addEventListeners();
        this.animate();
    }
    
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e27);
    }
    
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 30;
    }
    
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.domElement.style.position = 'fixed';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '-1';
        this.renderer.domElement.style.opacity = '0.3';
    }
    
    createLights() {
        const ambientLight = new THREE.AmbientLight(0x404060);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        const pointLight1 = new THREE.PointLight(0x00d4ff, 1, 50);
        pointLight1.position.set(10, 10, 10);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff0080, 1, 50);
        pointLight2.position.set(-10, -10, 10);
        this.scene.add(pointLight2);
    }
    
    createObjects() {
        // Create floating geometric shapes
        const geometries = [
            new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
            new THREE.IcosahedronGeometry(1, 1),
            new THREE.OctahedronGeometry(1),
            new THREE.TorusGeometry(1, 0.4, 16, 100),
            new THREE.ConeGeometry(1, 2, 32),
            new THREE.CylinderGeometry(1, 1, 2, 32)
        ];
        
        const colors = [0x00d4ff, 0x0066ff, 0xff0080, 0x00ff88, 0xffaa00];
        
        for (let i = 0; i < 20; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhongMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                emissive: 0x000000,
                shininess: 30,
                transparent: true,
                opacity: 0.6,
                wireframe: Math.random() > 0.5
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Random position
            mesh.position.x = (Math.random() - 0.5) * 40;
            mesh.position.y = (Math.random() - 0.5) * 40;
            mesh.position.z = (Math.random() - 0.5) * 40;
            
            // Random rotation
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            // Random scale
            const scale = Math.random() * 2 + 1;
            mesh.scale.set(scale, scale, scale);
            
            // Store random properties for animation
            mesh.userData = {
                speed: Math.random() * 0.02 + 0.01,
                rotationSpeedX: (Math.random() - 0.5) * 0.02,
                rotationSpeedY: (Math.random() - 0.5) * 0.02,
                rotationSpeedZ: (Math.random() - 0.5) * 0.02,
                floatSpeed: Math.random() * 0.02 + 0.01,
                floatRange: Math.random() * 2 + 1,
                initialY: mesh.position.y
            };
            
            this.objects.push(mesh);
            this.scene.add(mesh);
        }
        
        // Add particles
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors_array = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const radius = 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            
            positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
            positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
            positions[i * 3 + 2] = Math.cos(phi) * radius;
            
            const color = new THREE.Color();
            color.setHSL(Math.random(), 0.8, 0.5);
            
            colors_array[i * 3] = color.r;
            colors_array[i * 3 + 1] = color.g;
            colors_array[i * 3 + 2] = color.b;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors_array, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.2,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(particles);
        this.objects.push(particles);
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => this.onResize(), false);
        document.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onMouseMove(event) {
        this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();
        
        // Rotate objects based on mouse position
        this.objects.forEach(obj => {
            if (obj.isMesh) {
                // Self rotation
                obj.rotation.x += obj.userData.rotationSpeedX;
                obj.rotation.y += obj.userData.rotationSpeedY;
                obj.rotation.z += obj.userData.rotationSpeedZ;
                
                // Floating animation
                obj.position.y = obj.userData.initialY + 
                    Math.sin(elapsedTime * obj.userData.floatSpeed) * obj.userData.floatRange;
                
                // Mouse interaction
                obj.rotation.x += this.mouseY * 0.01;
                obj.rotation.y += this.mouseX * 0.01;
            }
        });
        
        // Camera movement
        this.camera.position.x += (this.mouseX * 5 - this.camera.position.x) * 0.05;
        this.camera.position.y += (-this.mouseY * 5 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize Three.js background
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        new ThreeBackground();
    }
});

/**
 * 3D Text Effect
 */
class ThreeDText {
    constructor(element) {
        this.element = element;
        this.text = element.textContent;
        this.init();
    }
    
    init() {
        // Create 3D text using CSS transforms
        const letters = this.text.split('');
        this.element.innerHTML = '';
        
        letters.forEach((letter, index) => {
            if (letter === ' ') {
                this.element.innerHTML += ' ';
                return;
            }
            
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.display = 'inline-block';
            span.style.transform = `rotateY(${index * 5}deg) translateZ(${index * 10}px)`;
            span.style.transition = 'transform 0.3s ease';
            
            this.element.appendChild(span);
        });
        
        this.element.style.transformStyle = 'preserve-3d';
        this.element.style.perspective = '1000px';
    }
}

// Initialize 3D text for headings
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.text-3d').forEach(el => {
        new ThreeDText(el);
    });
});