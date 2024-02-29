import { promises as fs } from "fs";
import path from "path";
import { articleSchema } from "@/entities/article/types";
import { cache } from "react";

const queryArticles = async ({
  limit,
  cursor,
}: {
  limit?: number;
  cursor?: number;
} = {}) => {
  const json = await fs.readFile(
    path.join(process.cwd(), "src/entities/article/api/data.json"),
    "utf-8"
  );

  const articles = articleSchema
    .array()
    .parse(JSON.parse(json))
    .filter((it) => !cursor || it.id < cursor)
    .reverse();

  const data = limit ? articles.slice(0, limit) : articles;
  const nextCursor = data[data.length - 1]?.id ?? null;
  const hasMore = limit ? Boolean(articles[limit]) : false;

  return { articles: data, cursor: nextCursor, hasMore };
};

export default cache(queryArticles);
