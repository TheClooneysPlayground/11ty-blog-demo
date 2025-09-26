export default {
  eleventyComputed: {
    ogImage: (data) => {
      const { ogImage, ogImages, page } = data;
      if (ogImage) return ogImage;

      const slug = page?.fileSlug;
      if (!slug || !ogImages) return undefined;

      return ogImages[slug];
    },
  },
};
