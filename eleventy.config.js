// 11ty Nav
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

// Bake our own Markdown anchors
import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import slugify from 'slugify';

// Use yaml for data
import yaml from "js-yaml";

const md = new MarkdownIt({ html: true })
.use(MarkdownItAnchor, {
	permalink: MarkdownItAnchor.permalink.ariaHidden({
		class: "header-anchor",
    	placement: 'before'
	}),
});

export default function (eleventyConfig) {
	eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// Tell 11ty to use our custom Markdown-it
	eleventyConfig.setLibrary("md", md);

	eleventyConfig.addFilter("excerpt", (content, paragraphCount = 2) => {
		if (!content) return "";
		const html = String(content);
		const paragraphs = html.match(/<p\b[^>]*>[\s\S]*?<\/p>/gi);
		if (paragraphs && paragraphs.length) {
			return paragraphs.slice(0, paragraphCount).join('').trim();
		}
		const textChunks = html
			.replace(/<[^>]*>/g, '\n')
			.split(/\n{2,}/)
			.map(chunk => chunk.trim())
			.filter(Boolean);
		return textChunks.slice(0, paragraphCount).join('\n\n');
	});
};
