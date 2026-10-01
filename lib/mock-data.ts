import { Project, Task } from "./types";

export const projects: Project[] = [
  {
    id: "website",
    name: "Website Redesign",
    description: "Marketing website redesign and launch.",
    progress: 72,
    tasks: 24,
    completed: 17,
    color: "bg-indigo-500"
  },
  {
    id: "mobile",
    name: "Mobile App",
    description: "TaskFlow mobile application.",
    progress: 48,
    tasks: 31,
    completed: 15,
    color: "bg-emerald-500"
  },
  {
    id: "marketing",
    name: "Marketing Campaign",
    description: "Q4 product launch campaign.",
    progress: 35,
    tasks: 20,
    completed: 7,
    color: "bg-amber-500"
  },
  {
    id: "internal",
    name: "Internal Tools",
    description: "Improve internal team workflows.",
    progress: 86,
    tasks: 14,
    completed: 12,
    color: "bg-rose-500"
  }
];

export const tasks: Task[] = [
  { id: "1", title: "Create homepage wireframe", project: "Website Redesign", status: "DONE", priority: "HIGH", assignee: "AM", dueDate: "Sep 18" },
  { id: "2", title: "Implement responsive navbar", project: "Website Redesign", status: "IN_PROGRESS", priority: "HIGH", assignee: "JD", dueDate: "Sep 19" },
  { id: "3", title: "Design pricing section", project: "Website Redesign", status: "REVIEW", priority: "MEDIUM", assignee: "SK", dueDate: "Sep 20" },
  { id: "4", title: "Set up authentication flow", project: "Mobile App", status: "TODO", priority: "HIGH", assignee: "AM", dueDate: "Sep 21" },
  { id: "5", title: "Write API integration tests", project: "Mobile App", status: "IN_PROGRESS", priority: "MEDIUM", assignee: "JD", dueDate: "Sep 22" },
  { id: "6", title: "Prepare launch checklist", project: "Marketing Campaign", status: "TODO", priority: "LOW", assignee: "SK", dueDate: "Sep 25" },
  { id: "7", title: "Update team documentation", project: "Internal Tools", status: "DONE", priority: "LOW", assignee: "AM", dueDate: "Sep 17" },
  { id: "8", title: "Review analytics dashboard", project: "Marketing Campaign", status: "REVIEW", priority: "MEDIUM", assignee: "JD", dueDate: "Sep 23" }
];
