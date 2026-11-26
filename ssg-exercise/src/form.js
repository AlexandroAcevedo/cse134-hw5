"use strict";
const form = document.querySelector("#contact-form");
if (form) {
  const fields = [...form.querySelectorAll("#name, #email, #comments")];
  const comments = form.querySelector("#comments");
  const errorArea = form.querySelector("#error-messages");
  const counter = form.querySelector("#character-info");
  const historyInput = form.querySelector("#form-errors");
  const form_errors = [];
  const visited = new Set();
  const edited = new Set();
  let attemptQueued = false;
  counter.hidden = false;
  function message(field) {
    const v = field.validity;
    if (v.valueMissing) return "This field is required.";
    if (v.typeMismatch) return "Enter a valid email address, such as name@example.com.";
    if (v.tooShort || (field.minLength > 0 && field.value.length > 0 && field.value.length < field.minLength)) return `Enter at least ${field.minLength} characters.`;
    if (v.tooLong) return `Use no more than ${field.maxLength} characters.`;
    return "";
  }
  function validate(field) {
    field.setCustomValidity("");
    const error = message(field);
    field.setCustomValidity(error);
    return error;
  }
  function render() {
    const errors = [];
    for (const field of fields) {
      const error = visited.has(field) ? validate(field) : "";
      const errorNode = document.getElementById(`${field.id}-error`);
      errorNode.textContent = error ? `Error: ${error}` : "";
      field.classList.toggle("has-error", Boolean(error));
      if (error) errors.push({ field: field.name, message: error });
    }
    errorArea.replaceChildren();
    errorArea.hidden = errors.length === 0;
    if (errors.length) {
      const heading = document.createElement("p"); heading.textContent = "Please correct the following fields:"; errorArea.append(heading);
      const list = document.createElement("ul");
      for (const issue of errors) { const item = document.createElement("li"); item.textContent = `${issue.field}: ${issue.message}`; list.append(item); }
      errorArea.append(list);
    }
  }
  function updateCounter() {
    const remaining = comments.maxLength - comments.value.length;
    counter.classList.toggle("warning", remaining <= 100);
    counter.textContent = remaining === 0 ? "Character limit reached. 0 characters remaining." : remaining <= 100 ? `${remaining} characters remaining. You are approaching the limit.` : `${remaining} characters remaining.`;
  }
  for (const field of fields) {
    field.addEventListener("input", () => { edited.add(field); if (visited.has(field)) render(); if (field === comments) updateCounter(); });
    field.addEventListener("blur", () => { if (edited.has(field)) { visited.add(field); render(); } });
  }
  updateCounter();
  // The browser fires one invalid event per invalid control during a single
  // submission attempt. Record the whole attempt once, not once per event.
  // A timer resets the guard after the synchronous invalid-event sequence.
  form.addEventListener("invalid", event => {
    if (!fields.includes(event.target)) return;
    event.preventDefault();
    if (attemptQueued) return;
    attemptQueued = true;
    for (const field of fields) {
      const error = validate(field);
      if (error) form_errors.push({ field: field.name, message: error });
      visited.add(field);
    }
    render();
    window.setTimeout(() => { attemptQueued = false; }, 0);
  }, true);
  form.addEventListener("submit", event => {
    const invalid = fields.filter(field => validate(field));
    if (invalid.length) {
      event.preventDefault();
      for (const field of fields) { const error = validate(field); if (error) form_errors.push({ field: field.name, message: error }); visited.add(field); }
      render();
      return;
    }
    historyInput.value = JSON.stringify(form_errors);
  });
}
