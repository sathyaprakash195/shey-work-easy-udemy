import React from "react";
import { UserButton } from "@clerk/nextjs";
import { saveCurrentUserToMongoDB } from "@/server-actions/users";

async function UserAccountProojectsPage() {
  const response = await saveCurrentUserToMongoDB();
  const mongoUser = response.data;

  return (
    <div className="p-5">
      <h1>Projects Page</h1>

      <UserButton />

      <h1>MongoDB User ID : {mongoUser._id}</h1>
      <h1>Clerk User ID : {mongoUser.clerkUserId}</h1>
      <h1>User Name : {mongoUser.name}</h1>
      <h1>User Email : {mongoUser.email}</h1>
    </div>
  );
}

export default UserAccountProojectsPage;
