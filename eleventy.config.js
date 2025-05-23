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
};
