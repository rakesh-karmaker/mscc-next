import { RequestedUser } from "./getServiceTypes";

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginFormResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof LoginFormData]?: string[];
  };
  inputs?: LoginFormData;
  user?: RequestedUser | null;
};
