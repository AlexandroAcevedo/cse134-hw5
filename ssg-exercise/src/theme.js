"use strict";
const root = document.documentElement;
try { const saved = localStorage.getItem("portfolio-theme"); if (saved === "light" || saved === "dark") root.dataset.theme = saved; }
catch (error) { console.warn("Theme storage is unavailable."); }
const toggle = document.querySelector("#theme-toggle");
if (toggle) {
  toggle.hidden = false;
  function label() { toggle.textContent = `Switch to ${root.dataset.theme === "dark" ? "light" : "dark"} theme`; }
  label();
  toggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const change = () => { root.dataset.theme = next; label(); try { localStorage.setItem("portfolio-theme", next); } catch (error) { console.warn("Theme could not be saved."); } };
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.startViewTransition(change);
    else change();
  });
}
