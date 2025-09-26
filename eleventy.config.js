// 11ty Nav
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

// Bake our own Markdown anchors
import MarkdownIt from "markdown-it";
import MarkdownItAnchor from "markdown-it-anchor";
// Use yaml for data
import yaml from "js-yaml";
import excerpt from "./lib/excerpt.js";

const OG_FORCE_ENV = process.env.OG_FORCE === "true";

const md = new MarkdownIt({ html: true, linkify: true })
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

	// Copy static assets straight through to the build output
	eleventyConfig.addPassthroughCopy("assets");

	eleventyConfig.addFilter("readableDate", (dateValue, locale = "en-US") => {
		if (!dateValue) return "";
		const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
		if (Number.isNaN(date.getTime())) return "";
		const formatter = new Intl.DateTimeFormat(locale, {
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		});
		return formatter.format(date);
	});

	eleventyConfig.addFilter("machineDate", (dateValue) => {
		if (!dateValue) return "";
		const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
		if (Number.isNaN(date.getTime())) return "";
		return date.toISOString().split("T")[0];
	});

	eleventyConfig.addFilter("excerpt", excerpt);

	eleventyConfig.addFilter("absoluteUrl", (path, base = "") => {
		if (!path) return "";
		try {
			const result = new URL(path, base || "http://localhost");
			return result.toString();
		} catch (error) {
			return path;
		}
	});

	eleventyConfig.on("eleventy.before", async () => {
		const { generateOgImages } = await import("./scripts/generate-og-images.js");
		await generateOgImages({ force: OG_FORCE_ENV });
	});
};
