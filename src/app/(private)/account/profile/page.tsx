"use client";
import PageTitle from "@/components/ui/page-title";
import { formatDateAndTime } from "@/helpers/date-time-formats";
import { IProject } from "@/interfaces";
import { getProjectsOfLoggedInUser } from "@/server-actions/projects";
import { IUsersStore, usersStore } from "@/store/users-store";
import { message, Table } from "antd";
import React from "react";

function UserProfilePage() {
  const { loggedInUserData }: IUsersStore = usersStore() as any;
  const [userProjects = [], setUserProjects] = React.useState<IProject[]>([]);

  const renderUserProperty = (label: string, value: any) => (
    <div className="flex flex-col">
      <span className="text-xs text-gray-700">{label}</span>
      <span className="font-semibold text-sm">{value}</span>
    </div>
  );

  const fetchUserProjects = async () => {
    try {
      const response = await getProjectsOfLoggedInUser();
      if (response.success) {
        setUserProjects(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    fetchUserProjects();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: string, record: any) => {
        if (loggedInUserData?._id === record.owner) {
          return "OWNER";
        }
        const teamMembers = record.teamMembers;
        const currentUser = teamMembers.find(
          (item: any) => item.member === loggedInUserData?._id
        );
        return currentUser?.role?.toUpperCase();
      },
    },
    {
      title: "Project Created At",
      dataIndex: "createdAt",
      render: (createdAt: string) => formatDateAndTime(createdAt),
    },
    {
      title: "Joined At",
      dataIndex: "joinedAt",
      render: (joinedAt: string, record: any) => {
        if (loggedInUserData?._id === record.owner) {
          return formatDateAndTime(record.createdAt);
        }
        const teamMembers = record.teamMembers;
        const currentUser = teamMembers.find(
          (item: any) => item.member === loggedInUserData?._id
        );
        return formatDateAndTime(currentUser?.createdAt);
      },
    },
  ];

  return (
    <div>
      <PageTitle title="User Profile" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7">
        {renderUserProperty("Name", loggedInUserData?.name)}
        {renderUserProperty("Email", loggedInUserData?.email)}
        {renderUserProperty("Mongo User Id", loggedInUserData?._id)}
        {renderUserProperty("Clerk User Id", loggedInUserData?.clerkUserId)}
        {renderUserProperty(
          "Joined At",
          formatDateAndTime(loggedInUserData?.createdAt!)
        )}
      </div>

      <hr className="my-5 border-t border-gray-500" />

      <div className="mt-7">
        <h1 className="text-sm font-bold">
          Projects you are part of ({userProjects.length})
        </h1>
        <Table columns={columns} dataSource={userProjects} />
      </div>
    </div>
  );
}

export default UserProfilePage;
