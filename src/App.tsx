import Router from "./routes/Routes";
import "./App.css";
import { createContext, useContext, useEffect, useReducer } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { getInfo } from "./service/voice";
import { I18nextProvider } from "react-i18next";
import i18n from "./translation/i18n";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();
export const coursesContext = createContext({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
      };
    case "HISTORY":
      return {
        ...state,
        history: action.payload.history,
      };
    case "PAYMENT":
      return {
        ...state,
        user: action.payload.user,
      };
    case "TTS_TEXT":
      return {
        ...state,
        tts_text: action.payload.tts_text,
      };
    case "TTS_STORY":
      return {
        ...state,
        tts_story: action.payload.tts_story,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    user: {},
    history: {},
    tts_text: "",
    tts_story: "",
  });
  let user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      (async () => {
        let infor = await getInfo({ user_id: JSON.parse(user).phone });
        if (infor.code == 0) {
          console.log("AAAA USER====", { ...JSON.parse(user), ...infor.data });
          dispatch({
            type: "LOGIN",
            payload: {
              ...state,
              user: { ...JSON.parse(user), ...infor.data },
            },
          });
        }
      })();
    }
  }, [user]);
  console.log("AAAA state ====", state);
  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <coursesContext.Provider value={{ dispatch, state }}>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </coursesContext.Provider>
          </QueryClientProvider>
        </ThemeProvider>
        <ToastContainer />
      </I18nextProvider>
    </div>
  );
};
export const useCoursesContext = () => useContext(coursesContext);
export default App;
