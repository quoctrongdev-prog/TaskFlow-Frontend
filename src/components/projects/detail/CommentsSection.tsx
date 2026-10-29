"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LoaderCircle,
  MessageCircle,
  Pencil,
  Send,
  Trash2,
  X,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
  createComment,
  deleteComment,
  getTaskComments,
  updateComment,
} from "@/lib/api";

import type { TaskComment } from "@/lib/types";

type CommentsSectionProps = {
  taskId: string;
};

export default function CommentsSection({ taskId }: CommentsSectionProps) {
  const { loading: authLoading, user } = useAuth();

  const [comments, setComments] = useState<TaskComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const loadComments = useCallback(async () => {
    if (authLoading || !user) return;

    try {
      setLoading(true);
      setError("");

      const data = await getTaskComments(taskId);
      setComments(data);
    } catch (err) {
      console.error("Get task comments error:", err);
      setError("Unable to load comments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [taskId, authLoading, user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      setError("Please log in to view comments.");
      return;
    }

    void loadComments();
  }, [authLoading, user, loadComments]);

  async function handleCreateComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent || submitting) return;

    try {
      setSubmitting(true);
      setError("");

      await createComment(taskId, { content: trimmedContent });
      setContent("");

      // Reload để lấy cả tên và avatar do backend JOIN users.
      await loadComments();
    } catch (err) {
      console.error("Create comment error:", err);
      setError("Unable to post your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEditing(comment: TaskComment) {
    setEditingCommentId(comment.comment_id);
    setEditContent(comment.content);
    setError("");
  }

  async function handleUpdateComment(commentId: string) {
    const trimmedContent = editContent.trim();
    if (!trimmedContent || submitting) return;

    try {
      setSubmitting(true);
      setError("");

      await updateComment(commentId, { content: trimmedContent });
      setEditingCommentId(null);
      setEditContent("");

      await loadComments();
    } catch (err) {
      console.error("Update comment error:", err);
      setError("Unable to update your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteComment(comment: TaskComment) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (!confirmed || submitting) return;

    try {
      setSubmitting(true);
      setError("");

      await deleteComment(comment.comment_id);
      setComments((current) =>
        current.filter((item) => item.comment_id !== comment.comment_id),
      );
    } catch (err) {
      console.error("Delete comment error:", err);
      setError("Unable to delete your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function formatCommentDate(date: string) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  if (authLoading || loading) {
    return (
      <section
        aria-label="Task comments"
        className="rounded-2xl border border-slate-200 bg-white p-5"
      >
        <div
          role="status"
          className="flex min-h-28 items-center justify-center gap-2 text-sm text-slate-500"
        >
          <LoaderCircle size={18} className="animate-spin" />
          {authLoading ? "Checking your session..." : "Loading comments..."}
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <p role="alert" className="text-sm text-slate-600">
          Please log in to view and post comments.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Task comments"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex items-center gap-2">
        <MessageCircle size={20} className="text-indigo-600" />
        <h3 className="text-lg font-semibold text-slate-900">Comments</h3>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {comments.length}
        </span>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
          <button
            type="button"
            onClick={() => void loadComments()}
            className="mt-1 text-sm font-semibold text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      <form onSubmit={handleCreateComment} className="mt-5">
        <label
          htmlFor={`new-comment-${taskId}`}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Write a comment
        </label>

        <textarea
          id={`new-comment-${taskId}`}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Share an update with your team..."
          rows={3}
          maxLength={5000}
          disabled={submitting}
          className="w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50"
        />

        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={!content.trim() || submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            Post comment
          </button>
        </div>
      </form>

      <div className="mt-5 border-t border-slate-100 pt-4">
        {comments.length === 0 ? (
          <div className="py-6 text-center">
            <MessageCircle size={28} className="mx-auto text-slate-300" />
            <p className="mt-2 text-sm font-medium text-slate-700">
              No comments yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Start the conversation with your team.
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {comments.map((comment) => {
              const isAuthor = comment.user_id === user.user_id;
              const isEditing = editingCommentId === comment.comment_id;

              return (
                <li key={comment.comment_id} className="flex gap-3">
                  {comment.user_avatar_url ? (
                    <img
                      src={comment.user_avatar_url}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700"
                    >
                      {(comment.user_name || "U")
                        .trim()
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-sm font-semibold text-slate-900">
                        {comment.user_name || "User"}
                      </span>
                      <time
                        dateTime={comment.created_at}
                        className="text-xs text-slate-500"
                      >
                        {formatCommentDate(comment.created_at)}
                      </time>
                      {comment.updated_at !== comment.created_at && (
                        <span className="text-xs text-slate-400">(edited)</span>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="mt-2">
                        <label
                          htmlFor={`edit-comment-${comment.comment_id}`}
                          className="sr-only"
                        >
                          Edit comment
                        </label>
                        <textarea
                          id={`edit-comment-${comment.comment_id}`}
                          value={editContent}
                          onChange={(event) =>
                            setEditContent(event.target.value)
                          }
                          rows={3}
                          maxLength={5000}
                          disabled={submitting}
                          className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50"
                        />
                        <div className="mt-2 flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            disabled={submitting}
                            onClick={() => {
                              setEditingCommentId(null);
                              setEditContent("");
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                          >
                            <X size={15} />
                            Cancel
                          </button>
                          <button
                            type="button"
                            disabled={!editContent.trim() || submitting}
                            onClick={() =>
                              void handleUpdateComment(comment.comment_id)
                            }
                            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                        {comment.content}
                      </p>
                    )}

                    {isAuthor && !isEditing && (
                      <div className="mt-2 flex gap-3">
                        <button
                          type="button"
                          disabled={submitting}
                          onClick={() => startEditing(comment)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600 disabled:opacity-50"
                        >
                          <Pencil size={13} />
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={submitting}
                          onClick={() => void handleDeleteComment(comment)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-600 disabled:opacity-50"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
