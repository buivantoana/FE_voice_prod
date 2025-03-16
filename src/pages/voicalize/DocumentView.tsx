import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { RiUploadCloudFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

type Props = {
  file: any;
  handleFileChange: any;
  handleFileRemove: any;
};

const DocumentView = ({ file, handleFileChange, handleFileRemove }: Props) => {
  const { t } = useTranslation();
  return (
    <Box p={"20px"}>
      <Box sx={{ width: "100%" }}>
        <Box
          className='container'
          style={{
            width: "100%",
          }}>
          {file ? (
            <Box
              mt={"20px"}
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              p={2}
              border='1px solid #ddd'
              borderRadius='8px'>
              <Typography
                fontSize={{ xs: ".9rem", md: "1rem" }}
                color='active.main'>
                {t("selected_file")}: {file.name}
              </Typography>
              <IconButton color='error' onClick={handleFileRemove}>
                <MdDelete size={24} />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                border: "2px dashed rgb(226 232 240)",
                width: "100%",
                color: "#ff5117",
                fontSize: "22px",
                position: "relative",
                borderRadius: "6px",
                overflow: "hidden",
                py: { xs: "30px", md: "50px" },
              }}>
              <label
                htmlFor='input-img'
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
                className='preview'>
                <RiUploadCloudFill color={"rgb(148 163 184)"} size={"37px"} />
                <Typography mt={"5px"} color='grey_500.main' fontSize={"16px"}>
                  {t("click_to_upload")}
                </Typography>
                <Typography
                  textAlign={"center"}
                  mt={"5px"}
                  color='grey_500.main'
                  fontSize={"14px"}>
                  .docx , .pdf , .txt
                </Typography>
              </label>
            </Box>
          )}

          <input
            type='file'
            hidden
            id='input-img'
            accept='.docx,.pdf,.txt'
            onChange={handleFileChange}
          />
        </Box>
      </Box>

      <Box mt={"20px"}>
        <Typography fontSize={{ xs: ".8rem", md: "1rem" }} color='active.main'>
          {t("document_des")}
        </Typography>
        <Box ml={"5%"}>
          <ul>
            <li>
              <Typography fontSize={{ xs: ".8rem", md: "1rem" }}>
                {t("document_des_2")}
              </Typography>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentView;
