module.exports = async function () {
  const projectId = process.env.SANITY_PROJECT_ID;
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
    body
  }`;
  const endpoint = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`Sanity returned ${response.status}`);
    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.warn(`Unable to load Sanity posts: ${error.message}`);
    return [];
  }
};
