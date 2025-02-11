  /*********************************
   * Configuração dos Saves (Links)
   *********************************/
  document.addEventListener("DOMContentLoaded", 
    setupSaveLinks(),
    setupBackButton());


  function setupSaveLinks() {
    const savesContainer = document.getElementById("savesContainer");
    if (!savesContainer) return;
  
    const headerText = document.querySelector(".header .text");
    const saveLinks = [
      { name: "Linkedin", link: "https://www.linkedin.com/in/valeriaroyal/" },
      { name: "Github", link: "https://github.com/ValeriaRoyal" },
      { name: "Behance", link: "https://www.behance.net/Valeriaroyal" },
      { name: "Notion", link: "https://www.notion.so/Val-ria-Regina-A-Nascimento-ed37dc3a99b74938b97a50e104bdebad" }
    ];
  
    let activeIndex = 0;
  
    function updateActiveItem(index) {
      document.querySelectorAll(".save-box").forEach((box, i) => box.classList.toggle("active", i === index));
      if (headerText) headerText.textContent = saveLinks[index].name;
      activeIndex = index;
    }
  
    saveLinks.forEach((save, index) => {
      const saveBox = document.createElement("div");
      saveBox.classList.add("save-box");
      saveBox.dataset.index = index;
  
      const saveImage = document.createElement("img");
      saveImage.src = `assets/imagens/save${index + 1}.png`;
      saveImage.alt = save.name;
      saveImage.classList.add("save-image");
  
      saveBox.appendChild(saveImage);
      if (index === 0) updateActiveItem(0);
  
      saveBox.addEventListener("mouseenter", () => updateActiveItem(index));
      saveBox.addEventListener("click", () => window.open(save.link, "_blank"));
  
      savesContainer.appendChild(saveBox);
    });
  
    document.addEventListener("keydown", (event) => {
      const numCols = 4;
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
  }
  

  /*********************************
   * Define o Texto Padrão do Header
   *********************************/
  function setDefaultHeaderText() {
    const headerText = document.querySelector(".header .text");
    if (headerText) headerText.textContent = "Memory Card (PS2) / 1";
  }

    /*********************************
   * Botão de Voltar
   *********************************/
    function setupBackButton() {
      const backButton = document.getElementById("backButton");
      if (!backButton) return;
    
      backButton.addEventListener("click", () => window.history.back());
    
      document.addEventListener("keydown", (event) => {
        if (["Backspace", "Escape"].includes(event.key) && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
          event.preventDefault();
          window.history.back();
        }
      });
    }