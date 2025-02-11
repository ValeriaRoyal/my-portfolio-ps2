
/*********************************
 * Código para os Memory Cards
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
  setupMemoryCards();
  setupBackButton();
});

/*********************************
 * Configuração dos Memory Cards
 *********************************/
function setupMemoryCards() {
  const cards = document.querySelectorAll(".memory-card");
  if (cards.length === 0) return;

  let currentIndex = 0;
  const pageMapping = ["memory-card1.html", "memory-card2.html"];

  function updateSelection() {
    cards.forEach((card, index) => card.classList.toggle("active", index === currentIndex));
  }

  cards.forEach((card, index) => {
    card.addEventListener("mouseover", () => {
      currentIndex = index;
      updateSelection();
    });

    card.addEventListener("click", () => navigateToPage(pageMapping[currentIndex]));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") currentIndex = (currentIndex + 1) % cards.length;
    else if (event.key === "ArrowLeft") currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    else if (event.key === "Enter") navigateToPage(pageMapping[currentIndex]);

    updateSelection();
  });
}

/*********************************
   * Botão de Voltar
   *********************************/
function setupBackButton() {
  const backButton = document.getElementById("backButton");
  if (!backButton) {
    console.log("Botão de voltar não encontrado.");
    return;
  }
  
  backButton.addEventListener("click", () => {
    console.log("Botão de voltar clicado");
    window.history.back();
  });

  document.addEventListener("keydown", (event) => {
    console.log(`Tecla pressionada: ${event.key}`);
    if (["Backspace", "Escape"].includes(event.key) && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      event.preventDefault();
      console.log("Navegando para a página anterior");
      window.history.back();
    }
  });
}


function navigateToPage(url) {
  document.body.classList.add("enter");
  setTimeout(() => (window.location.href = url), 500);
}