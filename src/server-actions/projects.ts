"use server";

import { IProject } from "@/interfaces";
import ProjectModel from "@/models/project-model";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createNewProject = async (payload: Partial<IProject>) => {
  try {
    await ProjectModel.create(payload);
    revalidatePath("/account/projects");
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
    revalidatePath("/account/projects");
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
    revalidatePath("/account/projects");
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
    const response = await ProjectModel.findById(projectId).populate(
      "teamMembers.member"
    );
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
      $or: [
        { owner: currentUserMongoDBData?._id },
        { "teamMembers.member": currentUserMongoDBData?._id },
      ],
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

export const addTeamMemberToProject = async ({
  email = "",
  role = "",
  permissions = [],
  projectId,
}: {
  email: string;
  role: string;
  permissions: string[];
  projectId: string;
}) => {
  try {
    const teamMemberObject = await UserModel.findOne({ email });
    if (!teamMemberObject) {
      throw new Error("User not found");
    }
    // check if team member id is already present in the project
    const teamMemberId = teamMemberObject._id;
    const projectObject = await ProjectModel.findById(projectId);
    if (!projectObject) {
      throw new Error("Project not found");
    }

    const exists = projectObject.teamMembers.find(
      (item) => item.member.toString() === teamMemberId.toString()
    );
    if (exists) {
      throw new Error("Team member already exists");
    }

    await ProjectModel.findByIdAndUpdate(projectId, {
      $push: {
        teamMembers: {
          member: teamMemberId,
          role,
          permissions,
        },
      },
    });

    return {
      success: true,
      message: "Team member added successfully",
      data: {
        member: teamMemberObject,
        role,
        permissions,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateTeamMemberInProject = async ({
  projectId,
  teamMemberData,
}: {
  projectId: string;
  teamMemberData: {
    email: string;
    role: string;
    permissions: string[];
  };
}) => {
  try {
    let projectData = await ProjectModel.findById(projectId).populate(
      "teamMembers.member"
    );

    if (!projectData) {
      throw new Error("Project not found");
    }

    let teamMembers: any[] = projectData.teamMembers;
    teamMembers = teamMembers.map((teamMember) => {
      if (teamMember.member.email === teamMemberData.email) {
        teamMember.role = teamMemberData.role;
        teamMember.permissions = teamMemberData.permissions;
      }
      return teamMember;
    });

    await ProjectModel.findByIdAndUpdate(projectId, {
      teamMembers,
    });

    return {
      success: true,
      message: "Team member updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
