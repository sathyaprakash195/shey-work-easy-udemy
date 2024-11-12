import { Form, Input, Select, Upload } from "antd";
import React from "react";

function ProjectBasicInfo({
  projectLogo,
  setProjectLogo,
}: {
  projectLogo: string | File | null;
  setProjectLogo: React.Dispatch<React.SetStateAction<string | File | null>>;
}) {
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <Form.Item
        label="Project Name"
        name="name"
        rules={[{ required: true, message: "Please input the project name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input the project description!" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        <Form.Item
          label="Status"
          name="status"
          rules={[
            { required: true, message: "Please select the project status!" },
          ]}
        >
          <Select options={statusOptions} />
        </Form.Item>
      </div>

      <Form.Item label="Logo" name="logo">
        <Upload
          beforeUpload={(file) => {
            setProjectLogo(file);
            return false;
          }}
          listType="picture-card"
        >
          <div className="span text-xs text-gray-500">Upload logo</div>
        </Upload>
      </Form.Item>
    </div>
  );
}

export default ProjectBasicInfo;
