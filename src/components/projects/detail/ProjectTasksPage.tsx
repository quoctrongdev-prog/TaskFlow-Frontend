"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import {
  createTask,
  deleteTask,
  getProjects,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "@/lib/api";

import type { CreateTaskData, Project, Task, TaskStatus } from "@/lib/types";

import TaskCard from "./TaskCard";
import TaskFormModal from "./TaskFormModal";

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

  const loadTasks = useCallback(async () => {
    if (authLoading || !user) return;

    try {
      setLoading(true);
      setError("");

      const [taskData, projectData] = await Promise.all([
        getTasks(projectId),
        getProjects(),
      ]);

      setTasks(taskData);

      const currentProject = projectData.find(
        (project) => project.project_id === projectId,
      );

      setProjectName(currentProject?.name ?? "Project");
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
    } catch (err) {
      console.error("Update task status error:", err);
      window.alert(
        "Không thể đổi trạng thái. Chỉ người tạo task được phép đổi.",
      );
      await loadTasks();
    }
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
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <header className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {" "}
            {projectName ? `${projectName}` : "Loading..."}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void loadTasks()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            <Plus size={17} />
            Create task
          </button>
        </div>
      </header>

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
