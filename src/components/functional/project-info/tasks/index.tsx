import { IProject } from "@/interfaces";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

function ProjectTasksList({ project }: { project: IProject }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-sm">Filters (Todo)</h1>
        <Button type="primary">
          <Link
            href={`/account/projects/${project._id}/create-task?projectName=${project.name}`}
          >
            Create Task
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ProjectTasksList;
