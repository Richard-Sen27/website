import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { createCssVariablesTheme } from "shiki";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";

/**
 * Renders a post body.
 *
 * Highlighting emits --shiki-* custom properties rather than baked-in hex, so
 * code blocks resolve through theme.css like everything else. Shiki 4 dropped
 * the bundled "css-variables" theme name, so the theme is constructed here.
 */
const codeTheme = createCssVariablesTheme({
  name: "tokens",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});


const components = {
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
  img: ({ src, alt = "", ...props }: ComponentProps<"img">) =>
    typeof src === "string" ? (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="h-auto w-full"
        {...(props as Omit<ComponentProps<typeof Image>, "src" | "alt">)}
      />
    ) : null,
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              { theme: codeTheme, keepBackground: false },
            ],
            [
              rehypeAutolinkHeadings,
              {
                behavior: "append",
                properties: { className: "heading-anchor", ariaHidden: true, tabIndex: -1 },
                content: { type: "text", value: "#" },
              },
            ],
          ],
        },
      }}
    />
  );
}
