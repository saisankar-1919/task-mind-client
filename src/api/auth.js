import { HTTPMethod } from "../constants/httpMethods";
import api from "../utils/axiosConfig";

const AUTH_PATHS = {
  register: {
    path: `api/auth/register`,
    method: HTTPMethod.POST,
  },
  login: {
    path: `api/auth/login`,
    method: HTTPMethod.POST,
  },
};

export const register = async ({ email, password }) => {
  const endpoint = AUTH_PATHS.register;
  const response = await api({
    method: endpoint.method,
    url: endpoint.path,
    data: { email, password },
  });
  console.log("response", response);
  return response.data;
};

export const login = async ({ email, password }) => {
  const endpoint = AUTH_PATHS.login;
  console.log("api enpoint: ", endpoint);
  const response = await api({
    method: endpoint.method,
    url: endpoint.path,
    data: { email, password },
  });
  console.log("api response: ", response);
  return response.data;
};
