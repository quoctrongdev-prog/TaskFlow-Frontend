import { Task } from "@/lib/types";
import ListTask from "./ListTask";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="card mt-6 overflow-hidden">
      <div className="hidden grid-cols-[2fr_1fr_120px_100px_100px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold uppercase text-slate-400 md:grid">
        <span>Task</span>
        <span>Project</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Due</span>
      </div>

      {tasks.map((task) => (
        <ListTask key={task.id} task={task} />
      ))}
    </div>
  );
}
