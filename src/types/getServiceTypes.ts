//* All members related types

export type RequestedMembers = {
  id: string;
  branch: string;
  batch: string;
  name: string;
  image: string;
  position: string;
  slug: string;
  new: boolean;
};

export type RequestAllMembersFunctionType = (
  page: number,
  limit: number,
  search: string,
  role: string,
  branch: string,
  position: string
) => Promise<{
  data: {
    results: RequestedMembers[];
    totalLength: number;
    selectedLength: number;
    adminLength: number;
  };
}>;

export type RequestedUser = {
  id: string;
  slug: string;
  name: string;
  email: string;
  role: string;
  batch: string;
  branch: string;
  position: string;
  image: string;
  timeline: string[];
  createdAt: Date;
  socialLink: string;
};

export type RequestedTopSubmitter = {
  id: string;
  name: string;
  branch: string;
  batch: string;
  slug: string;
  image: string;
  tasksCompleted: number;
};

//* All activities related types

export type RequestedActivities = {
  id: string;
  slug: string;
  coverImageUrl: string;
  date: Date;
  summary: string;
  title: string;
  tag: string;
};

export type RequestAllActivitiesFunctionType = (
  page: number,
  limit: number,
  tag: string,
  search: string
) => Promise<{
  data: {
    results: RequestedActivities[];
    totalLength: number;
    selectedLength: number;
  };
}>;

export type RequestedActivity = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImageUrl: string;
  date: Date;
  tag: string;
  content: string;
  gallery: { id: string; imgId: string; url: string }[];
};

export type RequestedArticlesOrEvents = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImageUrl: string;
  date: Date;
  tag: string;
};

//* All tasks related types
export type RequestedTasks = {
  id: string;
  slug: string;
  name: string;
  submissions: {
    username: string;
    answer: string;
    poster: string;
    posterId: string;
    submissionDate: Date;
  }[];
  first: string;
  second: string;
  third: string;
  category: string;
  createdAt: Date;
  deadline: Date;
  summary: string;
};

export type RequestAllTasksFunctionType = (
  page: number,
  limit: number,
  search: string,
  category: string
) => Promise<{
  data: {
    results: RequestedTasks[];
    totalLength: number;
    selectedLength: number;
  };
}>;

type Submission = {
  username: string;
  submissionDate: Date | null;
  poster?: string | null;
  answer?: string | null;
  name?: string | null;
  image?: string | null;
  branch?: string | null;
  batch?: string | null;
};

export type RequestedTask = {
  id: string;
  name: string;
  slug: string;
  summary: string | null;
  instructions: string | null;
  deadline: Date | null;
  category: string | null;
  createdAt: Date;
  first: string | null;
  second: string | null;
  third: string | null;
  imageRequired: boolean;
  submissions: Submission[];
};

//* All messages related types

export type RequestedMessages = {
  id: string;
  name: string;
  email: string;
  message: string;
  subject: string;
  v: number;
  new: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type RequestAllMessagesFunctionType = (
  page: number,
  limit: number,
  search: string
) => Promise<{ data: { results: RequestedMessages[]; totalLength: number } }>;
