const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const orbs = [];
const numOrbs = 5;
const radius = 80;

// Criar as orbes
for (let i = 0; i < numOrbs; i++) {
  orbs.push({
    angle: (Math.PI * 2 / numOrbs) * i,
    size: 8,
    speed: 0.02 + Math.random() * 0.02,
  });
}

// Desenhar e animar as orbes
function animate() {
  ctx.fillStyle = 'rgba(0, 0, 51, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  orbs.forEach((orb, i) => {
    orb.angle += orb.speed;

    const x = centerX + Math.cos(orb.angle) * radius;
    const y = centerY + Math.sin(orb.angle) * radius;

    ctx.beginPath();
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.size);
    gradient.addColorStop(0, 'rgba(0, 191, 255, 1)');
    gradient.addColorStop(1, 'rgba(0, 191, 255, 0)');
    ctx.fillStyle = gradient;

    ctx.arc(x, y, orb.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();


document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  let activeIndex = 0; // Índice da opção ativa

  // Adiciona a classe "active" ao item inicial
  menuItems[activeIndex].classList.add('active');

  // Lógica para alternar usando o teclado
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      menuItems[activeIndex].classList.remove('active'); // Remove o ativo atual
      activeIndex = (activeIndex + 1) % menuItems.length; // Move para o próximo
      menuItems[activeIndex].classList.add('active'); // Define o próximo como ativo
    } else if (event.key === 'ArrowUp') {
      menuItems[activeIndex].classList.remove('active');
      activeIndex = (activeIndex - 1 + menuItems.length) % menuItems.length;
      menuItems[activeIndex].classList.add('active');
    }
  });

  // Lógica para alternar usando o mouse
  menuItems.forEach((item, index) => {
    item.addEventListener('mouseover', () => {
      menuItems[activeIndex].classList.remove('active'); // Remove o ativo atual
      activeIndex = index; // Define o índice atual como ativo
      item.classList.add('active');
    });
  });
});
