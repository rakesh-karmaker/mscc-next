export type RegisterActionData = {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  batch: string;
  branch: string;
  reason: string;
  image: File | null;
  socialLink: string;
  reference: string;
  consent: boolean | string;
};

export type RegisterActionResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof RegisterActionData]?: string[];
  };
  inputs?: RegisterActionData;
};
