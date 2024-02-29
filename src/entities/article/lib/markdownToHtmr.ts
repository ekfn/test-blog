import dompurify from "isomorphic-dompurify";
import htmr from "htmr";
import { marked } from "marked";

export default function markdownToHtmr(markdown: string) {
  const html = dompurify.sanitize(
    marked.parse(markdown, { async: false }) as string,
    { ALLOWED_TAGS: ["p", "b"] }
  );

  return htmr(html);
}
