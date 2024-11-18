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
  owner: string | IUser;

  createdAt: string;
  updatedAt: string;
}

export interface ITask {
  _id : string;
  name: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  assigne: string;
  referenceFiles: {
    type : string;
    name : string;
    url : string;
  }[];
  createdBy: string;
  project: string;

  createdAt: string;
  updatedAt: string;
}