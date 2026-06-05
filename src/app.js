const landing = document.querySelector('#landing');
const scene = document.querySelector('#scene');
const hud = document.querySelector('#hud');
const hudTitle = document.querySelector('#hudTitle');
const enterButton = document.querySelector('#enterPrototype');
const resetButton = document.querySelector('#resetScene');
const projectiles = document.querySelector('#projectiles');
const rig = document.querySelector('#rig');
const dormRoom = document.querySelector('#dormRoom');

const MAX_PROJECTILES = 36;
const projectileLifeMs = 6500;
let inDorm = false;

const parseVector = (value) => {
  if (typeof value !== 'string') {
    return { x: 0, y: 1, z: -3 };
  }

  const [x = 0, y = 1, z = -3] = value.split(' ').map(Number);
  return { x, y, z };
};

const trimProjectiles = () => {
  const toys = [...projectiles.children];
  toys.slice(0, Math.max(0, toys.length - MAX_PROJECTILES)).forEach((toy) => toy.remove());
};

const resetProjectiles = () => {
  projectiles.replaceChildren();
};

const createProjectile = ({ color, kind, radius, velocity }, sourcePosition) => {
  const projectile = document.createElement('a-entity');
  const start = { ...sourcePosition };
  const speed = parseVector(velocity);
  const bornAt = performance.now();

  projectile.classList.add('launched-toy');
  projectile.setAttribute('position', start);

  if (kind === 'frisbee') {
    projectile.setAttribute('geometry', `primitive: cylinder; radius: ${radius}; height: 0.055`);
    projectile.setAttribute('rotation', '90 0 0');
  } else if (kind === 'confetti') {
    projectile.setAttribute('geometry', `primitive: tetrahedron; radius: ${radius}`);
  } else {
    projectile.setAttribute('geometry', `primitive: sphere; radius: ${radius}`);
  }

  projectile.setAttribute('material', `color: ${color}; roughness: 0.55; metalness: 0.02`);
  projectiles.append(projectile);
  trimProjectiles();

  const animate = (now) => {
    if (!projectile.parentNode) {
      return;
    }

    const elapsed = Math.min((now - bornAt) / 1000, projectileLifeMs / 1000);
    const gravity = kind === 'confetti' ? 0.7 : 1.6;
    const wobble = kind === 'confetti' ? Math.sin(elapsed * 11 + start.x) * 0.45 : 0;
    const y = Math.max(0.18, start.y + speed.y * elapsed - gravity * elapsed * elapsed * 0.5);

    projectile.setAttribute('position', {
      x: start.x + speed.x * elapsed + wobble,
      y,
      z: start.z + speed.z * elapsed,
    });
    projectile.setAttribute('rotation', {
      x: elapsed * 260,
      y: elapsed * 190,
      z: elapsed * 130,
    });

    if (now - bornAt > projectileLifeMs || y <= 0.18) {
      projectile.remove();
      return;
    }

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

AFRAME.registerComponent('projectile-spawner', {
  schema: {
    color: { default: '#ffffff' },
    kind: { default: 'basketball' },
    radius: { default: 0.2 },
    velocity: { default: '0 1 -3' },
  },
  init() {
    this.el.setAttribute('animation__hover', 'property: scale; to: 1.08 1.08 1.08; dur: 650; dir: alternate; loop: true; easing: easeInOutSine');
    this.el.addEventListener('click', () => {
      const position = this.el.object3D.getWorldPosition(new THREE.Vector3());
      createProjectile(this.data, position);
    });
  },
});

AFRAME.registerComponent('portal-toggle', {
  init() {
    this.el.setAttribute('animation__pulse', 'property: scale; to: 1.05 1.05 1.05; dur: 900; dir: alternate; loop: true; easing: easeInOutSine');
    this.el.addEventListener('click', () => {
      inDorm = !inDorm;
      dormRoom.setAttribute('visible', inDorm);
      rig.setAttribute('position', inDorm ? '0 1.6 13' : '0 1.6 7');
      hudTitle.textContent = inDorm ? 'Private Dorm Room' : 'Cafeteria Commons';
      this.el.setAttribute('color', inDorm ? '#31c48d' : '#7b5cff');
    });
  },
});

enterButton.addEventListener('click', async () => {
  landing.hidden = true;
  hud.hidden = false;
  scene.setAttribute('visible', 'true');

  if (scene.enterVR && AFRAME.utils.device.checkHeadsetConnected()) {
    await scene.enterVR();
  }
});

resetButton.addEventListener('click', resetProjectiles);

window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'r') {
    resetProjectiles();
  }
});
