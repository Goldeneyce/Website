const starterPosts = require("./starterPosts.js");

const categoryImages = {
  Planning: "/assets/images/site/passenger-elevator.webp",
  Safety: "/assets/images/company/technical-team.jpg",
  Maintenance: "/assets/images/site/maintenance-technician.webp",
  Modernization: "/assets/images/site/commercial-elevator-lobby.webp",
  Products: "/assets/images/site/panoramic-elevator.webp",
  "Company News": "/assets/images/company/manufacturer-visit.jpg",
};

function addDefaultImages(posts) {
  return posts.map((post) => ({
    ...post,
    imageUrl:
      post.imageUrl ||
      categoryImages[post.category] ||
      "/assets/images/site/hero-elevator.webp",
    imageAlt: post.imageAlt || post.title,
  }));
}

module.exports = async function () {
  const projectId = process.env.SANITY_PROJECT_ID || "80wtnld7";
  const dataset = process.env.SANITY_DATASET || "production";
  const apiVersion = process.env.SANITY_API_VERSION || "2025-06-01";

  if (!projectId) {
    console.warn("SANITY_PROJECT_ID is not set. Building the blog with an empty state.");
    return [];
  }

  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    publishedAt,
    category,
    author,
    featured,
    seoTitle,
    seoDescription,
    "imageUrl": mainImage.asset->url,
    "imageAlt": coalesce(mainImage.alt, title),
    "imageCaption": mainImage.caption,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    }
  }`;
  const endpoint = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const data = await response.json();
    const posts = data.result || [];
    if (posts.length) return addDefaultImages(posts);
    console.warn("No published Sanity posts found. Building with starter blog posts.");
    return addDefaultImages(starterPosts);
  } catch (error) {
    console.warn(`Unable to load Sanity posts: ${error.message}. Building with starter blog posts.`);
    return addDefaultImages(starterPosts);
  }
};
