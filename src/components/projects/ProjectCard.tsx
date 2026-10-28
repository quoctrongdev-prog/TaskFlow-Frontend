"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { Project, ProjectProgress } from "@/lib/types";
import {
  getProjectProgress,
  updateProject,
  uploadProjectImage,
} from "@/lib/api";
import ProjectActions from "./ProjectActions";

type ProjectCardProps = {
  project: Project;
  onChanged?: () => void;
};

export default function ProjectCard({ project, onChanged }: ProjectCardProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description ?? "");
  const [saving, setSaving] = useState(false);
  const [progressData, setProgressData] = useState<ProjectProgress | null>(
    null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dueDate, setDueDate] = useState(project.due_date?.slice(0, 10) ?? "");

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      try {
        const data = await getProjectProgress(project.project_id);

        if (!cancelled) {
          setProgressData(data);
        }
      } catch (error) {
        console.error("Get project progress error:", error);
      }
    }

    void loadProgress();

    return () => {
      cancelled = true;
    };
  }, [project.project_id]);

  // const initial = name?.trim().charAt(0).toUpperCase();
  // const avatarUrl = project.created_by_avatar_url;

  function formatDueDate(date: string) {
  const [year, month, day] = date.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      window.alert("Project name không được để trống.");
      return;
    }

    try {
      setSaving(true);

      await updateProject(project.project_id, {
        name: name.trim(),
        description: description.trim(),
        due_date: dueDate || null,
      });

      if (imageFile) {
        setUploadingImage(true);
        await uploadProjectImage(project.project_id, imageFile);
      }

      setEditing(false);
      setImageFile(null);
      setImagePreview(null);
      //Load lại dừ liệu (api load projects từ component cha truyền xuống)
      onChanged?.();
    } catch (error) {
      console.error("Update project error:", error);
      window.alert("Không thể cập nhật project. Vui lòng thử lại.");
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  }

  function handleDeleted() {
    onChanged?.();
  }

  return (
    <div className="card relative p-5 transition hover:z-10 hover:-translate-y-0.5 hover:shadow-lg">
      <ProjectActions
        projectId={project.project_id}
        onEdit={() => {
          setName(project.name);
          setDescription(project.description ?? "");
          setDueDate(project.due_date?.slice(0, 10) ?? "");
          setImageFile(null);
          setImagePreview(null);
          setEditing(true);
        }}
        onDeleted={handleDeleted}
      />

      {editing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <h2 className="font-bold text-slate-900">Edit project</h2>

          <div>
            <label
              htmlFor={`project-name-${project.project_id}`}
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Project name
            </label>
            <input
              id={`project-name-${project.project_id}`}
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor={`project-description-${project.project_id}`}
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id={`project-description-${project.project_id}`}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor={`project-due-date-${project.project_id}`}
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Due date
            </label>

            <input
              id={`project-due-date-${project.project_id}`}
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor={`project-image-${project.project_id}`}
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Project cover image
            </label>

            <div className="mb-3 aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
              {imagePreview || project.image_url ? (
                <img
                  src={imagePreview || project.image_url || ""}
                  alt="Project cover preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  No cover image
                </div>
              )}
            </div>

            <input
              id={`project-image-${project.project_id}`}
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;

                if (!file) return;

                if (!file.type.startsWith("image/")) {
                  window.alert("Please select an image file.");
                  event.target.value = "";
                  return;
                }

                if (file.size > 5 * 1024 * 1024) {
                  window.alert("Image size must not exceed 5 MB.");
                  event.target.value = "";
                  return;
                }

                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
              className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving || uploadingImage
                ? uploadingImage
                  ? "Uploading image..."
                  : "Saving..."
                : "Save changes"}
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
                setName(project.name);
                setDescription(project.description ?? "");
                setDueDate(project.due_date?.slice(0, 10) ?? "");
                setEditing(false);
              }}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <Link href={`/projects/${project.project_id}`} className="block pr-8">
          {/* Project image */}
          <div className="mb-4 aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={`Cover image for ${project.name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <FolderKanban size={40} strokeWidth={1.5} />
              </div>
            )}
          </div>

          {/* Project name */}
          <h2 className="font-bold text-slate-900">{project.name}</h2>

          {/* Description */}
          <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
            {project.description || "No description provided."}
          </p>

          {/* Due date */}
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="font-medium text-slate-600">Due date:</span>

            {project.due_date ? (
              <time
                dateTime={project.due_date.slice(0, 10)}
                className="text-slate-700"
              >
                {formatDueDate(project.due_date)}
              </time>
            ) : (
              <span className="text-slate-400">Not set</span>
            )}
          </div>

          {/* Progress */}
          {progressData && (
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-slate-600">
                  Progress
                </span>

                <span className="text-xs font-semibold text-indigo-600">
                  {progressData.progress}%
                </span>
              </div>

              <div
                role="progressbar"
                aria-label={`Progress of ${project.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressData.progress}
                className="h-2 overflow-hidden rounded-full bg-slate-100"
              >
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${progressData.progress}%` }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                {progressData.completed_tasks} of {progressData.total_tasks}{" "}
                tasks completed
              </p>
            </div>
          )}

          {/* Creator */}
          {project.created_by_name && (
            <span className="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Created by {project.created_by_name}
            </span>
          )}
        </Link>
      )}
    </div>
  );
}
