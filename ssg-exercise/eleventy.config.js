module.exports = function (eleventyConfig) {
  for (const file of [
    "contact.html",
    "experience.html",
    "experiments.html",
    "fact-panel.css",
    "fact-panel.js",
    "form-no-js.html",
    "form-with-js.html",
    "form.js",
    "my-carnival.mp3",
    "part1",
    "profile-placeholder.svg",
    "profilePIC.jpg",
    "projects.html",
    "sphealSPIN.mp4",
    "style.css",
    "theme.js",
  ]) {
    eleventyConfig.addPassthroughCopy(`src/${file}`);
  }
  return { dir: { input: "src", includes: "_includes", output: "_site" }, templateFormats: ["njk"] };
};
