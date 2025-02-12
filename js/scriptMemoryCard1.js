/*********************************
 * Internacionalização (i18n)
 *********************************/
const messages = {
  en: {
    headerDefault: "Memory Card (PS2) / 1",
    backButton: "Back",
  },
  pt: {
    headerDefault: "Memory Card (PS2) / 1",
    backButton: "Voltar",
  }
};

const lang = navigator.language.startsWith("pt") ? "pt" : "en"; // Detecta o idioma

function updateText() {
  const headerText = document.querySelector(".header .text");
  if (headerText) headerText.textContent = messages[lang].headerDefault;

  const backButton = document.getElementById("backButton");
  if (backButton) backButton.textContent = messages[lang].backButton;
}

/*********************************
 * Configuração Principal
 *********************************/
// Aguarda o carregamento do DOM e inicia as funcionalidades principais
document.addEventListener("DOMContentLoaded", () => {
  SaveLinks.setup();
  Navigation.setupBackButton();
  updateText(); // Atualiza o texto com base no idioma
});

/*********************************
 * Módulo SaveLinks
 *********************************/
const SaveLinks = (() => {
  // Elementos e dados usados no módulo
  let savesContainer;
  let headerText;
  let activeIndex = 0;

  // Lista de links dinâmicos
  const saveLinks = [
    { name: "Linkedin", link: "https://www.linkedin.com/in/valeriaroyal/", image: "assets/imagens/save1.png" },
    { name: "Github", link: "https://github.com/ValeriaRoyal", image: "assets/imagens/save2.png" },
    { name: "Behance", link: "https://www.behance.net/ValeriaRoyal", image: "assets/imagens/save3.png" },
    { name: "Notion", link: "https://www.notion.so/Val-ria-Regina-A-Nascimento-ed37dc3a99b74938b97a50e104bdebad", image: "assets/imagens/save4.png" }
  ];

  // Função para criar um elemento de save
  const createSaveElement = (save, index) => {
    const saveBox = document.createElement("div");
    saveBox.classList.add("save-box");
    saveBox.setAttribute("role", "button");
    saveBox.setAttribute("tabindex", "0");
    saveBox.setAttribute("aria-label", `Link para ${save.name}`);
    saveBox.dataset.index = index;

    const saveImage = document.createElement("img");
    saveImage.src = save.image;
    saveImage.alt = `Imagem representando ${save.name}`;
    saveImage.classList.add("save-image");

    saveBox.appendChild(saveImage);

    // Eventos de interação
    saveBox.addEventListener("mouseenter", () => updateActiveItem(index));
    saveBox.addEventListener("click", () => window.open(save.link, "_blank"));
    saveBox.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.open(save.link, "_blank");
      }
    });

    return saveBox;
  };

  // Atualiza a classe 'active' e o texto do header
  const updateActiveItem = (index) => {
    document.querySelectorAll(".save-box").forEach((box, i) => {
      box.classList.toggle("active", i === index);
    });
    if (headerText) headerText.textContent = saveLinks[index].name;
    activeIndex = index;
  };

  // Ajusta a navegação de acordo com o tamanho da tela
  const getNumCols = () => {
    const width = window.innerWidth;
    return width >= 768 ? 4 : 2; // Ajusta para 2 colunas em telas pequenas e 4 em telas maiores
  };

  // Eventos de teclado para navegação
  const setupKeyboardNavigation = () => {
    document.addEventListener("keydown", (event) => {
      const numCols = getNumCols(); // Usando a função para pegar as colunas dinamicamente
      const totalItems = saveLinks.length;

      if (event.key === "ArrowRight") {
        activeIndex = (activeIndex + 1) % totalItems;
      } else if (event.key === "ArrowLeft") {
        activeIndex = (activeIndex - 1 + totalItems) % totalItems;
      } else if (event.key === "ArrowDown") {
        activeIndex = Math.min(activeIndex + numCols, totalItems - 1);
      } else if (event.key === "ArrowUp") {
        activeIndex = Math.max(activeIndex - numCols, 0);
      } else if (event.key === "Enter") {
        window.open(saveLinks[activeIndex].link, "_blank");
      }

      updateActiveItem(activeIndex);
    });
  };

  // Configura os elementos da página
  const setup = () => {
    savesContainer = document.getElementById("savesContainer");
    headerText = document.querySelector(".header .text");

    if (!savesContainer) {
      console.warn("Elemento 'savesContainer' não encontrado.");
      return;
    }

    saveLinks.forEach((save, index) => {
      const saveElement = createSaveElement(save, index);
      savesContainer.appendChild(saveElement);
    });

    // Inicializa o primeiro item como ativo
    updateActiveItem(0);
    setupKeyboardNavigation();
  };

  return {
    setup
  };
})();

/*********************************
 * Módulo Navigation
 *********************************/
const Navigation = (() => {
  // Configura o botão de voltar e eventos de navegação
  const setupBackButton = () => {
    const backButton = document.getElementById("backButton");
    if (!backButton) {
      console.warn("Elemento 'backButton' não encontrado.");
      return;
    }

    backButton.setAttribute("role", "button");
    backButton.setAttribute("tabindex", "0");
    backButton.setAttribute("aria-label", "Voltar para a página anterior");

    backButton.addEventListener("click", () => window.history.back());
    backButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        window.history.back();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (
        ["Backspace", "Escape"].includes(event.key) &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
      ) {
        event.preventDefault();
        window.history.back();
      }
    });
  };

  return {
    setupBackButton
  };
})();
