import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { country } from "../../utils/acent";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoadingButton from "@mui/lab/LoadingButton";

import SendIcon from "@mui/icons-material/Send";
import {
  RiArrowRightSLine,
  RiCloseCircleFill,
  RiExternalLinkFill,
  RiFileAddLine,
  RiImage2Line,
  RiLinksFill,
  RiUploadCloudLine,
  RiUserVoiceLine,
  RiVoiceprintFill,
} from "react-icons/ri";
import ex1 from "../../images/extension_1.png";
import ex2 from "../../images/extension_2.png";
import ex3 from "../../images/extension_3.png";
import ban from "../../images/ban.svg";
import cover from "../../images/cover.jpg";
import cover1 from "../../images/cover1.webp";

type Props = {
  handleClickOpenAuthor: any;
  productName: any;
  productUrl: any;
  productDesc: any;
  setProductUrl: any;
  fileList: any;
  setFileList: any;
  progress: any;
  setProgress: any;
  simulateUpload: any;
  handleAddLinkAsFile: any;
  productUrlOld: any;
  setOpenUrlImage: any;
  productVideo: any;
  generateResult: any;
  setProductDesc: any;
  videoUrl: any;
  loadingScrip1: any;
  videoUrl2: any;
  loadingScrip2: any;
  generate: any;
  videoUrl3: any;
  loadingScrip3: any;
  generateNew: any;
  setProductName: any;
  resize: any;
  setResize: any;
};

