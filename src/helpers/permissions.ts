import { IProject, IUser } from "@/interfaces";

export const hasPermission = ({
  project,
  user,
  permission,
}: {
  project: IProject;
  user: IUser;
  permission: string;
}) => {
  try {
    // if user is owner of the project , return true
    if (project.owner === user._id) return true;

    // get team members permissions
    const teamMember = project.teamMembers.find((item: any) => {
      if (typeof item === "string") {
        return item === user._id;
      }
      if (typeof item === "object") {
        return item.member._id === user._id;
      }
      return false;
    });
    if (teamMember?.permissions.includes(permission)) return true;
    return false;
  } catch (error) {
    return false;
  }
};
