import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const PrivacyView = (props: Props) => {
  const { t } = useTranslation();
  let data = [];
  for (let i = 0; i < 11; i++) {
    data.push({
      title: t(`privacy_policy_title${i + 1}`),
      des: t(`privacy_policy_des${i + 1}`),
    });
  }
  return (
    <Box padding={"30px 10%"}>
      <Box
        textAlign={"center"}
        display={"flex"}
        flexDirection={"column"}
        gap={"40px"}>
        <Typography fontSize={"1.2rem"} fontWeight={"500"} color='active.main'>
          Text To Speech OpenAI
        </Typography>
        <Typography variant='h1' fontSize={{ xs: "2rem", md: "3rem" }}>
          {t("privacy_policy_title")}
        </Typography>
        <Typography
          color='grey_500.main'
          fontSize={{ xs: "1rem", md: "1.3rem" }}>
          {t("privacy_policy_des")}
        </Typography>
      </Box>
      <Box mt={"100px"}></Box>
      {data.map((item, index) => {
        return (
          <Box display={"flex"} mt={"20px"}>
            <Typography color='grey_500.main' fontSize={"1.3rem"}>
              {index + 1}.
            </Typography>
            <Typography
              color='grey_500.main'
              fontSize={{ xs: "1rem", md: "1.2rem" }}>
              <b>{item.title}: </b>
              {item.des}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default PrivacyView;
