import type { ArticleFragment } from "../types";

export default async function fetchArticles({
  limit = 10,
  cursor,
}: {
  limit?: number;
  cursor?: number;
} = {}): Promise<{
  articles: ArticleFragment[];
  cursor: number;
  hasMore: boolean;
}> {
  const response = await fetch(
    `http://localhost:3000/api/articles?limit=${limit}&cursor=${cursor ?? ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
