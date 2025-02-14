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
  return response.data;
};

export const login = async ({ email, password }) => {
  const endpoint = AUTH_PATHS.login;
  const response = await api({
    method: endpoint.method,
    url: endpoint.path,
    data: { email, password },
  });
  return response.data;
};
