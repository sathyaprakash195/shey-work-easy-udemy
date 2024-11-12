"use client";
import React from "react";
import { Form, Tabs } from "antd";
import ProjectBasicInfo from "./basic";
import ProjectRolesTaskStatuses from "./roles-task-statuses";
import ProjectTeamMembers from "./team-members";
const { TabPane } = Tabs;

interface ProjectFormProps {
  formType: "create" | "edit";
  initialValues?: any;
}

function ProjectForm({ formType, initialValues }: ProjectFormProps) {
  const [activeTab, setActiveTab] = React.useState("basic");
  const [projectLogo , setProjectLogo] = React.useState<string | File | null>(null);
  const [taskStatuses , setTaskStatuses] = React.useState<string[]>([]);
  const [roles , setRoles] = React.useState<string[]>([]);
  return (
    <div className="mt-5">
      <Form layout="vertical">
        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
        >
          <TabPane tab="Basic Info" key="basic">
            <ProjectBasicInfo 
              projectLogo={projectLogo}
              setProjectLogo={setProjectLogo}
            />
          </TabPane>
          <TabPane tab="Roles & Task Statuses" key="roles-task-statuses">
            <ProjectRolesTaskStatuses
              taskStatuses={taskStatuses}
              setTaskStatuses={setTaskStatuses}
              roles={roles}
              setRoles={setRoles}
            />
          </TabPane>
          <TabPane tab="Team Members" key="team-members">
            <ProjectTeamMembers />
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
}

export default ProjectForm;
