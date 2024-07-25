import { ErrorData } from "@/types/error";
import axios from "axios";

export const handleRequestError = (err: any) => {
  if (axios.isAxiosError(err)) {
    // Axios specific error handling
    if (err.response) {
      // Server responded with a status other than 200 range
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
      console.error("Response headers:", err.response.headers);
      return err.response;
    } else if (err.request) {
      // Request was made but no response was received
      console.error("Request data:", err.request);
    } else {
      // Something happened in setting up the request
      console.error("Error message:", err.message);
    }
  } else {
    // Non-Axios error handling
    console.error("Error:", err);
  }
};
