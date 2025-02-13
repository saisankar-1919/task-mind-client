import { HTTPMethod } from "../constants/httpMethods";
import api from "../utils/axiosConfig";

const TASK_PATHS = {
  getTask: {
    path: `api/task/`,
    method: HTTPMethod.GET,
  },
  addTask: {
    path: `api/task/`,
    method: HTTPMethod.POST,
  },
  updateTask: {
    path: `api/task/`,
    method: HTTPMethod.PUT,
  },
  deleteTask: {
    path: `api/task/`,
    method: HTTPMethod.DELETE,
  },
};

export const getAllTask = async () => {
  const endpoint = TASK_PATHS.getTask;
  const response = await api({
    method: endpoint.method,
    url: endpoint.path,
  });
  console.log("response", response);
  return response.data;
};

export const addTask = async ({ title, description }) => {
  const endpoint = TASK_PATHS.addTask;
  console.log("api enpoint: ", endpoint);
  const response = await api({
    method: endpoint.method,
    url: endpoint.path,
    data: { title, description },
  });
  console.log("api response: ", response);
  return response.data;
};

export const updateTask = async (taskData) => {
  const { taskId, title, description, completed } = taskData;
  const endpoint = TASK_PATHS.updateTask;

  const data = {};

  if (title !== undefined) data.title = title;
  if (description !== undefined) data.description = description;
  if (completed !== undefined) data.completed = completed;

  const response = await api({
    method: endpoint.method,
    url: `${endpoint.path}${taskId}`,
    data,
  });

  console.log("API response: ", response);
  return response.data;
};

export const deleteTask = async ({ taskId }) => {
  const endpoint = TASK_PATHS.deleteTask;
  console.log("api enpoint: ", endpoint);
  const response = await api({
    method: endpoint.method,
    url: endpoint.path,
    params: { taskId },
  });
  console.log("api response: ", response);
  return response.data;
};
