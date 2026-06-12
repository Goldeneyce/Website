import { defineArrayMember, defineField, defineType } from "sanity";

const categories = [
  { title: "Planning", value: "Planning" },
  { title: "Safety", value: "Safety" },
  { title: "Maintenance", value: "Maintenance" },
  { title: "Modernization", value: "Modernization" },
  { title: "Products", value: "Products" },
  { title: "Company News", value: "Company News" },
];

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Publishing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "settings",
      description: "Generate this from the title before publishing.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "A short summary shown on blog cards and search results.",
      validation: (rule) => rule.required().min(80).max(240),
    }),
    defineField({
      name: "mainImage",
      title: "Cover Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Describe the image for accessibility.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "settings",
      options: { list: categories, layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "settings",
      initialValue: "Everest World Lifts",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description: "Mark important articles for prominent placement.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "settings",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "blank",
                    title: "Open in a new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      description: "Optional title for search engines. Defaults to the article title.",
      validation: (rule) => rule.max(60).warning("Keep SEO titles under 60 characters."),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Optional search description. Defaults to the excerpt.",
      validation: (rule) =>
        rule.max(160).warning("Keep SEO descriptions under 160 characters."),
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      date: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, category, date, media }) {
      const published = date ? new Date(date).toLocaleDateString("en-GB") : "No date";
      return {
        title,
        subtitle: `${category || "Uncategorised"} · ${published}`,
        media,
      };
    },
  },
});
