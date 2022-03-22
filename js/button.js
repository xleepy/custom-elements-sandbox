class Button extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render().then(() => console.log('hey'));
  }

  #createStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
    .btn {
      font-family: Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
      padding: 0.5rem 1rem;
      background: white;
      cursor: pointer;
      color: black;
      border: none;
      border-radius: 4px;
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

        if (ariaLabel) {
          button.setAttribute('aria-label', ariaLabel);
        }
        button.classList.add('btn');
        button.innerHTML = this.innerHTML;
        this.shadowRoot.append(button);

        resolve();
      }, 0);
    });
  }
}

customElements.define('custom-button', Button);
