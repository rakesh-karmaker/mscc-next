export type EditMemberPositionAndRoleActionData = {
  slug: string;
  position: string;
  role: string;
};

export type EditMemberPositionAndRoleActionDataResponse = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof EditMemberPositionAndRoleActionData]?: string[];
  };
  inputs?: EditMemberPositionAndRoleActionData;
};
