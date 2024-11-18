"use server";

import TaskModel from "@/models/task-model";
import mongoose from "mongoose";

export const getTaskStatusReport = async (projectId: string) => {
  try {
    const projectMongoDBId = new mongoose.Types.ObjectId(projectId);

    const result = await TaskModel.aggregate([
      {
        $match: {
          project: projectMongoDBId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const mappedData = result.map((item: any) => ({
      status: item._id,
      count: item.count,
    }));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(mappedData)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getTeamMembersReport = async (projectId: string) => {
  try {
    const projectMongoDBId = new mongoose.Types.ObjectId(projectId);

    const result = await TaskModel.aggregate([
      {
        $match: {
          project: projectMongoDBId,
        },
      },
      {
        $group: {
          _id: "$assignee",
          count: { $sum: 1 },
        },
      },
    ]);

    const mappedData = result.map((item: any) => ({
      teamMemberId: item._id,
      count: item.count,
    }));

    console.log(mappedData);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(mappedData)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
