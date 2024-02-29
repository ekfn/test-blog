import queryArticles from "@/entities/article/api/queryArticles";
import ArticleCard from "@/entities/article/ui/article-card";
import ArticlesLoader from "@/entities/article/widgets/articles-load-more";

export const revalidate = 1;

export default async function Home() {
  const { articles, cursor, hasMore } = await queryArticles({ limit: 10 });

  return (
    <main className="container flex flex-col gap-6">
      {articles.map((article, idx) => (
        <ArticleCard key={article.id} article={article} priority={idx < 2} />
      ))}
      <ArticlesLoader initialState={{ cursor, hasMore }} />
    </main>
  );
}
