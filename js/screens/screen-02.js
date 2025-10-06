export class Screen {
  constructor(nameId, father, tag = "div", styleDisplay = "block") {
    this.father = father;
    this.nameId = nameId;
    this.screen = document.createElement(tag);
    this.styleDisplay = styleDisplay;
    this.screen.id = nameId;
    this.transitionDuration = 500; // Centralizando o valor da transição
    this.addStyle();
  }

  addStyle() {
    this.screen.style.transition = `opacity ${this.transitionDuration}ms ease-in-out`;
    this.screen.style.opacity = "0"; // Inicia invisível
  }

  display(state = "none") {
    if (state === "none") {
      this.hide();
    } else {
      this.show(state);
    }
    return this;
  }

  show(displayStyle = null) {
    this.screen.style.display = displayStyle || this.styleDisplay;
    // Force reflow para garantir que a transição funcione
    void this.screen.offsetHeight;
    this.screen.style.opacity = "1";
    return this;
  }

  hide() {
    this.screen.style.opacity = "0";
    setTimeout(() => {
      this.screen.style.display = "none";
    }, this.transitionDuration);
    return this;
  }

  create() {
    const fatherElement = document.getElementById(this.father);
    if (!fatherElement) {
      console.error(`Elemento pai "${this.father}" não encontrado`);
      return this;
    }
    fatherElement.appendChild(this.screen);
    // Pequeno delay para garantir que a transição de entrada funcione
    requestAnimationFrame(() => {
      this.show();
    });
    return this;
  }

  destroy() {
    if (!this.screen.parentNode) {
      console.warn(`Elemento "${this.nameId}" já foi removido`);
      return this;
    }

    this.screen.style.opacity = "0";
    setTimeout(() => {
      if (this.screen.parentNode) {
        this.screen.remove();
      }
    }, this.transitionDuration);
    return this;
  }

  // Método auxiliar para adicionar classes CSS
  addClass(...classes) {
    this.screen.classList.add(...classes);
    return this;
  }

  // Método auxiliar para adicionar conteúdo
  setContent(content) {
    if (typeof content === "string") {
      this.screen.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      this.screen.appendChild(content);
    }
    return this;
  }

  // Getter para o elemento DOM
  getElement() {
    return this.screen;
  }
}
