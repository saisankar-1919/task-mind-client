import { HTTPMethod } from "../constants/httpMethods";
import api from "../utils/axiosConfig";

const AUTH_PATHS = {
  register: {
    path: `api/auth/register`,
    method: HTTPMethod.POST,
  },
  login: {
    path: `api/auth/login`,
    method: HTTPMethod.GET,
  },
};

export const register = async ({ email, password }) => {
  const endpoint = AUTH_PATHS.register;
  console.log("All environment variables:", process.env);

  console.log("endpoint", process.env.NEXT_PUBLIC_API_BASE_URL, endpoint);
  const response = await api({
    method: endpoint.method,
    url: endpoint.path,
    data: { email, password },
  });
  console.log("response", response);
  return response.data;
};

export const login = async (params) => {
  const endpoint = AUTH_PATHS.login;
  console.log("api enpoint: ", endpoint);
  const response = await api({
    method: endpoint.method,
    url: endpoint.path,
    data: { params },
  });
  console.log("api response: ", response);
  return response.data;
};
