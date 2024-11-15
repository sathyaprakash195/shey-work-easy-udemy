import TaskForm from "@/components/functional/project-info/tasks/task-form";
import PageTitle from "@/components/ui/page-title";
import React from "react";

function CreateTaskPage({ searchParams }: { searchParams: any }) {
  const projectName = searchParams.projectName || "";
  return (
    <div>
      <div>
        <PageTitle title="Create Task" />
        <h1 className="text-sm text-gray-700 uppercase">Project: {projectName}</h1>
      </div>
      <TaskForm formType="create" />
    </div>
  );
}

export default CreateTaskPage;
