"use client";
import { IProject } from "@/interfaces";
import React from "react";
import { Tabs } from "antd";
import ProjectTasksList from "./tasks";
import ProjectTeamMembers from "./team-members";
import ProjectOverview from "./overview";

function ProjectInfo({ project }: { project: IProject }) {
  return (
    <div>
      <Tabs defaultActiveKey="tasks">
        <Tabs.TabPane tab="Tasks" key="tasks">
          <ProjectTasksList project={project} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Team Members" key="team-members">
          <ProjectTeamMembers project={project} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Overview" key="overview">
          <ProjectOverview project={project} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default ProjectInfo;
