import ProjectForm from "@/components/functional/project-form";
import PageTitle from "@/components/ui/page-title";
import { getProjectById } from "@/server-actions/projects";
import { Alert } from "antd";
import React from "react";

interface EditProjectPageProps {
  params: {
    projectid: string;
  };
}

async function EditProjectPage({ params }: EditProjectPageProps) {
  const projectId = params.projectid;
  const projectResponse = await getProjectById(projectId);
  if (!projectResponse.success) {
    return <Alert message="Failed to load project" type="error" />;
  }

  return (
    <div>
      <PageTitle title="Edit Project" />
      <ProjectForm formType="edit" initialValues={projectResponse.data} />
    </div>
  );
}

export default EditProjectPage;
