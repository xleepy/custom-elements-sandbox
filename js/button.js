class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  #createStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
    .btn {
      font-family: Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
      background: white;
      cursor: pointer;
      color: black;
      border: none;
      padding: 0 1rem;
      border-radius: 4px;
    }
    .btn-size--sm {
      height: 20px;
    }
    .btn-size--md {
      height: 36px;
    }
    .btn:active {
      background: rgba(255,255,255, 0.75);
    }
    `;
    return style;
  }

  render() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.shadowRoot.append(this.#createStyles());

        const button = document.createElement('button');
        const ariaLabel = this.getAttribute('aria-label');

        const btnSize = this.getAttribute('size') ?? 'md';

        if (ariaLabel) {
          button.setAttribute('aria-label', ariaLabel);
        }
        button.classList.add('btn', `btn-size--${btnSize}`);
        button.setAttribute('part', 'button');

        button.innerHTML = this.innerHTML;
        this.shadowRoot.append(button);

        resolve();
      }, 0);
    });
  }
}

customElements.define('custom-button', Button);
