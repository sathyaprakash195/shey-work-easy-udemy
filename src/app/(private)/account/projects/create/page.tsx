import ProjectForm from "@/components/functional/project-form";
import PageTitle from "@/components/ui/page-title";
import React from "react";

function CreateProjectPage() {
  return (
    <div>
      <PageTitle title="Create Project" />
      <ProjectForm formType="create" />
    </div>
  );
}

export default CreateProjectPage;
