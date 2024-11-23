"use client";
import PageTitle from "@/components/ui/page-title";
import { formatDateAndTime } from "@/helpers/date-time-formats";
import { ITask } from "@/interfaces";
import { getProjectsOfLoggedInUser } from "@/server-actions/projects";
import { getAllTasksByUserId } from "@/server-actions/tasks";
import { IUsersStore, usersStore } from "@/store/users-store";
import { Button, message, Table, Select } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

function UserTasksPage() {
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { loggedInUserData }: IUsersStore = usersStore() as any;
  const [userProjects, setUserProjects] = React.useState<any[]>([]);
  const [selectedProject, setSelectedProject] = React.useState<string>("");
  const router = useRouter();

  const fetchUserProjects = async () => {
    try {
      const response = await getProjectsOfLoggedInUser();
      if (response.success) {
        setUserProjects(
          response.data.map((project: any) => ({
            label: project.name,
            value: project._id,
          }))
        );
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasksByUserId({
        userId: loggedInUserData?._id!,
        projectId: selectedProject,
      });
      if (response.success) {
        setTasks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserProjects();
  }, []);

  React.useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  const columns = [
    {
      title: "Task",
      dataIndex: "name",
    },
    {
      title: "Project",
      dataIndex: "project",
      render: (project: any) => project?.name,
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Priority",
      dataIndex: "priority",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (createdBy: any) => createdBy?.name,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: string) => formatDateAndTime(createdAt),
    },
    {
      title: "Action",
      render: (record: any) => {
        return (
          <Button
            type="primary"
            size="small"
            onClick={() =>
              router.push(`/account/projects/${record.project._id}`)
            }
          >
            Go to Project
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col">
      <PageTitle title="All Tasks" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5">
        <div className="flex flex-col">
          <label htmlFor="project" className="text-sm">
            Select project
          </label>
          <Select
            placeholder="Select project"
            options={[{ label: "All", value: "" }, ...userProjects]}
            value={selectedProject}
            onChange={(value) => setSelectedProject(value)}
          />
        </div>
      </div>

      <Table
        dataSource={tasks}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
}

export default UserTasksPage;
