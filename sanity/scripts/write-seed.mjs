import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const posts = require("../../src/_data/starterPosts.js");
const directory = path.dirname(fileURLToPath(import.meta.url));
const output = path.resolve(directory, "../seed/starter-posts.ndjson");

const documents = posts.map(({ id, slug, imageUrl, imageAlt, ...post }) => ({
  _id: id,
  _type: "post",
  ...post,
  slug: { _type: "slug", current: slug },
}));

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${documents.map((document) => JSON.stringify(document)).join("\n")}\n`);
console.log(`Prepared ${documents.length} starter posts at ${output}`);
