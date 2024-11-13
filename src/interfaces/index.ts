export interface IUser {
  _id : string;
  name: string;
  email: string;
  clerkUserId: string;
  profilePic: string;
  isAdmin: boolean;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface IProject {
  _id : string;
  name: string;
  description: string;
  status: string;
  logo: string;
  roles: string[];
  taskStatuses: string[];
  teamMembers: {
    member: string;
    role: string;
    permissions: string[];
  }[];
  owner: string;

  createdAt: string;
  updatedAt: string;
}
