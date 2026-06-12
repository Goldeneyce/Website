export const structure = (S) =>
  S.list()
    .title("Everest Blog")
    .items([
      S.documentTypeListItem("post").title("All Blog Posts"),
      S.divider(),
      S.listItem()
        .title("Published Posts")
        .child(
          S.documentList()
            .title("Published Posts")
            .schemaType("post")
            .filter('_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt)')
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Drafts")
        .child(
          S.documentList()
            .title("Drafts")
            .schemaType("post")
            .filter('_type == "post" && _id in path("drafts.**")'),
        ),
    ]);
