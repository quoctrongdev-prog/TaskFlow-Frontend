"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { deleteProject } from "@/lib/api";

type ProjectActionsProps = {
  projectId: string;
  onEdit: () => void;
  onDeleted: () => void;
};

export default function ProjectActions({
  projectId,
  onEdit,
  onDeleted,
}: ProjectActionsProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleOutsideClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa project này không? Hành động này không thể hoàn tác.",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteProject(projectId);
      setOpen(false);
      onDeleted();
    } catch (error) {
      console.error("Delete project error:", error);
      window.alert("Không thể xóa project. Vui lòng thử lại.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div ref={menuRef} className="absolute right-3 top-3 z-20">
      <button
        type="button"
        aria-label="Project options"
        aria-expanded={open}
        disabled={deleting}
        onClick={() => setOpen((previous) => !previous)}
        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreVertical size={22} />
      </button>

      {open && (
        <div className="absolute right-[-6px] -top-14 z-50 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            <Pencil size={16} />
            Edit project
          </button>

          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 size={16} />
            {deleting ? "Deleting..." : "Delete project"}
          </button>
        </div>
      )}
    </div>
  );
}
