import axios from "axios";
import { url_voice } from "../config";

export async function createVoice(body: any, isFormData: boolean = false) {
  try {
    const headers = {
      Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
    };
    const response = await axios.post(
      `${url_voice}/voice/process`,
      body,
      isFormData
        ? { headers } // FormData không cần Content-Type, Axios tự thêm
        : {
            headers: {
              ...headers,
              "Content-Type": "application/json", // JSON body cần Content-Type
            },
          }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function addMyVoice(body: any) {
  try {
    const headers = {
      Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
    };
    const response = await axios.post(`${url_voice}/voice/addvoice`, body, {
      headers,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getMyVoices(user_id:any) {
  try {
    const response = await axios.get(`${url_voice}/voice/myvoice/${user_id}`, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function deleteMyVoices(idDelete:any) {
  try {
    const response = await axios.delete(`${url_voice}/voice/delete_my_voice/${idDelete}`, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getVoicesOpenAi() {
  try {
    const response = await axios.get(`${url_voice}/voice/voices`, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getVoicesFavorite({ user_id }: any) {
  try {
    const response = await axios.get(`${url_voice}/voice/voices/${user_id}`, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function addVoicesFavorite(body: any) {
  try {
    const response = await axios.post(`${url_voice}/voice/favorite`, body, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getHistoryVoices({ user_id }: any) {
  try {
    const response = await axios.get(`${url_voice}/voice/history/${user_id}`, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getPlayVoice({ voice_id }: any) {
  try {
    const response = await axios.get(`${url_voice}/voice/play/${voice_id}`, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function deleteVoiceApi({ voice_id }: any) {
  try {
    const response = await axios.post(
      `${url_voice}/voice/delete?voice_id=${voice_id}`,
      {},
      {
        headers: {
          Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
        },
      }
    );
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getInfo({ user_id }: any) {
  try {
    let access_token: any = localStorage.getItem("access_token");
    console.log(access_token);
    const response = await axios.post(
      `${url_voice}/voice/user?user_id${user_id}`,
      {
        user_id: user_id,
        bearer_token: JSON.parse(access_token),
      },
      {
        headers: {
          Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
        },
      }
    );
    console.error("AAAA data:====", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
export async function createStoryMaker(body: any) {
  try {
    const response = await axios.post(`${url_voice}/voice/story`, body, {
      headers: {
        Authorization: "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
  }
}
