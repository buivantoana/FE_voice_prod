import React, { useEffect, useState } from "react";
import SignUpNomalView from "./SignUpNomalView";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getOtp,
  signIn,
  signup,
  signupWebHook,
  verify,
} from "../../service/auth";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCoursesContext } from "../../App";

type Props = {};
const schema = yup.object({
  phone: yup.string().required(),
});
const SignUpNomalController = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const auth_code = queryParams.get("code");
  const [phone, setPhone] = useState("");
  const [openOtp, setOpenOtp] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [openId, setOpenId] = useState(null);
  const context: any = useCoursesContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickOpenOtp = () => {
    setOpenOtp(true);
  };
  const handleCloseOtp = () => {
    setOpenOtp(false);
  };
  useEffect(() => {
    if (auth_code) {
      login();
    }
  }, []);
  const login = async () => {
    setLoading(true);
    try {
      let data = await signIn(auth_code);
      console.log(data);
      if (data.code == 0) {
        let webhook = await signupWebHook({ user_id: data.data.user.phone ,utm:localStorage.getItem("utm")});
        if (webhook.code == 0) {
          localStorage.setItem(
            "access_token",
            JSON.stringify(data.data.access_token)
          );
          localStorage.setItem("user", JSON.stringify(data.data.user));
          let tts_text = localStorage.getItem("tts_text");
          let tts_story = localStorage.getItem("tts_story");
         
          if (tts_text) {
            context.dispatch({
              type: "TTS_TEXT",
              payload: {
                ...context.state,
                tts_text: tts_text,
              },
            });
          }
          if (tts_story) {
            context.dispatch({
              type: "TTS_STORY",
              payload: {
                ...context.state,
                tts_story: JSON.parse(tts_story),
              },
            });
          }

          context.dispatch({
            type: "LOGIN",
            payload: {
              ...context.state,
              user: { ...data.data.user },
            },
          });
          let material_video = localStorage.getItem("material_video");
          if(material_video){
            localStorage.removeItem("material_video");
            navigate(`/material-video?product_id=${material_video}`);
          }else{

            setTimeout(() => {
              localStorage.removeItem("tts_text");
              localStorage.removeItem("tts_story");
              navigate("/");
              setLoading(false);
            }, 1000);
          }
        }
      }
      if (data.code == 1004) {
        toast.warning("Cập nhật thông tin tài khoản.");
        setLoading(false);
      }
      if (data.code == 1004) {
        setOpenId(data.data.tiktok_open_id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOTP = async (data: any) => {
    console.log(data);
    setLoading(true);
    try {
      let verify_phone = await verify({ phone: phone });
      if (verify_phone.code == 0) {
        let data = await getOtp(phone);
        if (data.code == 0) {
          handleClickOpenOtp();
        }
      }
      if (verify_phone.code == 1000) {
        toast.warning("Số điện thoại đã được sử dụng hoặc không hợp lệ.");
      }
      if (verify_phone.code == 1001) {
        toast.warning("Số điện thoại đã được liên kết với 1 tài khoản khác trên gmv.vn, vui lòng dùng số điện thoại khác!");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChangeOtp = (otpValue: any) => {
    setOtp(otpValue);
  };
  const handleRegister = async () => {
    console.log("AAA body ===", { phone, otp, open_id: openId });
    setLoading(true);
    try {
      let data = await signup({ phone, otp, open_id: openId });
      console.log(data);
      if (data.code == 0) {
        let webhook = await signupWebHook({ user_id: data.data.user.phone,utm:localStorage.getItem("utm") });
        if (webhook.code == 0) {
          localStorage.setItem(
            "access_token",
            JSON.stringify(data.data.access_token)
          );
          localStorage.setItem("user", JSON.stringify(data.data.user));
          let tts_text = localStorage.getItem("tts_text");
          let tts_story = localStorage.getItem("tts_story");
          if (tts_text) {
            context.dispatch({
              type: "TTS_TEXT",
              payload: {
                ...context.state,
                tts_text: tts_text,
              },
            });
          }
          if (tts_story) {
            context.dispatch({
              type: "TTS_STORY",
              payload: {
                ...context.state,
                tts_story: JSON.parse(tts_story),
              },
            });
          }

          context.dispatch({
            type: "LOGIN",
            payload: {
              ...context.state,
              user: { ...data.data.user },
            },
          });
          let material_video = localStorage.getItem("material_video");
          if(material_video){
            localStorage.removeItem("material_video");
            navigate(`/material-video?product_id=${material_video}`);
          }else{
            setTimeout(() => {
              localStorage.removeItem("tts_text");
              localStorage.removeItem("tts_story");
              navigate("/");
              setLoading(false);
            }, 1000);

          }
        }
      }
      if (data.code == 1000) {
        Object.keys(data.data).map((key) => toast.warning(data.data[key][0]));
      }
      if (data.code == 1001) {
        toast.warning("Mã OTP không hợp lệ.");
      }
      if (data.code == 1002) {
        toast.warning("Tiktok profile không tồn tại.");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  console.log(errors);
  return (
    <>
      {loading && <Loading />}
      <SignUpNomalView
        setOtp={setOtp}
        handleClickOpenOtp={handleClickOpenOtp}
        handleCloseOtp={handleCloseOtp}
        openOtp={openOtp}
        handleOTP={handleOTP}
        otp={otp}
        setPhone={setPhone}
        phone={phone}
        handleChangeOtp={handleChangeOtp}
        handleRegister={handleRegister}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />
    </>
  );
};

export default SignUpNomalController;
