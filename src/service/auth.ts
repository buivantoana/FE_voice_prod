import axios from "axios";
import { path_redirect, url_auth, url_voice } from "../config";

export async function tiktokAuthorizeLink() {
  try {
    const response = await axios.get(
      `${url_auth}/api/v1/auth/tiktok-authorize-link?redirect_uri=${path_redirect}`
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

export async function signIn(auth_code: any) {
  try {
    const response = await axios.post(`${url_auth}/api/v1/auth/login/tiktok`, {
      auth_code: auth_code,
      redirect_uri: path_redirect,
    });
    console.log("AAAA reponse ===", response);
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
export async function getOtp(phone: any) {
  try {
    const response = await axios.post(`${url_auth}/api/v1/otp`, {
      phone_number: phone,
      service_name: "KocRegister",
    });
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
export async function signup({ phone, otp, open_id }: any) {
  try {
    const response = await axios.post(`${url_auth}/api/v1/auth/register`, {
      phone_number: phone,
      // service_name: "register",
      otp,
      tiktok_open_id: open_id,
      utm_source:"tts"
    });
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
export async function verify({ phone }: any) {
  try {
    const response = await axios.post(`${url_auth}/api/v1/auth/register/validate`, {
      phone_number: phone,
    });
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

export async function signupWebHook({ user_id,utm }: any) {
  try {
    const response = await axios.post(
      `${url_voice}/voice/login?user_id=${user_id}&utm=${utm}`,
      {},
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
