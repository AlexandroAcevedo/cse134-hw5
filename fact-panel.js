"use strict";

class FactPanel extends HTMLElement {
  static get observedAttributes() { return ["compact"]; }

  connectedCallback() {
    if (this.heading) return;
    this.heading = this.addElement("h2", "Chiikawa's Useless Facts");
    this.description = this.addElement("p", "Join Kurimanju and discover something wonderfully useless!");
    this.picture = document.createElement("img");
    this.picture.src = "profilePIC.jpg";
    this.picture.alt = "Kurimanju holding a drink";
    this.picture.className = "fact-mascot";
    this.appendChild(this.picture);
    this.fact = this.addElement("p", "Select the button to discover a random fact.");
    this.button = this.addElement("button", "Get a random fact");
    this.button.type = "button";
    this.status = this.addElement("p", "Ready to load a fact.");
    this.status.setAttribute("role", "status");
    this.source = this.addElement("p", "Source: Useless Facts API");
    this.button.addEventListener("click", () => this.loadFact());
    this.updateMode();
  }

  addElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    this.appendChild(element);
    return element;
  }

  async loadFact() {
    this.button.disabled = true;
    this.status.textContent = "Loading a random fact…";
    try {
      const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random", {
        headers: { Accept: "application/json" },
        cache: "no-store"
      });
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      if (typeof data?.text !== "string" || !data.text.trim()) {
        throw new Error("Expected a nonempty fact.");
      }
      this.fact.textContent = data.text;
      this.status.textContent = "Fact loaded successfully.";
      this.button.textContent = "Show another fact";
    } catch (error) {
      this.status.textContent = "Could not load a fact. Check your connection and try again.";
      this.button.textContent = "Try again";
      console.error("Fact request failed:", error);
    } finally {
      this.button.disabled = false;
    }
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
