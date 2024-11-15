import TaskForm from '@/components/functional/project-info/tasks/task-form'
import PageTitle from '@/components/ui/page-title'
import React from 'react'

function EditTaskPage() {
  return (
    <div>
      <PageTitle title="Edit Task" />
      <TaskForm formType="edit" />
    </div>
  )
}

export default EditTaskPage