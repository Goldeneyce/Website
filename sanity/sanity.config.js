import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes/index.js";
import { structure } from "./structure.js";

export default defineConfig({
  name: "default",
  title: "Everest World Lifts Blog",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "80wtnld7",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
