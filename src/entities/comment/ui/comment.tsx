import { CommentFragment } from "../types";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);

export default function Comment({ comment }: { comment: CommentFragment }) {
  return (
    <div>
      <time dateTime={comment.createdAt} className="text-sm text-gray-600">
        {formatDate(new Date(comment.createdAt))}
      </time>
      <p className="mt-0.5">{comment.text}</p>
    </div>
  );
}
