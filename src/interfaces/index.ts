export interface IUser {
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
