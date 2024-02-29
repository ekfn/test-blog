import useLocalStorage from "@/hooks/useLocalStorage";

export default function useCommentsQuery({ articleId }: { articleId: number }) {
  const [comments] = useLocalStorage("test-blog:comments");

  return {
    loading: comments === undefined,
    comments: comments?.filter((it) => it.articleId === articleId).reverse(),
  };
}
