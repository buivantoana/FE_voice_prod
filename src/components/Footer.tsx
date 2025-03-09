import React from "react";
import "../App.css";
import logo from "../images/logo4.png";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const theme: any = useTheme();
  const { t } = useTranslation();
  return (
    <Box
      display={{ xs: "none", md: "flex" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"10%"}
      py={"15px"}>
      <Typography>
        © Copyright 2024, Text To Speech OpenAI . Version 1.1.0
      </Typography>
      <Typography>
        {t("contact_us")}:{" "}
        <span style={{ color: theme.palette.active.main, fontWeight: "bold" }}>
          {" "}
          support@gmv.vn
        </span>
      </Typography>
    </Box>
  );
};

export default Footer;
