"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  FolderKanban,
  LoaderCircle,
  Plus,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import {
  createTask,
  deleteTask,
  getProjectProgress,
  getProjects,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "@/lib/api";

import type {
  CreateTaskData,
  Project,
  ProjectProgress,
  Task,
  TaskStatus,
} from "@/lib/types";

import TaskCard from "./TaskCard";
import TaskFormModal from "./TaskFormModal";
import InviteMemberButton from "../InviteMemberButton";
import ProjectMembersSidebar from "./ProjectMembersSidebar";

type ProjectTasksPageProps = {
  projectId: string;
};

export default function ProjectTasksPage({ projectId }: ProjectTasksPageProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { loading: authLoading, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [projectName, setProjectName] = useState("");
  const [progressData, setProgressData] = useState<ProjectProgress | null>(
    null,
  );
  const [projectImage, setProjectImage] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    if (authLoading || !user) return;

    try {
      setLoading(true);
      setError("");

      const [taskData, projectData, progressResult] = await Promise.all([
        getTasks(projectId),
        getProjects(),
        getProjectProgress(projectId).catch((err) => {
          console.error("Get project progress error:", err);
          return null;
        }),
      ]);

      setTasks(taskData);
      setProgressData(progressResult);

      const currentProject = projectData.find(
        (project) => project.project_id === projectId,
      );

      setProjectName(currentProject?.name ?? "Project");
      setProjectImage(currentProject?.image_url ?? null);
      setDueDate(currentProject?.due_date ?? null);
    } catch (err) {
      console.error("Get tasks error:", err);
      setError("Unable to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [projectId, authLoading, user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      setError("Please log in to view this project's tasks.");
      return;
    }

    void loadTasks();
  }, [authLoading, user, loadTasks]);

  async function handleSaveTask(data: CreateTaskData) {
    try {
      setSaving(true);

      if (editingTask) {
        await updateTask(editingTask.task_id, data);
      } else {
        await createTask(projectId, data);
      }

      setFormOpen(false);
      setEditingTask(undefined);
      await loadTasks();
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteTask(task: Task) {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa task "${task.title}" không?`,
    );

    if (!confirmed) return;

    try {
      await deleteTask(task.task_id);
      await loadTasks();
    } catch (err) {
      console.error("Delete task error:", err);
      window.alert("Không thể xóa task. Có thể bạn không phải người tạo task.");
    }
  }

  async function handleStatusChange(task: Task, status: TaskStatus) {
    try {
      const updatedTask = await updateTaskStatus(task.task_id, status);

      setTasks((current) =>
        current.map((item) =>
          item.task_id === task.task_id ? { ...item, ...updatedTask } : item,
        ),
      );
      try {
        const latestProgress = await getProjectProgress(projectId);
        setProgressData(latestProgress);
      } catch (error) {
        console.error("Refresh project progress error:", error);
      }
    } catch (err) {
      console.error("Update task status error:", err);
      window.alert(
        "Không thể đổi trạng thái. Chỉ người tạo task được phép đổi.",
      );
      await loadTasks();
    }
  }

  function formatDueDate(date: string) {
    const [year, month, day] = date.slice(0, 10).split("-");
    return `${day}/${month}/${year}`;
  }

  function openCreateForm() {
    setEditingTask(undefined);
    setFormOpen(true);
  }

  function openEditForm(task: Task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  return (
    <main className="mx-auto max-w-6xl p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Project cover */}
          <div className="aspect-video max-h-64 w-full bg-slate-100">
            {projectImage ? (
              <img
                src={projectImage}
                alt={`Cover image for ${projectName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <FolderKanban size={48} strokeWidth={1.5} />
              </div>
            )}
          </div>

          {/* Due date */}
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white p-4 sm:p-5">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Project due date
              </p>

              {dueDate ? (
                <time
                  dateTime={dueDate.slice(0, 10)}
                  className="mt-1 block font-semibold text-slate-900"
                >
                  {formatDueDate(dueDate)}
                </time>
              ) : (
                <p className="mt-1 text-sm text-slate-400">No due date set</p>
              )}
            </div>
          </div>
        </section>
        <header className="flex min-w-0 flex-col justify-between gap-6 p-5 sm:p-6">
          <div className="min-w-0">
            <h1 className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {projectName || "Loading..."}
            </h1>

            <div className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-2">
            <ProjectMembersSidebar projectId={projectId} />

            <InviteMemberButton projectId={projectId} />

            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <Plus size={17} />
              Create task
            </button>
          </div>
        </header>
      </div>

      {progressData && (
        <section
          aria-label="Project completion progress"
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-slate-900">Project progress</h2>

              <p className="mt-1 text-sm text-slate-500">
                {progressData.completed_tasks} of {progressData.total_tasks}{" "}
                tasks completed
              </p>
            </div>

            <span className="text-2xl font-bold text-indigo-600">
              {progressData.progress}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="Project completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressData.progress}
            className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"
          >
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${progressData.progress}%` }}
            />
          </div>
        </section>
      )}

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
          <button
            type="button"
            onClick={() => void loadTasks()}
            className="mt-2 text-sm font-semibold text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => void loadTasks()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh tasks
        </button>
      </div>

      {loading ? (
        <div className="flex min-h-64 items-center justify-center gap-2 text-slate-500">
          <LoaderCircle className="animate-spin" size={20} />
          Loading tasks...
        </div>
      ) : !error && tasks.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-dashed border-slate-300 px-6 py-14 text-center">
          <h2 className="font-semibold text-slate-800">No tasks yet</h2>
          <p className="mt-2 text-sm text-slate-500">
            Create the first task for this project.
          </p>
          <button
            type="button"
            onClick={openCreateForm}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Create task
          </button>
        </section>
      ) : !error ? (
        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.task_id}
              task={task}
              onEdit={() => openEditForm(task)}
              onDelete={() => void handleDeleteTask(task)}
              onStatusChange={(status) => void handleStatusChange(task, status)}
            />
          ))}
        </section>
      ) : null}

      {formOpen && (
        <TaskFormModal
          projectId={projectId}
          task={editingTask}
          loading={saving}
          onClose={() => {
            setFormOpen(false);
            setEditingTask(undefined);
          }}
          onSubmit={handleSaveTask}
        />
      )}
    </main>
  );
}
