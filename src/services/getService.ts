import type {
  RequestAllActivitiesFunctionType,
  RequestAllMembersFunctionType,
  RequestedActivities,
  RequestedActivity,
  RequestedArticlesOrEvents,
  RequestedMembers,
  RequestedTopSubmitter,
  RequestedUser,
} from "@/types/getServiceTypes";
import axios from "axios";

const api = axios.create({
  baseURL: `/api`,
  headers: { "Content-Type": "application/json" },
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

const verifyToken = async (): Promise<null | {
  data: { user: RequestedUser };
}> => {
  try {
    const response = await api.get("/member");
    return response;
  } catch {
    console.log("Error verifying token:");
    return null;
  }
};

const getUser = async (slug: string): Promise<{ data: RequestedUser }> => {
  return api.get(`/member/${slug}`);
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

const getEvents = (): Promise<{ data: RequestedArticlesOrEvents[] }> => {
  return api.get("/activity/events");
};

const getArticles = (): Promise<{ data: RequestedArticlesOrEvents[] }> => {
  return api.get("/activity/articles");
};

// TODO: make the bottom routes and change the types
type Task = {
  id: string;
  name: string;
  category: string;
};

type getAllTasksType = (
  page: number,
  limit: number,
  search: string,
  category: string
) => Promise<{
  data: { results: Task[]; totalLength: number; selectedLength: number };
}>;
const getAllTasks: getAllTasksType = async (page, limit, search, category) => {
  const response = await api.get(
    `/task?page=${page}&limit=${limit}&name=${search}&category=${category}`
  );
  return response;
};

type getTaskType = (slug: string, username: string) => Promise<{ data: Task }>;
const getTask: getTaskType = async (slug, username) => {
  const response = await api.get(`/task/${slug}?username=${username}`);
  return response;
};

type Message = {
  id: string;
  content: string;
  sender: string;
};

type getAllMessagesType = (
  page: number,
  limit: number,
  search: string
) => Promise<{ data: { results: Message[]; totalLength: number } }>;
const getAllMessages: getAllMessagesType = async (page, limit, search) => {
  const response = await api.get(
    `/message?page=${page}&limit=${limit}&name=${search}`
  );
  return response;
};

export {
  verifyToken,
  getUser,
  getAllMembers,
  getTopSubmitters,
  getAllMessages,
  getAllActivities,
  getEvents,
  getArticles,
  getAllTasks,
  getTask,
  getActivity,
};
