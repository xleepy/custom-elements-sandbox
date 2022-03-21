class HelloWorld extends HTMLElement {
  #intervalId;

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.#intervalId = setInterval(() => {
      this.render(new Date().toString());
    }, 100);
  }

  disconnectedCallback() {
    clearInterval(this.#intervalId);
    this.#intervalId = undefined;
  }

  render(date) {
    this.shadowRoot.innerHTML = `<div>
    ${date}
    </div>`;
  }
}

customElements.define('hello-world', HelloWorld);
