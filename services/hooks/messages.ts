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

// Define your types
interface IMessage {
  id: number;
  msisdn: string;
  message_id?: string;
  from_jid?: string;
  message_type: string;
  text?: string;
  url?: string;
  caption?: string;
  timestamp: string;
}

interface ISendMessage {
  msisdns: string;
  message_type: string;
  message_text?: string;
  url?: string;
  caption?: string;
}

const validateMessageData = (data: ISendMessage): boolean => {
  if (data.message_type === "text" && !data.message_type) {
    return false;
  }
  if (data.message_type === "media" && !data.url) {
    return false;
  }
  return true;
};

export const useGetMessages = (): UseQueryResult<IMessage[], ErrorData> => {
  return useQuery<IMessage[], ErrorData>({
    queryKey: ["messages"],
    queryFn: () => fetchData(endpoints.messages),
  });
};

export const useSendMessage = (): UseMutationResult<
  AxiosResponse,
  ErrorData,
  ISendMessage
> => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, ErrorData, ISendMessage>({
    mutationFn: (data: ISendMessage) => {
      if (!validateMessageData(data)) {
        return Promise.reject({
          response: {
            data: { message: "Invalid message data" },
          },
        });
      }
      return postData(endpoints.messages, data);
    },
    mutationKey: ["sendMessage"],
    onSuccess: (data) => {
      // Invalidate or update queries after a successful mutation
      queryClient.invalidateQueries(["messages"]);
      console.log(data);
    },
    onError: (error: ErrorData) => {
      // Handle errors
      console.error("Error sending message:", error.data.message);
    },
  });
};
