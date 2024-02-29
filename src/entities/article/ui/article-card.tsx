import Image from "next/image";
import Link from "next/link";
import type { ArticleCardFragment } from "../types";

type Props = {
  article: ArticleCardFragment;
  priority?: boolean;
};

export default function ArticleCard({ article, priority = false }: Props) {
  const {
    images: { card: cardImage, caption: imageCaption },
  } = article;

  return (
    <article className="grid gap-y-3 items-start grid-cols-1 sm:grid-cols-[240px_1fr] sm:gap-x-6">
      <Image
        src={cardImage.url}
        width={cardImage.width}
        height={cardImage.height}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, 240px"
        alt={imageCaption}
        priority={priority}
        className="rounded-lg"
      />
      <div className="grid gap-y-2 justify-items-start grid-cols-1">
        <h1 className="h1">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h1>
        <p>{article.previewText}</p>
        <Link className="button" href={`/blog/${article.slug}`}>
          Read article
        </Link>
      </div>
    </article>
  );
}
