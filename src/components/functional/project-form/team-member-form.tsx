import { permissionsList } from "@/constants";
import {
  addTeamMemberToProject,
  updateTeamMemberInProject,
} from "@/server-actions/projects";
import { Button, Checkbox, Input, message, Modal, Select } from "antd";
import { useParams } from "next/navigation";
import React from "react";

interface TeamMemberFormProps {
  showTeamMemberForm: boolean;
  setShowTeamMemberForm: (value: boolean) => void;
  teamMembers: any[];
  setTeamMembers: (value: any[]) => void;
  teamMemberFormType: string;
  roles?: string[];
  selectedTeamMember?: any;
}

function TeamMemberForm({
  showTeamMemberForm,
  setShowTeamMemberForm,
  teamMembers,
  setTeamMembers,
  teamMemberFormType,
  roles = [],
  selectedTeamMember,
}: TeamMemberFormProps) {
  console.log(selectedTeamMember);
  const params = useParams();
  const [email, setEmail] = React.useState(selectedTeamMember?.email || "");
  const [role, setRole] = React.useState(selectedTeamMember?.role || "");
  const [permissions, setPermissions] = React.useState<string[]>(
    selectedTeamMember?.permissions || []
  );
  const [loading = false, setLoading] = React.useState<boolean>(false);
  const rolesOptions = roles.map((role) => ({
    label: role.toUpperCase(),
    value: role,
  }));

  const onPermissionsChange = (permission: string) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((p) => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const addTeamMemberHandler = async () => {
    try {
      setLoading(true);
      const newTeamMember = {
        email,
        role,
        permissions,
      };
      const response = await addTeamMemberToProject({
        ...newTeamMember,
        projectId: params.projectid as string,
      });

      if (response.success) {
        message.success(response.message);
        setTeamMembers([...teamMembers, response.data]);
        setShowTeamMemberForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editTeamMemberHandler = async () => {
    try {
      setLoading(true);
      const response = await updateTeamMemberInProject({
        projectId: params.projectid as string,
        teamMemberData: { email, role, permissions },
      });

      if (response.success) {
        const newTeamMembersData = teamMembers.map((teamMember) => {
          if (teamMember.member.email === email) {
            teamMember.role = role;
            teamMember.permissions = permissions;
          }
          return teamMember;
        });
        setTeamMembers(newTeamMembersData);
        message.success(response.message);
        setShowTeamMemberForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={showTeamMemberForm}
      onClose={() => setShowTeamMemberForm(false)}
      onCancel={() => setShowTeamMemberForm(false)}
      centered
      title={
        teamMemberFormType === "add" ? "Add Team Member" : "Edit Team Member"
      }
      footer={null}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="Email">Email</label>
          <Input
            placeholder="Enter your team member's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={teamMemberFormType === "edit"}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Role">Role</label>
          <Select
            placeholder="Enter your team member's email"
            value={role}
            onChange={(value) => setRole(value)}
            options={rolesOptions}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Permissions">Permissions</label>
          {permissionsList.map((permission) => (
            <div className="flex gap-1 items-center">
              <Checkbox
                checked={permissions.includes(permission.value)}
                onChange={(e) => {
                  onPermissionsChange(permission.value);
                }}
              />
              <span className="text-sm">{permission.label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-5">
          <Button>Cancel</Button>
          <Button
            type="primary"
            disabled={!email || !role || permissions.length === 0}
            onClick={() => {
              if (teamMemberFormType === "add") {
                addTeamMemberHandler();
              } else {
                editTeamMemberHandler();
              }
            }}
            loading={loading}
          >
            {teamMemberFormType === "add"
              ? "Validate & Add"
              : "Validate & Update"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default TeamMemberForm;