const MaterialVideoRegenerateView = ({
  handleClickOpenAuthor,
  productName,
  productDesc,
  productUrl,
  setProductUrl,
  fileList,
  setFileList,
  progress,
  setProgress,
  simulateUpload,
  handleAddLinkAsFile,
  productUrlOld,
  setOpenUrlImage,
  productVideo,
  generateResult,
  setProductDesc,
  videoUrl,
  loadingScrip1,
  videoUrl2,
  loadingScrip2,
  generate,
  videoUrl3,
  loadingScrip3,
  generateNew,
  setProductName,
  resize,
  setResize
}: Props) => {
  const theme: any = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  
  const [openAvatar, setOpenAvatar] = useState(false);
  const [tabDes, setTabDes] = useState(0);
  const { t } = useTranslation();
  const [viewMore, setViewMore] = useState(false);

  const handleClickOpenAvatar = () => {
    setOpenAvatar(true);
  };

  const handleCloseAvatar = () => {
    setOpenAvatar(false);
  };
  const handleClickOpen = async () => {
    if (productUrlOld == productUrl) {
      setOpenUrlImage(true);
    } else {
      if (
        productUrl.startsWith("http://") ||
        productUrl.startsWith("https://")
      ) {
        setOpen(true);
      } else {
        toast.warning("Link không đúng định dạng.");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{ marginTop: "10px" }}
      display={"flex"}
      gap={"2%"}
      px={{ xs: "2%", md: "5%" }}>
      <Box borderRadius={"10px"} px={"20px"} bgcolor={"white"} width={"28%"}>
        <Box
          height={"72vh"}
          py={"5px"}
          className='scroll-filter'
          sx={{ overflowY: "scroll" }}>
          <Box mt={"20px"}>
            <FileUploader
              fileList={fileList}
              setFileList={setFileList}
              progress={progress}
              setProgress={setProgress}
              simulateUpload={simulateUpload}
              handleAddLinkAsFile={handleAddLinkAsFile}
            />
          </Box>
          <Box mt={"20px"}>
            <Typography mb={"5px"} fontWeight={"500"}>
              {t("create_video")}
            </Typography>
            <TextField
              className='search-input'
              placeholder='Your product name or video topic'
              id='demo-helper-text-aligned'
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              size='small'
              sx={{
                width: "100%",

                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: theme.palette.grey_500.main, // Màu viền khi không có focus
                  },
                  "&:hover fieldset": {
                    borderColor: "unset", // Màu viền khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.active.main, // Màu viền khi focused
                  },
                },
                fontSize: "16px",
              }}
            />
          </Box>
          <Box
            mt={"20px"}
            sx={{
              ".css-16dlh63-MuiInputBase-root-MuiInput-root": {
                border: "1px solid #dddddd",
              },
            }}>
            <Typography mb={"5px"} fontWeight={"500"}>
              {t("video_brief")}
            </Typography>

            <TextField
              placeholder='Describe the features of your product/service/application.'
              multiline
              fullWidth
              value={productDesc}
              onChange={(e) => {
                setProductDesc(e.target.value);
              }}
              variant='standard' // Loại bỏ border mặc định
              InputProps={{
                disableUnderline: true, // Bỏ underline của variant="standard"
                sx: {
                  backgroundColor: "white", // Nền trắng
                  borderRadius: 2, // Đặt border-radius nếu cần
                  padding: 2, // Khoảng cách padding
                  border: "1px solid black",
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  minHeight: "150px !important", // Đặt chiều cao tối thiểu nếu cần
                  resize: "none", // Bỏ resize của textarea
                  overflow: "auto", // Để có thể cuộn
                  scrollbarWidth: "none", // Ẩn thanh cuộn cho Firefox
                  msOverflowStyle: "none", // Ẩn thanh cuộn cho Internet Explorer và Edge
                },
                "& .MuiFormControl-root": {
                  // Đặt chiều cao tối thiểu cho TextField
                },
                // Ẩn thanh cuộn trong các trình duyệt WebKit
                "&::-webkit-scrollbar": {
                  display: "none", // Ẩn thanh cuộn
                },
              }}
            />
          </Box>
        </Box>
        <Box
          padding={"10px"}
          sx={{
            ".MuiNativeSelect-select": {
              p: "7px",
            },
            display: "flex",
            justifyContent: "center",
          }}>
          <Button
            variant='contained'
            onClick={() => generateNew()}
            disabled={
              !productName ||
              !productDesc ||
              !(
                fileList.length ==
                progress.filter((item: any) => item == 100).length
              ) ||
              !(fileList.length > 0)
            }
            sx={{
              width: "180px",
              background: theme.palette.active.main,
              fontSize: { xs: "10px", md: "15px" },
              borderRadius: "8px",
              color: "white",
              py: "0px"
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1.7em'
              height='1.7em'
              fill='none'
              viewBox='0 0 17 21'
              focusable='false'
              className='chakra-icon css-1uib6s7'>
              <path
                fill='#fff'
                d='M9.05 8.2a.474.474 0 0 1 .901 0l.847 2.542a3.8 3.8 0 0 0 2.4 2.399l2.541.846a.474.474 0 0 1 0 .9l-2.542.847a3.8 3.8 0 0 0-2.4 2.4l-.846 2.542a.474.474 0 0 1-.9 0l-.847-2.542a3.8 3.8 0 0 0-2.399-2.4l-2.542-.846a.474.474 0 0 1 0-.9l2.542-.847a3.8 3.8 0 0 0 2.4-2.4zM3.98 1.506a.285.285 0 0 1 .541 0l.508 1.525c.227.68.76 1.213 1.44 1.44l1.525.508a.285.285 0 0 1 0 .54l-1.525.508a2.27 2.27 0 0 0-1.44 1.44l-.508 1.525a.285.285 0 0 1-.54 0l-.508-1.525a2.27 2.27 0 0 0-1.44-1.44L.508 5.52a.285.285 0 0 1 0-.54l1.525-.508a2.27 2.27 0 0 0 1.44-1.44zM13.26.13a.19.19 0 0 1 .36 0l.338 1.016c.15.454.507.81.96.96l1.017.34a.19.19 0 0 1 0 .359l-1.016.338a1.52 1.52 0 0 0-.961.961l-.339 1.016a.19.19 0 0 1-.36 0l-.338-1.016a1.52 1.52 0 0 0-.96-.96l-1.015-.34a.19.19 0 0 1 0-.359l1.016-.338c.454-.151.81-.507.96-.961z'></path>
            </svg>
            <Box ml={"10px"}>
              {t("generate")}  <p style={{ fontSize: "10px", marginTop: "-5px" }}>(100000 {t("credits")})</p>
            </Box>
          </Button>
        </Box>
      </Box>
      <Box
        width={"70%"}
        bgcolor={"white"}
        height={"82vh"}
        borderRadius={"10px"}>
        <Box width={"100%"} height={"100%"} p={"15px"}>
          <Box>
            <Box>
              <Box
                className='scroll-filter'
                display={"flex"}
                width={"100%"}
                height={"80vh"}
                sx={{ overflowY: "scroll" }}
                flexDirection={"column"}>
                {Object.entries(generateResult).map(
                  ([key, script]: any, index: any) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <Box width={"68%"}>
                        <Typography
                          fontSize={"1.4rem"}
                          mb={"15px"}
                          fontWeight={"500"}>
                          Kịch bản {index + 1}
                        </Typography>
                        <Box
                          borderRadius={"10px"}
                          py={"10px"}
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"space-between"}
                          border={"1px solid #ccc"}>
                          {script.map((line: any, lineIndex: any) => {
                            return (
                              <Typography
                                borderBottom={"1px solid #ccc"}
                                p={"10px 10px"}>
                                {line}
                              </Typography>
                            );
                          })}
                        </Box>
                        <Box
                          mt={"10px"}
                          px={"10px"}
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}>
                          <Box display={"flex"} gap={"10px"}>
                            <Button
                              variant='contained'
                              onClick={() => handleClickOpenAuthor()}
                              sx={{
                                width: "200px",
                                background: theme.palette.active.main,
                                fontSize: { xs: "10px", md: "15px" },
                                borderRadius: "8px",
                                color: "white",
                              }}>
                              {" "}
                              <RiVoiceprintFill
                                style={{ marginRight: "10px" }}
                              />{" "}
                              {t("voice")}
                            </Button>
                            {/* <Button
                              variant='contained'
                              sx={{
                                width: "50px",
                                background: theme.palette.active.main,
                                fontSize: { xs: "10px", md: "15px" },
                                borderRadius: "8px",
                                color: "white",
                              }}>
                              {" "}
                              <RiUserVoiceLine />
                            </Button> */}
                          </Box>

                          <Button
                            variant='contained'
                            onClick={() => handleClickOpenAvatar()}
                            sx={{
                              width: "200px",
                              background: theme.palette.active.main,
                              fontSize: { xs: "10px", md: "15px" },
                              borderRadius: "8px",
                              color: "white",
                            }}>
                            {" "}
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='1.2em'
                              height='1.2em'
                              style={{ marginRight: "3px" }}
                              fill='none'
                              viewBox='0 0 20 20'
                              focusable='false'
                              className='chakra-icon css-1cv0b1u'>
                              <path
                                stroke='#fff'
                                stroke-linecap='round'
                                stroke-width='1.5'
                                d='M12 3.5v-.3A1.2 1.2 0 0 0 10.8 2H3.2A1.2 1.2 0 0 0 2 3.2v9.6A1.2 1.2 0 0 0 3.2 14h2.3'></path>
                              <path
                                stroke='#fff'
                                stroke-width='1.5'
                                d='M8 7.2A1.2 1.2 0 0 1 9.2 6h7.6A1.2 1.2 0 0 1 18 7.2v9.6a1.2 1.2 0 0 1-1.2 1.2H9.2A1.2 1.2 0 0 1 8 16.8z'></path>
                              <path
                                stroke='#fff'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                                stroke-width='1.5'
                                d='M11 12h4m-2-2v4'></path>
                            </svg>
                            {t("duplicate_size_button")}
                          </Button>
                        </Box>
                      </Box>
                      {key == "scrip_1" && (
                        <>
                          {loadingScrip1 ? (
                            <Box
                              width={"30%"}
                              display={"flex"}
                              flexDirection={"column"}
                              justifyContent={"center"}
                              alignItems={"center"}>
                              <LoadingButton
                                endIcon={<SendIcon />}
                                loading={loadingScrip1}
                                loadingPosition='end'
                                sx={{
                                  bgcolor: loadingScrip1
                                    ? theme.palette.active.main // Màu nền khi loading
                                    : theme.palette.active.main, // Màu nền mặc định
                                  color: "white",
                                  "&.Mui-disabled": {
                                    bgcolor: theme.palette.active.main, // Màu nền khi disabled
                                    color: "white",
                                  },
                                }}
                                variant='contained'>
                                Generate
                              </LoadingButton>
                            </Box>
                          ) : (
                            <Box
                              width={"30%"}
                              display={"flex"}
                              flexDirection={"column"}
                              alignItems={"center"}
                              justifyContent={"end"}
                              gap={"10px"}
                              borderRadius={"10px"}>
                              <video
                                width={"80%"}
                                style={{ borderRadius: "10px" }}
                                height={"355px"}
                                controls>
                                <source src={videoUrl} type='video/mp4' />
                                Your browser does not support the video tag.
                              </video>
                              <a href={videoUrl} download='video.mp4'>
                                <Button
                                  variant='contained'
                                  onClick={() => setTabDes(1)}
                                  sx={{
                                    m: "10px",
                                    width: "200px",
                                    background: theme.palette.active.main,
                                    fontSize: { xs: "10px", md: "15px" },
                                    borderRadius: "8px",
                                    color: "white",
                                  }}>
                                  {" "}
                                  <RiExternalLinkFill
                                    style={{ marginRight: "10px" }}
                                  />{" "}
                                  {t("exports")}
                                </Button>
                              </a>
                            </Box>
                          )}
                        </>
                      )}
                      {key == "scrip_2" && (
                        <>
                          {loadingScrip2 ? (
                            <Box
                              width={"30%"}
                              display={"flex"}
                              flexDirection={"column"}
                              justifyContent={"center"}
                              alignItems={"center"}>
                              <LoadingButton
                                endIcon={<SendIcon />}
                                loading={loadingScrip2}
                                loadingPosition='end'
                                sx={{
                                  bgcolor: loadingScrip1
                                    ? theme.palette.active.main // Màu nền khi loading
                                    : theme.palette.active.main, // Màu nền mặc định
                                  color: "white",
                                  "&.Mui-disabled": {
                                    bgcolor: theme.palette.active.main, // Màu nền khi disabled
                                    color: "white",
                                  },
                                }}
                                variant='contained'>
                                Generate
                              </LoadingButton>
                            </Box>
                          ) : (
                            <>
                              {videoUrl2 ? (
                                <Box
                                  width={"30%"}
                                  display={"flex"}
                                  flexDirection={"column"}
                                  alignItems={"center"}
                                  justifyContent={"end"}
                                  gap={"10px"}
                                  borderRadius={"10px"}>
                                  <video
                                    width={"80%"}
                                    style={{ borderRadius: "10px" }}
                                    height={"355px"}
                                    controls>
                                    <source src={videoUrl2} type='video/mp4' />
                                    Your browser does not support the video tag.
                                  </video>
                                  <a href={videoUrl2} download='video.mp4'>
                                    <Button
                                      variant='contained'
                                      onClick={() => setTabDes(1)}
                                      sx={{
                                        m: "10px",
                                        width: "200px",
                                        background: theme.palette.active.main,
                                        fontSize: { xs: "10px", md: "15px" },
                                        borderRadius: "8px",
                                        color: "white",
                                      }}>
                                      {" "}
                                      <RiExternalLinkFill
                                        style={{ marginRight: "10px" }}
                                      />{" "}
                                      {t("exports")}
                                    </Button>
                                  </a>
                                </Box>
                              ) : (
                                <Box
                                  width={"30%"}
                                  display={"flex"}
                                  flexDirection={"column"}
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                  gap={"10px"}
                                  borderRadius={"10px"}>
                                  <Button
                                    variant='contained'
                                    onClick={() => generate(key)}
                                    sx={{
                                      m: "10px",
                                      width: "200px",
                                      background: theme.palette.active.main,
                                      fontSize: { xs: "10px", md: "15px" },
                                      borderRadius: "8px",
                                      color: "white",
                                    }}>
                                    {" "}
                                    Preview
                                  </Button>
                                </Box>
                              )}
                            </>
                          )}
                        </>
                      )}
                      {key == "scrip_3" && (
                        <>
                          {loadingScrip3 ? (
                            <Box
                              width={"30%"}
                              display={"flex"}
                              flexDirection={"column"}
                              justifyContent={"center"}
                              alignItems={"center"}>
                              <LoadingButton
                                endIcon={<SendIcon />}
                                loading={loadingScrip3}
                                loadingPosition='end'
                                sx={{
                                  bgcolor: loadingScrip1
                                    ? theme.palette.active.main // Màu nền khi loading
                                    : theme.palette.active.main, // Màu nền mặc định
                                  color: "white",
                                  "&.Mui-disabled": {
                                    bgcolor: theme.palette.active.main, // Màu nền khi disabled
                                    color: "white",
                                  },
                                }}
                                variant='contained'>
                                Generate
                              </LoadingButton>
                            </Box>
                          ) : (
                            <>
                              {videoUrl3 ? (
                                <Box
                                  width={"30%"}
                                  display={"flex"}
                                  flexDirection={"column"}
                                  alignItems={"center"}
                                  justifyContent={"end"}
                                  gap={"10px"}
                                  borderRadius={"10px"}>
                                  <video
                                    width={"80%"}
                                    style={{ borderRadius: "10px" }}
                                    height={"355px"}
                                    controls>
                                    <source src={videoUrl3} type='video/mp4' />
                                    Your browser does not support the video tag.
                                  </video>
                                  <a href={videoUrl3} download='video.mp4'>
                                    <Button
                                      variant='contained'
                                      onClick={() => setTabDes(1)}
                                      sx={{
                                        m: "10px",
                                        width: "200px",
                                        background: theme.palette.active.main,
                                        fontSize: { xs: "10px", md: "15px" },
                                        borderRadius: "8px",
                                        color: "white",
                                      }}>
                                      {" "}
                                      <RiExternalLinkFill
                                        style={{ marginRight: "10px" }}
                                      />{" "}
                                      {t("exports")}
                                    </Button>
                                  </a>
                                </Box>
                              ) : (
                                <Box
                                  width={"30%"}
                                  display={"flex"}
                                  flexDirection={"column"}
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                  gap={"10px"}
                                  borderRadius={"10px"}>
                                  <Button
                                    variant='contained'
                                    onClick={() => generate(key)}
                                    sx={{
                                      m: "10px",
                                      width: "200px",
                                      background: theme.palette.active.main,
                                      fontSize: { xs: "10px", md: "15px" },
                                      borderRadius: "8px",
                                      color: "white",
                                    }}>
                                    {" "}
                                    Preview
                                  </Button>
                                </Box>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        sx={{ cursor: "pointer" }}
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <Box
            width={"100%"}
            display={"flex"}
            onClick={handleClose}
            justifyContent={"end"}>
            <RiCloseCircleFill size={25} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box width={"500px"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              gap={"15px"}
              sx={{
                ".p": {
                  margin: 0,
                },
              }}
              alignItems={"center"}>
              <Typography fontWeight={"500"}>
                Target website blocked direct access 😵‍💫
              </Typography>
              <Typography fontWeight={"500"}>
                Please use our Chrome plugin to fetch page info again.
              </Typography>
              <Button
                variant='contained'
                onClick={handleClickOpen}
                endIcon={
                  <div className='css-3ukjbq'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1em'
                      height='1em'
                      fill='none'
                      viewBox='0 0 18 18'
                      style={{ width: "18px", height: "18px" }}>
                      <path
                        fill='#fff'
                        d='M.003 9a8.98 8.98 0 1 0 17.96-.007A8.98 8.98 0 0 0 .004 9'></path>
                      <path
                        fill='#EA4336'
                        d='m4.533 7.84-2.57-4.45A8.975 8.975 0 0 1 16.71 4.402H9.385A4.636 4.636 0 0 0 4.533 7.84'></path>
                      <path
                        fill='#FABD05'
                        d='M12.197 5.703h5.156a8.9 8.9 0 0 1 .61 3.277 8.975 8.975 0 0 1-8.88 8.981l3.679-6.362a4.586 4.586 0 0 0-.563-5.896z'></path>
                      <path
                        fill='#4285F4'
                        d='M5.722 9a3.262 3.262 0 1 1 6.523-.007 3.262 3.262 0 0 1-6.523.008'></path>
                      <path
                        fill='#34A852'
                        d='m10.22 13.43-2.57 4.467A9 9 0 0 1 0 9.013 8.86 8.86 0 0 1 1.163 4.61l3.663 6.33a4.62 4.62 0 0 0 4.158 2.65 5.3 5.3 0 0 0 1.237-.16'></path>
                    </svg>
                  </div>
                }
                sx={{
                  width: "250px",
                  background: theme.palette.active.main,
                  fontSize: { xs: "10px", md: "15px" },
                  borderRadius: "8px",
                }}>
                Get Chrome Extension
              </Button>
              <Typography fontWeight={"500"}>
                Supports parsing info from almost any site
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              padding={"20px 0"}>
              <Box>
                <Typography color=''>Step1</Typography>
                <Typography color=''>
                  Visit the target site, click Convert
                </Typography>
                <Box width={205} height={147}>
                  <img src={ex1} width={"100%"} height={"100%"} alt='' />
                </Box>
              </Box>
              <Box>
                <Typography color=''>Step2</Typography>
                <Typography color=''>Wait and get the result</Typography>
                <Box width={205} height={147}>
                  <img src={ex2} width={"170px"} height={"68px"} alt='' />
                  <img src={ex3} width={"170px"} height={"68px"} alt='' />
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        sx={{ cursor: "pointer" }}
        maxWidth={"xs"}
        fullWidth={true}
        open={openAvatar}
        onClose={handleCloseAvatar}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <Box
            width={"100%"}
            display={"flex"}
            onClick={handleCloseAvatar}
            justifyContent={"end"}>
            <RiCloseCircleFill size={25} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography
            textAlign={"center"}
            fontSize={"1.4rem"}
            fontWeight={"500"}>
            {t("duplicate_size")}
          </Typography>
          <Box
            display={"flex"}
            mt={"30px"}
            justifyContent={"space-between"}
            gap={"10px"}>
            <Box
              onClick={() => setResize("9:16")}
              border={
                resize == "9:16"
                  ? `1px solid ${theme.palette.active.main}`
                  : "1px solid #ccc"
              }
              width={"65px"}
              height={"65px"}
              borderRadius={"8px"}
              bgcolor={"rgba(0,0,0,.05)"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"4px"}>
              <Box
                width={"12px"}
                height={"20px"}
                border={`1px solid ${theme.palette.active.main}`}
                borderRadius={"2px"}
                bgcolor={"white"}></Box>
              <Typography fontSize={".9rem"}>Origin</Typography>
            </Box>
            <Box
              width={"65px"}
              height={"65px"}
              borderRadius={"8px"}
              onClick={() => setResize("3:4")}
              border={
                resize == "3:4"
                  ? `1px solid ${theme.palette.active.main}`
                  : "1px solid #ccc"
              }
              bgcolor={"rgba(0,0,0,.05)"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"4px"}>
              <Box
                width={"15px"}
                height={"20px"}
                border={`1px solid ${theme.palette.active.main}`}
                borderRadius={"2px"}
                bgcolor={"white"}></Box>
              <Typography fontSize={".9rem"}>3:4</Typography>
            </Box>
            <Box
              width={"65px"}
              height={"65px"}
              borderRadius={"8px"}
              onClick={() => setResize("1:1")}
              border={
                resize == "1:1"
                  ? `1px solid ${theme.palette.active.main}`
                  : "1px solid #ccc"
              }
              bgcolor={"rgba(0,0,0,.05)"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"4px"}>
              <Box
                width={"20px"}
                height={"20px"}
                border={`1px solid ${theme.palette.active.main}`}
                borderRadius={"2px"}
                bgcolor={"white"}></Box>
              <Typography fontSize={".9rem"}>1:1</Typography>
            </Box>
            <Box
              width={"65px"}
              height={"65px"}
              borderRadius={"8px"}
              onClick={() => setResize("4:3")}
              border={
                resize == "4:3"
                  ? `1px solid ${theme.palette.active.main}`
                  : "1px solid #ccc"
              }
              bgcolor={"rgba(0,0,0,.05)"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"4px"}>
              <Box
                width={"20px"}
                height={"15px"}
                border={`1px solid ${theme.palette.active.main}`}
                borderRadius={"2px"}
                bgcolor={"white"}></Box>
              <Typography fontSize={".9rem"}>4:3</Typography>
            </Box>
            <Box
              width={"65px"}
              height={"65px"}
              borderRadius={"8px"}
              onClick={() => setResize("16:9")}
              border={
                resize == "16:9"
                  ? `1px solid ${theme.palette.active.main}`
                  : "1px solid #ccc"
              }
              bgcolor={"rgba(0,0,0,.05)"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"4px"}>
              <Box
                width={"20px"}
                height={"12px"}
                border={`1px solid ${theme.palette.active.main}`}
                borderRadius={"2px"}
                bgcolor={"white"}></Box>
              <Typography fontSize={".9rem"}>16:9</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
        
          <Button
             onClick={handleCloseAvatar}
            variant='contained'
            sx={{ background: theme.palette.active.main, borderRadius: "8px" }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaterialVideoRegenerateView;

import { LinearProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";

const FileUploader = ({
  fileList,
  setFileList,
  progress,
  setProgress,
  simulateUpload,
  handleAddLinkAsFile,
}: any) => {
  const theme = useTheme();
  // Hàm xử lý tải file
  const { t } = useTranslation();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles: File[] = [];
      const allowedTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/bmp",
        "image/webp",
        "video/mp4",
        "video/mov",
      ];

      Array.from(files).forEach((file) => {
        if (allowedTypes.includes(file.type)) {
          validFiles.push(file);
        }
      });

      // Cập nhật danh sách file và phần trăm tải về
      setFileList((prev: any) => [...prev, ...validFiles]);
      setProgress((prev: any) => [...prev, ...validFiles.map(() => 0)]);

      // Giả lập tiến trình upload
      validFiles.forEach((_, index) => simulateUpload(index + fileList.length));
    }
  };

  // Hàm xóa file
  const handleRemoveFile = (index: number) => {
    setFileList((prev: any) => prev.filter((_: any, i: any) => i !== index));
    setProgress((prev: any) => prev.filter((_: any, i: any) => i !== index));
  };

  return (
    <Box mt={"20px"}>
      {/* Khu vực tải lên */}

      <Box
        sx={{
          textAlign: "center",
          marginBottom: "5px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}>
        <Typography mb={"5px"} fontWeight={"500"}>
          {t("media")}
        </Typography>
        <input
          type='file'
          accept='image/*,video/*'
          multiple
          style={{ display: "none" }}
          id='file-upload'
          onChange={handleFileUpload}
        />
        <label
          htmlFor='file-upload'
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            cursor: "pointer",
          }}>
          <Typography
            sx={{
              width: "max-content",
              background: theme.palette.active.main,
              fontSize: { xs: "10px", md: "13px" },
              borderRadius: "8px",
              padding: "5px 10px",
              color: "white",
            }}>
            {t("upload")}
          </Typography>
        </label>
      </Box>

      {/* Danh sách file đã tải */}
      {fileList.length > 0 && (
        <Box
          className='list-scroll'
          display='flex'
          flexWrap='wrap'
          padding='20px'
          border='2px dashed #ccc'
          borderRadius='8px'
          bgcolor='white'
          gap='5px'
          maxHeight={"200px"}
          sx={{ overflowY: "scroll" }}
          justifyContent='start' // Căn ngang các item
        >
          {fileList.map((file: any, index: any) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                padding: "20px 10px",
                gap: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                overflow: "hidden",
              }}>
              {/* Hiển thị hình ảnh hoặc video */}
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  muted
                  controls
                />
              )}

              {/* Hiển thị tên file */}
              <Typography
                title={file.name}
                sx={{
                  width: "73%",
                  fontSize: "14px",
                  textAlign: "left",
                  wordBreak: "break-word",
                }}>
                {file.name.length > 30
                  ? `${file.name.slice(0, 30)}...`
                  : file.name}
              </Typography>

              {/* Nút xóa */}
              <IconButton
                onClick={() => handleRemoveFile(index)}
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  color: "red",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}>
                <RiCloseCircleFill size={15} />
              </IconButton>

              {/* Phần trăm tải */}
              {progress[index] < 100 && (
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: "5px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "12px",
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "5px",
                  }}>
                  Uploading {progress[index].toFixed(2)}%
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
