"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // Sửa lại đường dẫn nếu cần

import ProjectsHeader from "./ProjectsHeader";
import ProjectGrid from "./ProjectGrid";
import CreateProjectModal from "./CreateProjectModal";

export default function ProjectsPage() {
  const { user, loading } = useAuth();
  const [projectCount, setProjectCount] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Chờ khôi phục session hoàn tất
  if (loading) {
    return <p className="text-sm text-slate-500">Loading session...</p>;
  }

  // Chưa đăng nhập thì không gọi API lấy projects
  if (!user) {
    return <p>Please log in to view your projects.</p>;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <ProjectsHeader
        onCreate={() => setShowCreateModal(true)}
        projectCount={projectCount}
      />

      <ProjectGrid
        refreshKey={refreshKey}
        onCreate={() => setShowCreateModal(true)}
        onProjectCountChange={setProjectCount}
      />

      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setRefreshKey((previous) => previous + 1);
          }}
        />
      )}
    </div>
  );
}
