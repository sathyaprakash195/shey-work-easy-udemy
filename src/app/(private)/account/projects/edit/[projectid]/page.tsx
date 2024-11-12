import ProjectForm from "@/components/functional/project-form";
import PageTitle from "@/components/ui/page-title";
import React from "react";

function EditProjectPage() {
  return (
    <div>
      <PageTitle title="Edit Project" />
      <ProjectForm formType="edit" />
    </div>
  );
}

export default EditProjectPage;
