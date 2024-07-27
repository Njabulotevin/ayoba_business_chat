import axios from "axios";

// const api_url : string | undefined = process.env.API_URL;

export const apiClient = axios.create({
  baseURL:  "https://gatewayapi-e65e2b5c01f7.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export const fetchData = async (endpoint: string) => {
  const { data } = await apiClient.get(endpoint);
  return data;
};

export const postData = async (endpoint: string, payload: any) => {
  const { data } = await apiClient.post(endpoint, payload);
  return data;
};
