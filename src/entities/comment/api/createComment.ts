import { getItem, setItem } from "@/hooks/useLocalStorage";
import delay from "@/lib/delay";

export default async function createComment({
  text,
  articleId,
}: {
  text: string;
  articleId: number;
}) {
  // emulating slow answer
  await delay();

  const comments = getItem("test-blog:comments") ?? [];
  const maxId = comments[comments.length - 1]?.id ?? 0;

  const comment = {
    id: maxId + 1,
    text,
    articleId,
    createdAt: new Date().toISOString(),
  };

  setItem("test-blog:comments", [...comments, comment]);
}
