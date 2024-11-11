"use server";

import { IProject } from "@/interfaces";
import ProjectModel from "@/models/project-model";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

export const createNewProject = async (payload: Partial<IProject>) => {
  try {
    await ProjectModel.create(payload);
    return {
      success: true,
      message: "Project created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateProjectById = async ({
  projectId,
  payload,
}: {
  projectId: string;
  payload: Partial<IProject>;
}) => {
  try {
    await ProjectModel.findByIdAndUpdate(projectId, payload);
    return {
      success: true,
      message: "Project updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteProjectById = async (projectId: string) => {
  try {
    await ProjectModel.findByIdAndDelete(projectId);
    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const response = await ProjectModel.findById(projectId);
    return {
      success: true,
      message: "Project found successfully",
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getProjectsOfLoggedInUser = async () => {
  try {
    const currentUserData = await currentUser();
    const currentUserMongoDBData = await UserModel.findOne({
      clerkUserId: currentUserData?.id,
    });

    const response = await ProjectModel.find({
      owner: currentUserMongoDBData?._id,
    });

    return {
      success: true,
      message: "Projects found successfully",
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
