import axios from "axios";
import { url_voice } from "../config";

export async function dashBoard({ name, password }: any) {
  try {
    const response = await axios.post(
      `${url_voice}/admin/login`,
      { name, password },
      {
        headers: {
          Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made, and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      return error.response.data; // You can return this to handle error responses
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error setting up request:", error.message);
    }
  }
}
