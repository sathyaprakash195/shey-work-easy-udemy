import { IProject } from "@/interfaces";
import {
  getTaskStatusReport,
  getTeamMembersReport,
} from "@/server-actions/reports";
import { message, Table } from "antd";
import React from "react";

function ProjectOverview({ project }: { project: IProject }) {
  const [taskStatusReport, setTaskStatusReport] = React.useState([]);
  const [teamMembersReport, setTeamMembersReport] = React.useState([]);

  const fetchReports = async () => {
    try {
      const [taskStatusReport, teamMembersReport]: any = await Promise.all([
        getTaskStatusReport(project._id),
        getTeamMembersReport(project._id),
      ]);
      setTaskStatusReport(taskStatusReport.data || []);
      setTeamMembersReport(teamMembersReport.data || []);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const taskStatusReportColumns = [
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Count",
      dataIndex: "count",
    },
  ];

  const teamMembersReportColumns = [
    {
      title: "Name",
      dataIndex: "teamMemberId",
      render: (teamMemberId: string) => {
        const teamMemberObj: any = project.teamMembers.find(
          (item: any) => item.member._id === teamMemberId
        );
        return `${teamMemberObj.member.name} (${teamMemberObj.role})`;
      },
    },
    {
      title: "Tasks involved",
      dataIndex: "count",
    },
  ];

  React.useEffect(() => {
    fetchReports();
  }, []);
  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-3 p-3 border border-gray-500 bg-gray-50">
          <h1 className="text-sm text-primary font-bold">Total Tasks</h1>
          <h1 className="text-6xl font-bold">
            {Object.values(taskStatusReport).reduce(
              (acc: number, curr: any) => acc + curr.count,
              0
            )}
          </h1>
          <p className="text-xs">Total tasks in this project</p>
        </div>

        <div className="flex flex-col gap-3 p-3 border border-gray-500 bg-gray-50">
          <h1 className="text-sm text-primary font-bold">Total team members</h1>
          <h1 className="text-6xl font-bold">0</h1>
          <p className="text-xs">Total team members in this project</p>
        </div>
      </div>

      <div>
        <h1 className="text-sm font-bold text-primary">Task status report</h1>
        <Table
          columns={taskStatusReportColumns}
          dataSource={taskStatusReport}
        />
      </div>

      <div>
        <h1 className="text-sm font-bold text-primary">Team members report</h1>
        <Table
          columns={teamMembersReportColumns}
          dataSource={teamMembersReport}
        />
      </div>
    </div>
  );
}

export default ProjectOverview;
