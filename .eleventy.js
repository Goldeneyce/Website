function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function portableTextToHtml(blocks = []) {
  const output = [];
  let activeList = null;

  function closeList() {
    if (!activeList) return;
    output.push(`</${activeList}>`);
    activeList = null;
  }

  function renderChildren(block) {
    const definitions = block.markDefs || [];
    return (block.children || [])
      .map((child) => {
        let text = escapeHtml(child.text);
        for (const mark of child.marks || []) {
          if (mark === "strong") text = `<strong>${text}</strong>`;
          else if (mark === "em") text = `<em>${text}</em>`;
          else if (mark === "code") text = `<code>${text}</code>`;
          else {
            const definition = definitions.find((item) => item._key === mark);
            if (definition?._type === "link" && definition.href) {
              const href = escapeHtml(definition.href);
              const target = definition.blank
                ? ' target="_blank" rel="noopener noreferrer"'
                : "";
              text = `<a href="${href}"${target}>${text}</a>`;
            }
          }
        }
        return text;
      })
      .join("");
  }

  for (const block of blocks) {
    if (block._type === "image" && block.url) {
      closeList();
      const caption = block.caption
        ? `<figcaption>${escapeHtml(block.caption)}</figcaption>`
        : "";
      output.push(
        `<figure class="article-body-image"><img src="${escapeHtml(block.url)}" alt="${escapeHtml(block.alt || "")}" loading="lazy">${caption}</figure>`,
      );
      continue;
    }

    if (block._type !== "block") continue;
    const text = renderChildren(block);
    if (!text) continue;

    if (block.listItem) {
      const list = block.listItem === "number" ? "ol" : "ul";
      if (activeList !== list) {
        closeList();
        output.push(`<${list}>`);
        activeList = list;
      }
      output.push(`<li>${text}</li>`);
      continue;
    }

    closeList();
    if (block.style === "h2") output.push(`<h2>${text}</h2>`);
    else if (block.style === "h3") output.push(`<h3>${text}</h3>`);
    else if (block.style === "h4") output.push(`<h4>${text}</h4>`);
    else if (block.style === "blockquote") output.push(`<blockquote>${text}</blockquote>`);
    else output.push(`<p>${text}</p>`);
  }

  closeList();
  return output.join("\n");
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "assets/images/site": "assets/images/site" });
  eleventyConfig.addPassthroughCopy({ "assets/images/brand": "assets/images/brand" });
  eleventyConfig.addPassthroughCopy({ "assets/images/company": "assets/images/company" });
  eleventyConfig.addPassthroughCopy({ "assets/images/projects": "assets/images/projects" });
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
