import { formatDateAndTime } from "@/helpers/date-time-formats";
import { IProject, ITask } from "@/interfaces";
import { deleteTaskById, getTasksByProjectId } from "@/server-actions/tasks";
import { Button, message, Modal, Table } from "antd";
import Link from "next/link";
import React, { useEffect } from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { IUsersStore, usersStore } from "@/store/users-store";
import { hasPermission } from "@/helpers/permissions";
import { useRouter } from "next/navigation";

function ProjectTasksList({ project }: { project: IProject }) {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { loggedInUserData }: IUsersStore = usersStore() as any;
  const [selectedTask = null, setSelectedTask] = React.useState<ITask | null>(
    null
  );
  const [showDeleteTaskModal, setShowDeleteTaskModal] = React.useState(false);
  const router = useRouter();
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasksByProjectId({
        projectId: project._id,
      });
      if (response.data) {
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

  const deleteTaskHandler = async () => {
    try {
      setLoading(true);
      const response: any = await deleteTaskById(selectedTask?._id as string);
      if (response.success) {
        message.success(response.message);
        setShowDeleteTaskModal(false);
        setSelectedTask(null);
        fetchTasks();
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns = [
    {
      title: "Task",
      dataIndex: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: string) => formatDateAndTime(createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      render: (assignee: any) => (assignee ? assignee.name : "Unassigned"),
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
      title: "Actions",
      render: (record: any) => (
        <div className="flex gap-5">
          <Button size="small">
            <Eye size={14} />
          </Button>
          {hasPermission({
            project,
            user: loggedInUserData!,
            permission: "edit-task",
          }) && (
            <Button
              size="small"
              onClick={() =>
                router.push(
                  `/account/projects/${project._id}/edit-task/${record._id}?projectName=${project.name}`
                )
              }
            >
              <Edit2 size={14} />
            </Button>
          )}
          {hasPermission({
            project,
            user: loggedInUserData!,
            permission: "delete-task",
          }) && (
            <Button
              size="small"
              onClick={() => {
                setSelectedTask(record);
                setShowDeleteTaskModal(true);
              }}
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>
      ),
    },
  ];

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

      <Table columns={columns} dataSource={tasks} loading={loading} />

      {showDeleteTaskModal && selectedTask && (
        <Modal
          title="Delete Task"
          open={showDeleteTaskModal}
          onCancel={() => setShowDeleteTaskModal(false)}
          centered
          onOk={deleteTaskHandler}
          okText="Yes , Delete"
          okButtonProps={{ loading }}
        >
          <h1 className="text-sm">
            Task name : <b>{selectedTask?.name}</b>
          </h1>
          <p>Are you sure you want to delete this task?</p>
        </Modal>
      )}
    </div>
  );
}

export default ProjectTasksList;
