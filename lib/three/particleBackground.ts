// ─────────────────────────────────────────────────────────
// initParticleBackground — del skill AtraeLab
// Adaptado al dorado champagne del cliente (#C9A96E → 0xD4956A)
// ─────────────────────────────────────────────────────────

export async function initParticleBackground(canvas: HTMLCanvasElement) {
  // Importación dinámica — Three.js no funciona en SSR
  const THREE = await import('three');

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 3;

  // Partículas — color dorado champagne del cliente
  const count     = 1200;
  const geometry  = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes     = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    sizes[i] = Math.random() * 0.015 + 0.005;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xD4956A,   // --color-accent del cliente
    size: 0.012,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Reactividad al mouse
  let mouseX = 0, mouseY = 0;
  const onMouseMove = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.4;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Loop de animación — solo transform (del skill)
  const clock = new THREE.Clock();
  let animId: number;

  function animate() {
    animId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    // Rotación suave + reactividad al cursor
    particles.rotation.y = t * 0.04 + mouseX;
    particles.rotation.x = t * 0.02 + mouseY;
    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  // Cleanup — obligatorio del skill
  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
