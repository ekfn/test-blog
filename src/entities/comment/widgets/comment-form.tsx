"use client";

import { useId, useState } from "react";
import createComment from "../api/createComment";

export default function CommentForm({ articleId }: { articleId: number }) {
  const id = useId();
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formEl = e.currentTarget;
        const formData = new FormData(formEl);
        const text = String(formData.get("comment"));
        await createComment({ text, articleId });
        formEl.reset();

        setSubmitting(false);
      }}
      className="flex flex-col items-start"
    >
      <label htmlFor={`${id}-comment`}>Comment</label>
      <textarea
        name="comment"
        id={`${id}-comment`}
        className="w-full border-2 border-gray-400 rounded px-2 py-1 resize-none"
        rows={2}
        required
      />
      <button
        disabled={submitting}
        className="button self-end mt-1 max-sm:w-full"
      >
        Submit
      </button>
    </form>
  );
}
