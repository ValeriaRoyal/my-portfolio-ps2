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
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
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
document.addEventListener("DOMContentLoaded", () => {
  const fadeEffect = document.getElementById("fadeEffect");
  const menuItems = document.querySelectorAll(".menu-item");
  const confirmButton = document.getElementById("confirmButton");
  const versionButton = document.getElementById("version");

  let activeIndex = 0;

  const pages = {
    option1: "memory-card.html",  
    option2: "version.html"       
  };

  function navigateToPage(url) {
    fadeEffect.classList.add("active");
    setTimeout(() => window.location.href = url, 800);
  }

  function updateMenuSelection() {
    menuItems.forEach((item, index) => {
      item.classList.toggle("active", index === activeIndex);
    });
  }

  function handleNavigation(item) {
    const targetPage = pages[item.id];
    if (targetPage) navigateToPage(targetPage);
  }

  menuItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      activeIndex = index;
      updateMenuSelection();
    });

    item.addEventListener("click", () => handleNavigation(item));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      activeIndex = (activeIndex + 1) % menuItems.length;
      updateMenuSelection();
    } else if (event.key === "ArrowUp") {
      activeIndex = (activeIndex - 1 + menuItems.length) % menuItems.length;
      updateMenuSelection();
    } else if (event.key === "Enter") {
      handleNavigation(menuItems[activeIndex]);
    }
  });

  [confirmButton, versionButton].forEach(button => {
    if (button) {
      button.addEventListener("click", () => handleNavigation(menuItems[activeIndex]));
    }
  });

  updateMenuSelection();
});
