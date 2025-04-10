import type {
  RequestAllActivitiesFunctionType,
  RequestAllMembersFunctionType,
  RequestAllMessagesFunctionType,
  RequestAllTasksFunctionType,
  RequestedActivity,
  RequestedArticlesAndEvents,
  RequestedTask,
  RequestedTopSubmitter,
} from "@/types/getServiceTypes";
import axios from "axios";

if (!process.env.NEXT_PUBLIC_INTERNAL_TOKEN) {
  throw new Error("NEXT_PUBLIC_INTERNAL_TOKEN is not defined");
}

const api = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
    "x-internal-token": process.env.NEXT_PUBLIC_INTERNAL_TOKEN,
  },
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//* All members related server requests

const getAllMembers: RequestAllMembersFunctionType = async (
  page,
  limit,
  search,
  role,
  branch,
  position
) => {
  const response = await api.get(
    `/member/all?page=${page}&limit=${limit}&name=${search}&role=${role}&branch=${branch}&position=${position}`
  );
  return response;
};

const getTopSubmitters = (): Promise<{ data: RequestedTopSubmitter[] }> => {
  return api.get("/member/top-submitters");
};

//* All activities related server requests

const getAllActivities: RequestAllActivitiesFunctionType = async (
  page,
  limit,
  tag,
  search
) => {
  const response = await api.get(
    `/activity/all?limit=${limit}&page=${page}&tag=${tag}&title=${search}`
  );
  return response;
};

type getActivityType = (slug: string) => Promise<{ data: RequestedActivity }>;
const getActivity: getActivityType = async (slug) => {
  const response = await api.get(`/activity/${slug}`);
  return response;
};

const getContent = (): Promise<{
  data: {
    articles: RequestedArticlesAndEvents[];
    events: RequestedArticlesAndEvents[];
  };
}> => {
  return api.get("/activity/content");
};

//* All tasks related server requests

const getAllTasks: RequestAllTasksFunctionType = async (
  page,
  limit,
  search,
  category
) => {
  const response = await api.get(
    `/task/all?page=${page}&limit=${limit}&name=${search}&category=${category}`
  );
  return response;
};

type getTaskType = (
  slug: string,
  username: string
) => Promise<{ data: RequestedTask }>;
const getTask: getTaskType = async (slug, username) => {
  const response = await api.get(`/task/${slug}?username=${username}`);
  return response;
};

//* All messages related server requests

const getAllMessages: RequestAllMessagesFunctionType = async (
  page,
  limit,
  search
) => {
  const response = await api.get(
    `/message/all?page=${page}&limit=${limit}&name=${search}`
  );
  return response;
};

export {
  getAllMembers,
  getTopSubmitters,
  getAllMessages,
  getAllActivities,
  getContent,
  getAllTasks,
  getTask,
  getActivity,
};
