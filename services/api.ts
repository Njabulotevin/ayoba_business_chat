import axios from "axios";

const api_url : string | undefined = process.env.API_URL;

export const apiClient = axios.create({
  baseURL:  "https://bd06-41-169-13-10.ngrok-free.app/api/v1",
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
