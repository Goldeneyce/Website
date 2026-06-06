import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("_site");
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else files.push(target);
  }

  return files;
}

for (const file of (await walk(outputDirectory)).filter((item) =>
  item.endsWith(".html"),
)) {
  const html = await readFile(file, "utf8");
  const relativeFile = path.relative(outputDirectory, file);

  if (!html.includes('<html lang="en">')) errors.push(`${relativeFile}: missing lang`);
  if (!html.includes('name="description"')) {
    errors.push(`${relativeFile}: missing meta description`);
  }
  if (/images\.unsplash\.com|cdnjs\.cloudflare\.com/.test(html)) {
    errors.push(`${relativeFile}: contains an external asset dependency`);
  }
  if (/href="#"/.test(html)) errors.push(`${relativeFile}: contains an empty link`);

  const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(
    (match) => match[1],
  );

  for (const reference of references) {
    if (
      !reference ||
      reference.startsWith("#") ||
      reference.startsWith("http") ||
      reference.startsWith("mailto:") ||
      reference.startsWith("tel:")
    ) {
      continue;
    }

    const cleanReference = reference.split(/[?#]/)[0];
    let target;

    if (cleanReference.startsWith("/")) {
      target = path.join(outputDirectory, cleanReference);
    } else {
      target = path.resolve(path.dirname(file), cleanReference);
    }

    if (path.extname(target) === "") target = path.join(target, "index.html");

    try {
      await access(target);
    } catch {
      errors.push(`${relativeFile}: broken local reference ${reference}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Site validation passed.");
}
