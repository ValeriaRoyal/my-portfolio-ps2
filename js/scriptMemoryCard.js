/*********************************
 * Inicialização do App
 *********************************/
document.addEventListener("DOMContentLoaded", () => MemoryCardApp.init());

/*********************************
 * Objeto Principal: MemoryCardApp
 *********************************/
const MemoryCardApp = {
  cards: [], // Lista de cartões
  currentIndex: 0,

  init() {
    // Definindo os cartões com suas informações (nome e link)
    this.cards = [
      { name: "Memory Card 1", link: "memory-card1.html", image: "assets/imagens/memorycard.svg" },
      // { name: "Memory Card 2", link: "memory-card2.html", image: "assets/imagens/memorycard.svg" },
      // { name: "CD", link: "cd.html", image: "assets/imagens/cd_ps2.png" },
    ];

    // Gerando os cartões dinamicamente
    this.setupMemoryCards();

    this.setupBackButton();
  },

  /*********************************
   * Configuração dos Memory Cards
   *********************************/
  setupMemoryCards() {
    const memoryContainer = document.getElementById("memoryContainer");

    this.cards.forEach((card, index) => {
      // Criação de cada cartão
      const cardElement = document.createElement("div");
      cardElement.classList.add("memory-card");
      cardElement.setAttribute("data-url", card.link);

      // Imagem do cartão
      const cardImage = document.createElement("img");
      cardImage.src = card.image;
      cardImage.alt = `Memory Card ${index + 1}`;
      cardImage.classList.add("card-image");

      // Nome do cartão (opcional)
      const cardName = document.createElement("p");
      cardName.textContent = card.name;

      // Adicionando imagem e nome ao cartão
      cardElement.appendChild(cardImage);
      cardElement.appendChild(cardName);

      // Adicionando o evento de clique
      cardElement.addEventListener("click", () => {
        this.navigateToPage(card.link);
      });

      // Adicionando evento para mouseenter e mouseleave para controlar o foco
      cardElement.addEventListener("mouseenter", () => this.setFocus(index));
      cardElement.addEventListener("mouseleave", () => this.removeFocus(index));

      memoryContainer.appendChild(cardElement);
    });

    // Definindo o primeiro cartão como ativo ao carregar
    this.setFocus(this.currentIndex);
  },

  /*********************************
   * Navegação para outra página
   *********************************/
  navigateToPage(url) {
    document.body.classList.add("enter");
    setTimeout(() => (window.location.href = url), 500); // Redireciona após 500ms
  },

  /*********************************
   * Função para definir o foco no cartão
   *********************************/
  setFocus(index) {
    // Remover foco de todos os cartões
    const allCards = document.querySelectorAll(".memory-card");
    allCards.forEach(card => card.classList.remove("focused"));

    // Adicionar foco no cartão específico
    const focusedCard = allCards[index];
    if (focusedCard) {
      focusedCard.classList.add("focused");
      this.currentIndex = index; // Atualiza o índice do cartão focado
    }
  },

  /*********************************
   * Função para remover o foco de um cartão
   *********************************/
  removeFocus(index) {
    const allCards = document.querySelectorAll(".memory-card");
    allCards[index].classList.remove("focused");
  },

  /*********************************
   * Controle de navegação por teclado (setas)
   *********************************/
  handleKeyboardNavigation(event) {
    const allCards = document.querySelectorAll(".memory-card");

    if (event.key === "ArrowRight") {
      this.currentIndex = (this.currentIndex + 1) % allCards.length; // Move para o próximo cartão
      this.setFocus(this.currentIndex);
    } else if (event.key === "ArrowLeft") {
      this.currentIndex = (this.currentIndex - 1 + allCards.length) % allCards.length; // Move para o cartão anterior
      this.setFocus(this.currentIndex);
    } else if (event.key === "Enter") {
      this.navigateToFocusedCard();
    } else if (event.key === "Backspace" || event.key === "Escape") {
      this.goBack();
    }
  },

  /*********************************
   * Navegar para o cartão focado ao pressionar Enter
   *********************************/
  navigateToFocusedCard() {
    const allCards = document.querySelectorAll(".memory-card");
    const focusedCard = allCards[this.currentIndex];
    if (focusedCard) {
      const url = focusedCard.getAttribute("data-url");
      if (url) {
        this.navigateToPage(url);
      }
    }
  },

  /*********************************
   * Voltar para a tela anterior
   *********************************/
  goBack() {
    window.history.back(); // Vai para a tela anterior
  },

  /*********************************
   * Configuração do Botão de Voltar
   *********************************/
  setupBackButton() {
    const backButton = document.getElementById("backButton");

    if (!backButton) {
      console.log("Botão de voltar não encontrado.");
      return;
    }

    backButton.addEventListener("click", () => {
      this.goBack();
    });

    // Adiciona evento de teclado para as teclas "Backspace" e "Escape"
    document.addEventListener("keydown", (event) => {
      if (["Backspace", "Escape"].includes(event.key)) {
        this.goBack();
      }
    });
  }
};

// Adicionando o evento de teclado para navegação
document.addEventListener("keydown", (event) => {
  if (["ArrowLeft", "ArrowRight", "Enter", "Backspace", "Escape"].includes(event.key)) {
    MemoryCardApp.handleKeyboardNavigation(event);
  }
});