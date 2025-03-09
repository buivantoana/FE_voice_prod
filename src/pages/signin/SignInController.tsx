import React, { useState } from "react";
import SignInView from "./SignInView";
import { tiktokAuthorizeLink } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

type Props = {};

const SignInController = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const handleTikTokAuthorizeLink = async () => {
    setLoading(true);
    try {
      let data = await tiktokAuthorizeLink();
      console.log(data);
      if (data.code == 0) {
        window.open(data.data.auth_link, "_self");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      {" "}
      {loading && <Loading />}
      <SignInView handleTikTokAuthorizeLink={handleTikTokAuthorizeLink} />
    </>
  );
};

export default SignInController;
