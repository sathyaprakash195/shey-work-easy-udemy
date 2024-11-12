import { Button, Input, Tag } from "antd";
import React from "react";

interface ProjectRolesTaskStatusesProps {
  taskStatuses: string[];
  setTaskStatuses: (taskStatuses: string[]) => void;
  roles: string[];
  setRoles: (roles: string[]) => void;
}

function ProjectRolesTaskStatuses({
  taskStatuses,
  setTaskStatuses,
  roles,
  setRoles,
}: ProjectRolesTaskStatusesProps) {
  const [rolesInput, setRolesInput] = React.useState<string>("");
  const [taskStatusInput, setTaskStatusInput] = React.useState<string>("");

  const addRolesHandler = () => {
    const newRoles = rolesInput
      .split(",")
      .map((role) => role.trim().toLowerCase());
    setRoles([...roles, ...newRoles]);
    setRolesInput("");
  };

  const deleteRoleHandler = (role: string) => {
    setRoles(roles.filter((r) => r !== role));
  };

  const addTaskStatusHandler = () => {
    const newTaskStatus = taskStatusInput
      .split(",")
      .map((status) => status.trim().toLowerCase());
    setTaskStatuses([...taskStatuses, ...newTaskStatus]);
    setTaskStatusInput("");
  };

  const deleteTaskStatusHandler = (status: string) => {
    setTaskStatuses(taskStatuses.filter((s) => s !== status));
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-sm font-bold text-gray-500 pb-1">Roles</h1>
        <div className="flex gap-5 items-end">
          <Input
            value={rolesInput}
            onChange={(e) => setRolesInput(e.target.value)}
            placeholder="Enter roles (Comma separated) e.g. Developer, Designer"
          />
          <Button
            disabled={!rolesInput}
            type="primary"
            onClick={addRolesHandler}
          >
            Add
          </Button>
        </div>

        <div className="mt-5 flex gap-5 flex-wrap">
          {roles.map((role) => (
            <Tag
              key={role}
              className="p-2 border-gray-500"
              closable
              onClose={() => deleteRoleHandler(role)}
            >
              {role}
            </Tag>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-sm font-bold text-gray-500 pb-1">Task Statuses</h1>
        <div className="flex gap-5 items-end">
          <Input
            value={taskStatusInput}
            onChange={(e) => setTaskStatusInput(e.target.value)}
            placeholder="Enter roles (Comma separated) e.g. Pending, In Progress , Completed, Testing"
          />
          <Button
            disabled={!taskStatusInput}
            type="primary"
            onClick={addTaskStatusHandler}
          >
            Add
          </Button>
        </div>

        <div className="mt-5 flex gap-5 flex-wrap">
          {taskStatuses.map((status) => (
            <Tag
              key={status}
              className="p-2 border-gray-500"
              closable
              onClose={() => deleteTaskStatusHandler(status)}
            >
              {status}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectRolesTaskStatuses;
