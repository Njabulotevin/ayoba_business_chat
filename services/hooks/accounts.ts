import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchData, postData } from "../api";
import endpoints from "../endpoints";
import { AxiosResponse } from "axios";
import { ErrorData } from "@/types/error";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["fetchData"],
    queryFn: () => fetchData(endpoints.users),
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation<IuserResponse, ErrorData, IuserLogin>({
    mutationFn: (data: IuserLogin) => postData(endpoints.users, data),
    mutationKey: ["users"],
    onSuccess: (data) => {
      // Invalidate or update queries after a successful mutation
      // queryClient.invalidateQueries(["users"]);
      console.log(data);
    },
    onError: (error: ErrorData) => {
      // Handle errors
      console.error("Error posting user:", error.data.message);
    },
  });
};


export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, ErrorData, IuserLogin>({
    mutationFn: (data: IuserLogin) => postData(endpoints.userLogin, data),
    mutationKey: ["users"],
    onSuccess: (data) => {
      // Invalidate or update queries after a successful mutation
      // queryClient.invalidateQueries(["users"]);
      console.log(data);
    },
    onError: (error: ErrorData) => {
      // Handle errors
      console.error("Error posting user:", error.data.message);
    },
  });
};

export const useConvertToAssistant = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, ErrorData, IconvertAssistant>({
    mutationFn: (data: IconvertAssistant) => postData(endpoints.assistant, data),
    mutationKey: ["assistant"],
    onSuccess: (data) => {
      // Invalidate or update queries after a successful mutation
      // queryClient.invalidateQueries(["users"]);
      console.log(data);
    },
    onError: (error: ErrorData) => {
      // Handle errors
      console.error("Error posting user:", error.data.message);
    },
  });
};
