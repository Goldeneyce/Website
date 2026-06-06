import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputDirectory = path.resolve("assets/images/source");
const outputDirectory = path.resolve("assets/images/site");

await mkdir(outputDirectory, { recursive: true });

const sourceImages = (await readdir(inputDirectory)).filter((file) =>
  file.endsWith(".png"),
);

await Promise.all(
  sourceImages.map(async (file) => {
    const output = path.join(outputDirectory, file.replace(/\.png$/i, ".webp"));
    await sharp(path.join(inputDirectory, file))
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(output);
  }),
);

console.log(`Optimized ${sourceImages.length} local site images.`);
