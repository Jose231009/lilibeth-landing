// ─────────────────────────────────────────────────────────
// initParticleBackground — del skill AtraeLab
// Optimizado: 350 partículas (era 1200), antialias off en mobile
// ─────────────────────────────────────────────────────────

export async function initParticleBackground(canvas: HTMLCanvasElement) {
  const THREE = await import('three');

  const isMobile = window.innerWidth < 768;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !isMobile,          // antialias off en mobile
    powerPreference: 'low-power',  // pide GPU de bajo consumo
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 3;

  // Partículas — 350 (era 1200) para no saturar el GPU
  const count     = isMobile ? 150 : 350;
  const geometry  = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xB07040,
    size: 0.014,
    transparent: true,
    opacity: 0.45,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse reactivity solo en desktop
  let mouseX = 0, mouseY = 0;
  let onMouseMove: ((e: MouseEvent) => void) | null = null;
  if (!isMobile) {
    onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }

  // Loop — throttle a ~30fps para ahorrar batería
  const clock = new THREE.Clock();
  let animId: number;
  let lastTime = 0;

  function animate(now: number) {
    animId = requestAnimationFrame(animate);
    if (now - lastTime < 33) return;   // ~30fps cap
    lastTime = now;
    const t = clock.getElapsedTime();
    particles.rotation.y = t * 0.03 + mouseX;
    particles.rotation.x = t * 0.015 + mouseY;
    renderer.render(scene, camera);
  }
  animId = requestAnimationFrame(animate);

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(animId);
    if (onMouseMove) window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', onResize);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
