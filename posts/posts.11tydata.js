export default {
  eleventyComputed: {
    ogImage: (data) => data.ogImage ?? data.ogImages?.[data.page?.fileSlug ?? ""],
  },
};
