"use client";

import { useState } from "react";
import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { Project } from "@/lib/types";
import { updateProject } from "@/lib/api";
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
      });

      setEditing(false);
      onChanged?.();
    } catch (error) {
      console.error("Update project error:", error);
      window.alert("Không thể cập nhật project. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  }

  function handleDeleted() {
    onChanged?.();
  }

  return (
    <div className="card relative p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <ProjectActions
        projectId={project.project_id}
        onEdit={() => {
          setName(project.name);
          setDescription(project.description ?? "");
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

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setName(project.name);
                setDescription(project.description ?? "");
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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <FolderKanban size={21} />
          </div>

          <h2 className="mt-5 font-bold text-slate-900">{project.name}</h2>

          <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
            {project.description || "No description provided."}
          </p>

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
