"use strict";

class FactPanel extends HTMLElement {
  static get observedAttributes() { return ["compact"]; }

  connectedCallback() {
    if (this.heading) return;
    this.facts = [
      "Octopuses have three hearts.",
      "Wombats produce cube-shaped droppings.",
      "A group of flamingos is called a flamboyance."
    ];
    this.index = 0;
    this.heading = this.addElement("h2", "Chiikawa's Useless Facts");
    this.description = this.addElement("p", "Join Kurimanju and discover something wonderfully useless!");
    this.picture = document.createElement("img");
    this.picture.src = "profilePIC.jpg";
    this.picture.alt = "Kurimanju holding a drink";
    this.picture.className = "fact-mascot";
    this.appendChild(this.picture);
    this.fact = this.addElement("p", "");
    this.button = this.addElement("button", "Show another fact");
    this.button.type = "button";
    this.status = this.addElement("p", "");
    this.status.setAttribute("role", "status");
    this.source = this.addElement("p", "Source: Local sample data");
    this.button.addEventListener("click", () => {
      this.index = (this.index + 1) % this.facts.length;
      this.renderFact();
    });
    this.renderFact();
    this.updateMode();
  }

  addElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    this.appendChild(element);
    return element;
  }

  renderFact() {
    this.fact.textContent = this.facts[this.index];
    this.status.textContent = `Fact ${this.index + 1} of ${this.facts.length}`;
  }

  attributeChangedCallback() { this.updateMode(); }

  updateMode() {
    if (!this.description) return;
    const compact = this.hasAttribute("compact");
    this.description.hidden = compact;
    this.source.hidden = compact;
    this.picture.hidden = compact;
  }
}

customElements.define("fact-panel", FactPanel);
const factPanel = document.querySelector("#facts");
const modeButton = document.querySelector("#fact-mode");
if (factPanel && modeButton) {
  modeButton.hidden = false;
  modeButton.addEventListener("click", () => {
    const compact = factPanel.toggleAttribute("compact");
    modeButton.textContent = `Switch to ${compact ? "expanded" : "compact"} mode`;
  });
}
