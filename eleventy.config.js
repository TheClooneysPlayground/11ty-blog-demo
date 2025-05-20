// nav
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

// markdown
import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
import slugify from 'slugify';

const md = new MarkdownIt({ html: true })
.use(MarkdownItAnchor, {
	permalink: MarkdownItAnchor.permalink.ariaHidden({
		class: "header-anchor",
    	placement: 'before'
	}),
});

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// Tell 11ty to use our custom Markdown-it
	eleventyConfig.setLibrary("md", md);
};
