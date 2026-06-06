function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function portableTextToHtml(blocks = []) {
  return blocks
    .map((block) => {
      if (block._type !== "block") return "";

      const text = (block.children || [])
        .map((child) => escapeHtml(child.text))
        .join("");

      if (!text) return "";
      if (block.style === "h2") return `<h2>${text}</h2>`;
      if (block.style === "h3") return `<h3>${text}</h3>`;
      if (block.style === "blockquote") return `<blockquote>${text}</blockquote>`;
      return `<p>${text}</p>`;
    })
    .join("\n");
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets/images/site": "assets/images/site" });
  eleventyConfig.addPassthroughCopy({ "assets/images/brand": "assets/images/brand" });
  eleventyConfig.addPassthroughCopy("assets/download");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date)),
  );
  eleventyConfig.addFilter("portableText", portableTextToHtml);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
