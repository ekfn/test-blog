"use client";

import { useState } from "react";
import ArticleCard from "@/entities/article/ui/article-card";
import fetchArticles from "@/entities/article/api/fetchArticles";
import type { ArticleCardFragment } from "@/entities/article/types";
import delay from "@/lib/delay";

export default function ArticlesLoader({
  initialState,
}: {
  initialState: { cursor: number; hasMore: boolean };
}) {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<ArticleCardFragment[]>([]);

  return (
    <>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      {state.hasMore && (
        <div className="flex justify-center">
          {loading ? (
            <span className="border-b-2 border-transparent">Loading...</span>
          ) : (
            <button
              className="border-b-2 border-gray-400 hover:text-gray-600 transition-colors"
              onClick={async () => {
                setLoading(true);

                // emulating slow answer
                await delay();

                const {
                  articles: nextArticles,
                  cursor,
                  hasMore,
                } = await fetchArticles({
                  cursor: state.cursor,
                  limit: 2,
                });

                setArticles((articles) => [...articles, ...nextArticles]);
                setState({ cursor, hasMore });
                setLoading(false);
              }}
            >
              Read more
            </button>
          )}
        </div>
      )}
    </>
  );
}
