"use client";

import useCommentsQuery from "../hooks/useCommentsQuery";
import Comment from "../ui/comment";
import CommentForm from "./comment-form";

export default function Comments({ articleId }: { articleId: number }) {
  const { comments, loading } = useCommentsQuery({ articleId });

  return (
    <div className="flex flex-col gap-4">
      <CommentForm articleId={articleId} />
      {loading ? (
        <div>loading...</div>
      ) : (
        comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
}
