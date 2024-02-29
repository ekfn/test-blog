import queryArticle from "@/entities/article/api/queryArticle";
import queryArticles from "@/entities/article/api/queryArticles";
import Article from "@/entities/article/ui/article";
import Comments from "@/entities/comment/widgets/comments";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { articles } = await queryArticles();
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await queryArticle({ slug });

  if (article === null) {
    notFound();
  }

  return {
    title: article.title,
    description: article.previewText,
  };
}

export default async function ArticlePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const article = await queryArticle({ slug });

  if (article === null) {
    notFound();
  }

  return (
    <main className="container flex flex-col gap-4">
      <Article article={article} />
      <Comments articleId={article.id} />
    </main>
  );
}
