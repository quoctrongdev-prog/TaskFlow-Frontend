"use client";

import { useParams } from "next/navigation";
import ProjectTasksPage from "@/components/projects/detail/ProjectTasksPage";

export default function Page() {
  const params = useParams<{ projectId: string }>();

  return <ProjectTasksPage projectId={params.projectId} />;
}
