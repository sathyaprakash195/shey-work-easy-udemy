import TaskForm from "@/components/functional/project-info/tasks/task-form";
import PageTitle from "@/components/ui/page-title";
import { getTaskById } from "@/server-actions/tasks";
import { Alert } from "antd";
import React from "react";

interface EditTaskPageProps {
  params: {
    taskid: string;
  };
}

async function EditTaskPage({ params }: EditTaskPageProps) {
  const taskId = params.taskid;
  const taskResponse = await getTaskById(taskId);
  if (!taskResponse.success) {
    return <Alert message="Failed to load task" type="error" />;
  }
  return (
    <div>
      <PageTitle title="Edit Task" />
      <TaskForm formType="edit" initialValues={taskResponse.data} />
    </div>
  );
}

export default EditTaskPage;
