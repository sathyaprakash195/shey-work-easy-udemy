import ProjectCard from "@/components/functional/project-card";
import PageTitle from "@/components/ui/page-title";
import { IProject } from "@/interfaces";
import { getProjectsOfLoggedInUser } from "@/server-actions/projects";
import { Alert, Button } from "antd";
import Link from "next/link";
import React from "react";

async function UserAccountProojectsPage() {
  const response = await getProjectsOfLoggedInUser();
  if (!response.success) {
    return <Alert message="Failed to fetch projects" type="error" />;
  }

  const projects: IProject[] = response.data;
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Projects" />
        <Button type="primary">
          <Link href="/account/projects/create">Create Project</Link>
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default UserAccountProojectsPage;
