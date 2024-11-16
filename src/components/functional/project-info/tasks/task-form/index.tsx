"use client";
import { taskPrioritiesList, taskTypesList } from "@/constants";
import { uploadFileAndGetUrl } from "@/helpers/file-uploads";
import { IProject } from "@/interfaces";
import { getProjectById } from "@/server-actions/projects";
import { createNewTask, editTaskById } from "@/server-actions/tasks";
import { IUsersStore, usersStore } from "@/store/users-store";
import { Form, message, Input, Select, Button, Upload } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Editor from "react-simple-wysiwyg";

interface ITaskFormProps {
  formType?: "create" | "edit";
  initialValues?: any;
}

function TaskForm({ formType, initialValues }: ITaskFormProps) {
  const [projectData, setProjectData] = React.useState<IProject | null>(null);
  const params: any = useParams();
  const [description, setDescription] = React.useState<string>(
    initialValues?.description || ""
  );
  const [existingReferenceFiles, setExistingReferenceFiles] = React.useState<
    any[]
  >(initialValues?.referenceFiles || []);
  const [selectedReferenceFiles, setSelectedReferenceFiles] = React.useState<
    any[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { loggedInUserData }: IUsersStore = usersStore() as any;
  const router = useRouter();
  const getData = async () => {
    try {
      const response = await getProjectById(params.projectid);
      if (response.success) {
        setProjectData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
      setProjectData(null);
    }
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      let referenceFilesWithUrls = [];
      for (let file of selectedReferenceFiles) {
        const url = await uploadFileAndGetUrl(file);
        referenceFilesWithUrls.push({
          name: file.name,
          url,
          type: file.type,
        });
      }

      let response: any = null;

      if (formType === "create") {
        // Create task
        const payload = {
          ...values,
          description,
          referenceFiles: referenceFilesWithUrls,
          createdBy: loggedInUserData?._id,
          project: params.projectid,
        };

        response = await createNewTask(payload);
      } else {
        const payload = {
          ...values,
          description,
          referenceFiles: [
            ...existingReferenceFiles,
            ...referenceFilesWithUrls,
          ],
        };
        response = await editTaskById({
          taskId: initialValues._id,
          payload,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push(`/account/projects/${params.projectid}`);
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
    getData();
  }, []);

  const taskStatusesList = projectData?.taskStatuses.map((status) => ({
    label: status.toUpperCase(),
    value: status,
  }));

  const teamMembersList = projectData?.teamMembers.map((item: any) => ({
    label: item.member.name,
    value: item.member._id,
  }));

  const onRemove = (file: any) => {
    const isNewFile = selectedReferenceFiles.find((f) => f.name === file.name);
    if (isNewFile) {
      setSelectedReferenceFiles((prev) =>
        prev.filter((f) => f.name !== file.name)
      );
    } else {
      setExistingReferenceFiles((prev) =>
        prev.filter((f) => f.name !== file.name)
      );
    }
  };

  let existingAndNewSelectedFiles: any = [];

  existingReferenceFiles?.forEach((file: any) => {
    existingAndNewSelectedFiles.push({
      uid: file.name,
      name: file.name,
      url: file.url,
      type: file.type,
      status: "done",
    });
  });

  selectedReferenceFiles.forEach((file: any) => {
    existingAndNewSelectedFiles.push({
      uid: file.name,
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type,
      status: "done",
    });
  });

  return (
    <div className="mt-7">
      <Form layout="vertical" onFinish={onFinish} initialValues={initialValues}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
            className="col-span-4"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select a priority" }]}
          >
            <Select options={taskPrioritiesList} />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select a type" }]}
          >
            <Select options={taskTypesList} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select options={taskStatusesList} />
          </Form.Item>

          <Form.Item
            name="assignee"
            label="Assignee"
            rules={[{ required: true, message: "Please select an assignee" }]}
          >
            <Select options={teamMembersList} />
          </Form.Item>

          <Form.Item label="Description" className="col-span-4">
            <Editor
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              className="border border-gray-300"
            />
          </Form.Item>

          <div className="cols-span-4">
            <Upload
              beforeUpload={(file) => {
                setSelectedReferenceFiles((prev) => [...prev, file]);
                return false;
              }}
              listType="text"
              multiple
              fileList={existingAndNewSelectedFiles}
              onRemove={(file: any) => onRemove(file)}
            >
              Upload reference files
            </Upload>
          </div>

          <div className="flex justify-end col-span-4 gap-5">
            <Button
              onClick={() =>
                router.push(`/account/projects/${params.projectid}`)
              }
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              {formType === "create" ? "Create" : "Update"} Task
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default TaskForm;
