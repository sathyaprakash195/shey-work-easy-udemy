"use server";

import { ITask } from "@/interfaces";
import TaskModel from "@/models/task-model";

export const createNewTask = async (payload: Partial<ITask>) => {
  try {
    await TaskModel.create(payload);
    return {
      success: true,
      message: "Task created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const editTaskById = async ({
  taskId,
  payload,
}: {
  taskId: string;
  payload: Partial<ITask>;
}) => {
  try {
    await TaskModel.findByIdAndUpdate(taskId, payload);
    return {
      success: true,
      message: "Task updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteTaskById = async (taskId: string) => {
  try {
    await TaskModel.findByIdAndDelete(taskId);
    return {
      success: true,
      message: "Task deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    const task = await TaskModel.findById(taskId);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(task)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getTasksByProjectId = async ({
  projectId,
  status,
  priority,
  type,
  assignee,
}: {
  projectId: string;
  status?: string | null;
  priority?: string | null;
  type?: string | null;
  assignee?: string | null;
}) => {
  try {
    let filtersObj: any = {
      project: projectId,
    };

    if (status) {
      filtersObj = { ...filtersObj, status };
    }

    if (priority) {
      filtersObj = { ...filtersObj, priority };
    }

    if (type) {
      filtersObj = { ...filtersObj, type };
    }

    if (assignee) {
      filtersObj = { ...filtersObj, assignee };
    }

    const tasks = await TaskModel.find(filtersObj)
      .sort({ createdAt: -1 })
      .populate("assignee");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(tasks)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllTasksByUserId = async ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) => {
  try {
    let filtersObj: any = {};
    if (userId) {
      filtersObj = { assignee: userId };
    }
    if (projectId) {
      filtersObj = { ...filtersObj, project: projectId };
    }

    const tasks = await TaskModel.find(filtersObj)
      .sort({ createdAt: -1 })
      .populate("project")
      .populate("createdBy");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(tasks)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
