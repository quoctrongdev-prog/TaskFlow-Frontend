export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string;
  dueDate: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  progress: number;
  tasks: number;
  completed: number;
  color: string;
};
