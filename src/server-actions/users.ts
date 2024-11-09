"use server";

import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

export const saveCurrentUserToMongoDB = async () => {
  try {
    const currentUserData = await currentUser();

    // check if user already exists in the database , if yes return the user data
    const email = currentUserData?.emailAddresses[0].emailAddress;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return {
        success: true,
        message: "User data already exists",
        data: JSON.parse(JSON.stringify(existingUser)),
      };
    }

    const userPayload = {
      name: currentUserData?.firstName + " " + currentUserData?.lastName,
      email: currentUserData?.emailAddresses[0].emailAddress,
      profilePic: currentUserData?.imageUrl,
      clerkUserId: currentUserData?.id,
      isAdmin: false,
      isActive: true,
    };

    const user = new UserModel(userPayload);
    const newUserData = await user.save();
    return {
      success: true,
      message: "User data saved successfully",
      data: JSON.parse(JSON.stringify(newUserData)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
