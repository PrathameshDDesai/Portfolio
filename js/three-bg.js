/**
 * three-bg.js — Three.js Particle Background
 * Renders an animated particle cloud + grid lines that react to mouse movement.
 */

function initThreeBackground() {
    const canvas = document.getElementById('bg-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // ── Particles ──
    const count = 1800;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xff3c00,
        size: 0.025,
        transparent: true,
        opacity: 0.7,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── Grid Lines ──
    const gridMat = new THREE.LineBasicMaterial({ color: 0xff3c00, opacity: 0.05, transparent: true });

    for (let i = -10; i <= 10; i += 2) {
        const hGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-10, i * 0.5, -5),
            new THREE.Vector3(10, i * 0.5, -5),
        ]);
        scene.add(new THREE.Line(hGeo, gridMat));

        const vGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(i, -5, -5),
            new THREE.Vector3(i, 5, -5),
        ]);
        scene.add(new THREE.Line(vGeo, gridMat));
    }

    // ── Mouse Tracking ──
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * -2;
    });

    // ── Animation Loop ──
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        particles.rotation.y = t * 0.04 + mouseX * 0.1;
        particles.rotation.x = t * 0.02 + mouseY * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // ── Resize ──
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
