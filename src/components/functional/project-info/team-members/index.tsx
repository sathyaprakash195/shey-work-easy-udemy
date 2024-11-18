import { IProject } from "@/interfaces";
import React from "react";
import { Table, Tag } from "antd";
import { formatDateAndTime } from "@/helpers/date-time-formats";
function ProjectTeamMembersList({ project }: { project: IProject }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      render: (permissions: string[], record: any) => {
        if (record.role === "OWNER") {
          return "ALL";
        } else {
          return (
            <div className="flex gap-1 flex-wrap">
              {permissions.map((permission, index) => (
                <Tag className="p-2 border border-gray-500" key={index}>
                  {permission}
                </Tag>
              ))}
            </div>
          );
        }
      },
    },
    {
      title: "Added On",
      dataIndex: "addedOn",
    },
  ];
  const dataSource = [];

  if (typeof project.owner === "object") {
    dataSource.push({
      name: project.owner.name,
      role: "OWNER",
      permissions: ["ALL"],
      addedOn: formatDateAndTime(project.createdAt),
    });
  }

  project.teamMembers.forEach((teamMember: any, index: number) => {
    dataSource.push({
      name: teamMember.member.name,
      role: teamMember.role.toUpperCase(),
      permissions: teamMember.permissions,
      addedOn: formatDateAndTime(teamMember.createdAt),
    });
  });

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
}

export default ProjectTeamMembersList;
