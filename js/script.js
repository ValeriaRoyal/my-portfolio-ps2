/*********************************
 * Código para o Canvas de Fundo
 *********************************/
const canvas = document.getElementById('backgroundCanvas');
if (canvas) { // Executa somente se o canvas existir na página
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;

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

  // Função para desenhar e animar as orbes
  function animate() {
    // Limpa a tela com uma leve transparência para efeito de rastro
    ctx.fillStyle = 'rgba(0, 0, 51, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    orbs.forEach((orb) => {
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
}

/*********************************
 * Código para o Menu
 *********************************/
document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  if (menuItems.length > 0) { // Executa somente se houver itens de menu
    let activeIndex = 0; // Índice da opção ativa

    // Adiciona a classe "active" ao item inicial
    menuItems[activeIndex].classList.add('active');

    // Lógica para alternar usando o teclado
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        menuItems[activeIndex].classList.remove('active');
        activeIndex = (activeIndex + 1) % menuItems.length;
        menuItems[activeIndex].classList.add('active');
      } else if (event.key === 'ArrowUp') {
        menuItems[activeIndex].classList.remove('active');
        activeIndex = (activeIndex - 1 + menuItems.length) % menuItems.length;
        menuItems[activeIndex].classList.add('active');
      }
    });

    // Lógica para alternar usando o mouse
    menuItems.forEach((item, index) => {
      item.addEventListener('mouseover', () => {
        menuItems[activeIndex].classList.remove('active');
        activeIndex = index;
        item.classList.add('active');
      });
    });
  }
});

/*********************************
 * Código para os Memory Cards
 *********************************/
const cards = document.querySelectorAll('.memory-card');
if (cards.length > 0) { // Executa somente se houver cartões de memória na página
  let currentIndex = 0;

  function updateSelection() {
    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
    });
  }

  // Navegação com as setas do teclado
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % cards.length;
      updateSelection();
    } else if (event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      updateSelection();
    }
  });
}
