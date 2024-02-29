import { cache } from "react";
import queryArticles from "./queryArticles";

const queryArticle = async ({ slug }: { slug: string }) => {
  const { articles } = await queryArticles();
  const article = articles.find((article) => article.slug === slug) ?? null;

  return article;
};

export default cache(queryArticle);
