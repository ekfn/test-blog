import Image from "next/image";
import { ArticleFragment } from "../types";
import markdownToHtmr from "../lib/markdownToHtmr";

type Props = {
  article: ArticleFragment;
};

export default function Article({ article }: Props) {
  const {
    images: { banner: bannerImage, caption: imageCaption },
  } = article;

  return (
    <article className="grid grid-cols-1 gap-4">
      <Image
        src={bannerImage.url}
        width={bannerImage.width}
        height={bannerImage.height}
        sizes="(max-width: 1024px) 100vw, 1024px"
        alt={imageCaption}
        priority
        className="rounded-lg"
      />
      <h1 className="h1 md:mt-8">{article.title}</h1>
      {markdownToHtmr(article.text)}
    </article>
  );
}
