import { Button, message, Table, Tag } from "antd";
import React, { useState } from "react";
import TeamMemberForm from "./team-member-form";
import { Trash2, Edit2 } from "lucide-react";
import { updateProjectById } from "@/server-actions/projects";
import { useParams } from "next/navigation";

interface ProjectTeamMembersProps {
  teamMembers: any[];
  setTeamMembers: (value: any[]) => void;
  roles?: string[];
}

function ProjectTeamMembers({
  teamMembers,
  setTeamMembers,
  roles = [],
}: ProjectTeamMembersProps) {
  const [showTeamMemberForm, setShowTeamMemberForm] = React.useState(false);
  const [teamMemberFormType, setTeamMemberFormType] =
    React.useState<string>("add");
  const [selectedTeamMember, setSelectedTeamMember] = React.useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const deleteTeamMemberHandler = async (email: string) => {
    try {
      setLoading(true);
      const newTeamMembers = await teamMembers.filter(
        (teamMember) => teamMember.member.email !== email
      );
      const response = await updateProjectById({
        projectId: params.projectid as string,
        payload: { teamMembers: newTeamMembers },
      });
      if (response.success) {
        setTeamMembers(newTeamMembers);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  let dataSource: any = [];

  teamMembers.forEach((teamMember, index) => {
    dataSource.push({
      name: teamMember.member.name,
      role: teamMember.role.toUpperCase(),
      permissions: teamMember.permissions,
      email: teamMember.member.email,
    });
  });

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
      render: (permissions: string[]) => {
        return (
          <div className="flex gap-1">
            {permissions.map((permission, index) => (
              <Tag className="p-2 border border-gray-500">{permission}</Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <div className="flex gap-5">
          <Button
            size="small"
            onClick={() => {
              setShowTeamMemberForm(true);
              setTeamMemberFormType("edit");
              setSelectedTeamMember(record);
            }}
          >
            <Edit2 size={15} />
          </Button>

          <Button
            size="small"
            onClick={() => deleteTeamMemberHandler(record.email)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setShowTeamMemberForm(true);
            setTeamMemberFormType("add");
          }}
          type="primary"
        >
          Add Team Member
        </Button>
      </div>

      <Table dataSource={dataSource} columns={columns} loading={loading} />

      {showTeamMemberForm && (
        <TeamMemberForm
          showTeamMemberForm={showTeamMemberForm}
          setShowTeamMemberForm={setShowTeamMemberForm}
          teamMembers={teamMembers}
          setTeamMembers={setTeamMembers}
          teamMemberFormType={teamMemberFormType}
          selectedTeamMember={selectedTeamMember}
          roles={roles}
        />
      )}
    </div>
  );
}

export default ProjectTeamMembers;
