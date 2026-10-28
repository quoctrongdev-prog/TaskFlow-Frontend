"use client";

import { useCallback, useEffect, useState } from "react";
import { getProjects } from "@/lib/api";
import ProjectCard from "./ProjectCard";
import CreateProjectCard from "./CreateProjectCard";
import { Project } from "@/lib/types";

type ProjectGridProps = {
  refreshKey: number;
  onCreate: () => void;
  onProjectCountChange: (count: number) => void;
};

export default function ProjectGrid({
  refreshKey,
  onCreate,
  onProjectCountChange,
}: ProjectGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjects();
      setProjects(data);
      onProjectCountChange(data.length);
    } catch {
      setError("Unable to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects, refreshKey]);

  if (loading) {
    return <p className="mt-7 text-sm text-slate-500">Loading projects...</p>;
  }

  if (error) {
    return (
      <div className="mt-7">
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
        <button
          type="button"
          onClick={() => void loadProjects()}
          className="mt-3 text-sm font-medium text-blue-600"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.project_id}
          project={project}
          onChanged={loadProjects}
        />
      ))}

      <CreateProjectCard onClick={onCreate} />
    </div>
  );
}
