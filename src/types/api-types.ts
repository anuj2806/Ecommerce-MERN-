import { User } from "./types";

export type MessageResponce = {
    success:boolean,
    message:string
};
export type UserResponse = {
    success: boolean;
    user: User;
  };