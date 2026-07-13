import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { PublicLink } from "./types";
import { mediaURL } from "./lib";

function wikiLinks(body: string, links: PublicLink[]) {
  const titles = new Map(links.map((link) => [link.object_id, link.title || link.object_id]));
  return body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, id: string, label?: string) => {
    const title = label || titles.get(id) || id;
    return `[${title}](?object=${encodeURIComponent(id)})`;
  });
}

export function MarkdownBody({ body, links, openObject }: { body: string; links: PublicLink[]; openObject: (id: string) => void }) {
  return (
    <article className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children, ...props }) {
            if (href?.startsWith("?object=")) {
              const id = decodeURIComponent(href.slice("?object=".length));
              return <a href={href} onClick={(event) => { event.preventDefault(); openObject(id); }} {...props}>{children}</a>;
            }
            return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
          },
          img({ src, alt, ...props }) {
            return <img src={mediaURL(src)} alt={alt || ""} loading="lazy" {...props} />;
          },
          table({ children }) {
            return <div className="markdown-table-wrap"><table>{children}</table></div>;
          },
          input({ type, checked, ...props }) {
            if (type === "checkbox") return <input type="checkbox" checked={checked} readOnly {...props} />;
            return <input type={type} {...props} />;
          }
        }}
      >
        {wikiLinks(body, links)}
      </ReactMarkdown>
    </article>
  );
}
