import { IUser } from "@/interfaces";
import { create } from "zustand";

export const usersStore = create((set) => ({
  loggedInUserData: null,
  setLoggedInUserData: (payload: IUser) => set({ loggedInUserData: payload }),
}));

export interface IUsersStore {
  loggedInUserData: IUser | null;
  setLoggedInUserData: (payload: IUser) => void;
}
