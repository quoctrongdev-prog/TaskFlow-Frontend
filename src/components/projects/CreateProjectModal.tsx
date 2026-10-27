"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createProject, uploadProjectImage } from "@/lib/api";

type CreateProjectModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateProjectModal({
  onClose,
  onSuccess,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    // console.log("Description state:", JSON.stringify(description));

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      setLoading(true);

      const project = await createProject({
        name: name.trim(),
        description: description.trim(),
        due_date: dueDate || null,
      });

      if (imageFile) {
        await uploadProjectImage(project.project_id, imageFile);
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err !== null && "response" in err
          ? (
              err as {
                response?: { data?: { message?: string } };
              }
            ).response?.data?.message
          : undefined;

      setError(message || "Unable to create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        //target: phần tử thực sự mà bạn nhấn chuột vào.
        //currentTarget: phần tử đang gắn sự kiện onMouseDown, ở đây luôn là div nền ngoài.
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-project-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="create-project-title"
          className="text-xl font-bold text-slate-900"
        >
          Create a new project
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="project-name"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Project name
            </label>
            <input
              id="project-name"
              required
              maxLength={100}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter project name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="project-description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe your project"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="project-due-date"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Due date
            </label>

            <input
              id="project-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900"
            />
          </div>

          <div>
            <label
              htmlFor="project-image"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Project image
            </label>

            <input
              id="project-image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;

                if (!file) {
                  setImageFile(null);
                  setImagePreview("");
                  return;
                }

                if (!file.type.startsWith("image/")) {
                  setError("Please select an image file.");
                  event.target.value = "";
                  return;
                }

                if (file.size > 5 * 1024 * 1024) {
                  setError("Image must be 5 MB or smaller.");
                  event.target.value = "";
                  return;
                }

                setError("");
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
              className="w-full text-sm text-slate-600"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Project image preview"
                className="mt-3 h-40 w-full rounded-xl object-cover"
              />
            )}
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create project"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
