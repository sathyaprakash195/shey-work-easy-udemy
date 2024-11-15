import ProjectInfo from "@/components/functional/project-info";
import PageTitle from "@/components/ui/page-title";
import { IProject } from "@/interfaces";
import { getProjectById } from "@/server-actions/projects";
import { Alert } from "antd";
import React from "react";

interface ProjectInfoPageProps {
  params: {
    projectid: string;
  };
}

async function ProjectInfoPage({ params }: ProjectInfoPageProps) {
  const projectResponse = await getProjectById(params.projectid);
  if (!projectResponse.success) {
    return <Alert message="Failed to load project" type="error" />;
  }

  const project: IProject = projectResponse.data;
  return (
    <div>
      <PageTitle title={project.name} />

      <ProjectInfo project={project} />
    </div>
  );
}

export default ProjectInfoPage;
