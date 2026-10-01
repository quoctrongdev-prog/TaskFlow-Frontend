"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { tasks as initialTasks } from "@/lib/mock-data";
import { Priority, TaskStatus } from "@/lib/types";
import TasksHeader from "./TasksHeader";
import TasksToolbar from "./TasksToolbar";
import TaskBoard from "./TaskBoard";
import TaskList from "./TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<"ALL" | Priority>("ALL");
  const [view, setView] = useState<"board" | "list">("board");

  const filtered = useMemo(
    () =>
      tasks.filter(
        (task) =>
          `${task.title} ${task.project} ${task.assignee}`
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          (priority === "ALL" || task.priority === priority),
      ),
    [tasks, search, priority],
  );

  function moveTask(id: string, status: TaskStatus) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status } : task,
      ),
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        <TasksHeader />

        <TasksToolbar
          search={search}
          priority={priority}
          view={view}
          onSearchChange={setSearch}
          onPriorityChange={setPriority}
          onViewChange={() =>
            setView((current) => (current === "board" ? "list" : "board"))
          }
        />

        {view === "board" ? (
          <TaskBoard tasks={filtered} onMove={moveTask} />
        ) : (
          <TaskList tasks={filtered} />
        )}
      </div>
    </AppShell>
  );
}
