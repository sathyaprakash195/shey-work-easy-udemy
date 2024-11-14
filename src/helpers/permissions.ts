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
    const teamMember = project.teamMembers.find(
      (item) => item.member === user._id
    );
    if (teamMember?.permissions.includes(permission)) return true;
    return false;
  } catch (error) {
    return false;
  }
};
