import {
  Box,
  Dialog,
  DialogContent,
  Drawer,
  Popover,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  RiArrowDownSLine,
  RiCloseLine,
  RiEmojiStickerFill,
  RiFileTextLine,
  RiHqLine,
  RiWechatFill,
} from "react-icons/ri";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import author from "../../images/user.png";

import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import Author from "../../components/Author";
import InputSlider from "../../components/InputSlide";
import Loading from "../../components/Loading";
import alloy from "../../images/alloy.svg";
import echo from "../../images/echo.svg";
import fable from "../../images/fable.svg";
import onyx from "../../images/onyx.svg";
import nova from "../../images/nova.svg";
import shimmer from "../../images/shimmer.svg";
import StoryMakerController from "./StoryMakerController";
import DocumentController from "./DocumentController";
import { useTranslation } from "react-i18next";
import vn from "../../images/vn.png";
import EmojController from "./EmojController";
const images: any = {
  alloy: alloy,
  echo: echo,
  fable: fable,
  onyx: onyx,
  nova: nova,
  shimmer: shimmer,
};
type Props = {
  textVoice: string;
  setTextVoice: any;
  setSpeed: any;
  speed: any;
  handleClickQuality: any;
  handleCloseQuality: any;
  idQuality: any;
  anchorElQuality: any;
  openQuality: any;
  handleSelectQuality: any;
  selectedQuality: any;
  base64Voice: any;
  handleCloseAuthor: any;
  handleClickOpenAuthor: any;
  openAuthor: any;
  toggleDrawer: any;
  isOpen: any;
  handleCreateVoice: any;
  voices: any;
  voice: any;
  setVoice: any;
  loadingVoices: any;
  limit: any;
  setBlock: any;
  block: any;
  handleStoryMaker: any;
  tab: any;
  setTab: any;
  setHidden: any;
  hidden: any;
  arr: any;
  handleCreateVoiceDocument: any;
  setFile: any;
  file: any;
  voicesFavorite: any;
  setVoicesFavorite: any;
  handleClickOpenAddMyVoice: any;
  myVoices: any;
  loadMyVoices: any;
  setLoading: any;
  setTypeVoice: any;
  typeVoice: any;
};
const VocalizeView = ({
  textVoice,
  setTextVoice,
  setSpeed,
  speed,
  handleClickQuality,
  handleCloseQuality,
  idQuality,
  anchorElQuality,
  openQuality,
  handleSelectQuality,
  selectedQuality,
  base64Voice,
  handleClickOpenAuthor,
  openAuthor,
  toggleDrawer,
  isOpen,
  handleCreateVoice,
  handleCloseAuthor,
  voices,
  setVoice,
  voice,
  loadingVoices,
  limit,
  setBlock,
  block,
  handleStoryMaker,
  tab,
  setTab,
  setHidden,
  hidden,
  handleCreateVoiceDocument,
  file,
  setFile,
  voicesFavorite,
  setVoicesFavorite,
  handleClickOpenAddMyVoice,
  myVoices,
  loadMyVoices,
  setLoading,
  setTypeVoice,
  typeVoice,
}: Props) => {
  const theme: any = useTheme();
  let max_length = "";
  block.map((item: any) => {
    return (max_length += " " + item.text);
  });
  const { t } = useTranslation();
  return (
    <Box p={"20px"}>
      <Stack
        direction={"row"}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent={"space-between"}
        gap={"20px"}>
        <Box
          position={"relative"}
          bgcolor={"white"}
          height={{ xs: "65vh", md: "68vh" }}
          width={{ xs: "100%", md: "49%" }}
          border={"1px solid #dddddd"}
          borderRadius={"8px"}>
          <Box sx={{ borderBottom: "1px solid rgb(226 232 240)" }}>
            <Stack
              direction={"row"}
              gap={"20px"}
              padding={"0 20px"}
              sx={{ cursor: "pointer" }}>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={() => {
                  setTab("input_text");
                }}
                gap={"5px"}
                padding={"9px 0"}
                sx={{
                  borderBottom:
                    tab == "input_text"
                      ? `3px solid ${theme.palette.active.main}`
                      : "unset",
                  color: tab == "input_text" ? "black" : "grey_500.main",
                }}>
                <svg
                  data-v-fa4d36aa=''
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='icon flex-shrink-0 w-5 h-5 relative text-gray-700 dark:text-gray-200'
                  width='1em'
                  height='1em'
                  viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='m11.9 22l4.55-12h2.1l4.55 12H21l-1.075-3.05h-4.85L14 22zM4 19l-1.4-1.4l5.05-5.05q-.875-.875-1.588-2T4.75 8h2.1q.5.975 1 1.7t1.2 1.45q.825-.825 1.713-2.313T12.1 6H1V4h7V2h2v2h7v2h-2.9q-.525 1.8-1.575 3.7t-2.075 2.9l2.4 2.45l-.75 2.05l-3.05-3.125zm11.7-1.8h3.6l-1.8-5.1z'
                  />
                </svg>

                <Typography
                  fontSize={{ xs: ".7rem", md: ".9rem" }}
                  fontWeight={"500"}>
                  {t("input_text")}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                onClick={() => {
                  setTab("emoj");
                }}
                gap={"5px"}
                padding={"9px 0"}
                sx={{
                  borderBottom:
                    tab == "emoj"
                      ? `3px solid ${theme.palette.active.main}`
                      : "unset",
                  color: tab == "emoj" ? "black" : "grey_500.main",
                }}>
                <RiEmojiStickerFill />

                <Typography
                  fontSize={{ xs: ".7rem", md: ".9rem" }}
                  fontWeight={"500"}>
                  {t("emotional_text")}
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  setBlock([]);
                  setTab("story_maker");
                }}
                display={"flex"}
                alignItems={"center"}
                gap={"5px"}
                padding={"9px 0"}
                sx={{
                  borderBottom:
                    tab == "story_maker"
                      ? `3px solid ${theme.palette.active.main}`
                      : "unset",
                  color: tab == "story_maker" ? "black" : "grey_500.main",
                }}>
                <RiWechatFill />

                <Typography
                  fontSize={{ xs: ".7rem", md: ".9rem" }}
                  fontWeight={"500"}>
                  {t("story")}
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  setTab("document");
                }}
                display={"flex"}
                alignItems={"center"}
                gap={"5px"}
                padding={"9px 0"}
                sx={{
                  borderBottom:
                    tab == "document"
                      ? `3px solid ${theme.palette.active.main}`
                      : "unset",
                  color: tab == "document" ? "black" : "grey_500.main",
                }}>
                <RiFileTextLine />

                <Typography
                  fontSize={{ xs: ".7rem", md: ".9rem" }}
                  fontWeight={"500"}>
                  {t("document")}
                </Typography>
              </Box>
            </Stack>
          </Box>
          {tab == "input_text" && (
            <Box
              width={"100%"}
              height={"100%"}
              position={"relative"}
              sx={{
                ".css-lh8pzc-MuiInputBase-root-MuiOutlinedInput-root": {
                  height: "83%",
                  border: "none",
                },
                ".css-15oluye-MuiFormControl-root-MuiTextField-root": {
                  height: "90%",
                },
              }}
              boxSizing={"border-box"}>
              <TextField
                placeholder={t("input_text_desc")}
                multiline
                value={textVoice}
                onChange={(e) => {
                  if (e.target.value.length <= limit) {
                    setTextVoice(e.target.value);
                  } else {
                    if (!limit) {
                      setTextVoice(e.target.value);
                    }
                  }
                }}
                fullWidth
                rows={4} // Số dòng hiển thị
                variant='standard' // Loại bỏ border mặc định
                InputProps={{
                  disableUnderline: true, // Bỏ underline của variant="standard"
                  sx: {
                    backgroundColor: "white", // Nền trắng
                    borderRadius: 2, // Đặt border-radius nếu cần
                    padding: 1, // Khoảng cách padding
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    height: "50vh !important", // Cài đặt chiều cao tự động
                    minHeight: "100px", // Đặt chiều cao tối thiểu nếu cần
                    resize: "none", // Bỏ resize của textarea
                    overflow: "auto", // Để có thể cuộn
                    scrollbarWidth: "none", // Ẩn thanh cuộn cho Firefox
                    msOverflowStyle: "none", // Ẩn thanh cuộn cho Internet Explorer và Edge
                  },
                  "& .MuiFormControl-root": {
                    minHeight: "100px", // Đặt chiều cao tối thiểu cho TextField
                  },
                  // Ẩn thanh cuộn trong các trình duyệt WebKit
                  "&::-webkit-scrollbar": {
                    display: "none", // Ẩn thanh cuộn
                  },
                }}
              />
            </Box>
          )}
          {tab == "story_maker" && (
            <StoryMakerController
              setBlock={setBlock}
              block={block}
              hidden={hidden}
              setHidden={setHidden}
              voicesFavorite={voicesFavorite}
              setVoicesFavorite={setVoicesFavorite}
              myVoices={myVoices}
            />
          )}
          {tab == "document" && (
            <DocumentController setFile={setFile} file={file} />
          )}
          {(tab == "input_text" || tab == "emoj") && (
            <>
              {textVoice.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: { xs: 10, md: 15 },
                    right: 10,
                    display: "flex",
                    gap: "15px",
                    cursor: "pointer",
                  }}>
                  <Typography>
                    {textVoice.length}/{limit}
                  </Typography>
                  <Box onClick={() => setTextVoice("")}>
                    <Typography color='red'>{t("clear_text")}</Typography>
                  </Box>
                </Box>
              )}
            </>
          )}
           {tab == "emoj" &&
           <Box>
              <EmojController setTextVoice={setTextVoice} limit={limit} textVoice={textVoice} />
           </Box>
           }
        </Box>
        <Box
          display={{ xs: "none", md: "flex" }}
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={{ xs: "50vh", md: "75vh" }}
          width={{ xs: "100%", md: "49%" }}>
          <Box height={"90%"} sx={{ position: "relative" }}>
            {!loadingVoices ? (
              <Author
                setVoice={setVoice}
                voice={voice}
                data={voices}
                type={""}
                voicesFavorite={voicesFavorite}
                setVoicesFavorite={setVoicesFavorite}
                handleClickOpenAddMyVoice={handleClickOpenAddMyVoice}
                myVoices={myVoices}
                loadMyVoices={loadMyVoices}
                setLoading={setLoading}
                setTypeVoice={setTypeVoice}
                typeVoice={typeVoice}
              />
            ) : (
              <Loading height={"100%"} />
            )}
          </Box>
          <Box
            mt={"10px"}
            display={"flex"}
            justifyContent={tab == "story_maker" ? "center" : "space-between"}
            alignItems={"center"}
            width={"100%"}
            sx={{ cursor: "pointer" }}
            height={"45px"}>
            {(tab == "input_text" || tab == "document") && (
              <Box
                height={"100%"}
                width={"48%"}
                border={"2px solid #dddddd"}
                sx={{
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  ".css-918vr5-MuiStack-root": {
                    transform: "rotate(180deg)",
                  },
                  ".css-lp854l-MuiFormControl-root-MuiTextField-root input[type=number]":
                    {},
                  ".css-lp854l-MuiFormControl-root-MuiTextField-root": {
                    width: "45px",
                  },
                }}>
                <InputSlider setValue={setSpeed} value={speed} label={true} />
              </Box>
            )}
            {/* <Box
              width={"31%"}
              height={"100%"}
              sx={{ border: "2px solid #dddddd" }}>
              <Box
                sx={{
                  "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper css-kvalmi-MuiPaper-root-MuiPopover-paper":
                    {
                      padding: "5px",
                    },
                  height: "100%",
                }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                  aria-describedby={idQuality}
                  onClick={handleClickQuality}>
                  <RiHqLine size={20} />
                  <Typography fontSize={"1.2rem"}>{selectedQuality}</Typography>
                  <RiArrowDownSLine size={20} />
                </Box>

                <Popover
                  id={idQuality}
                  open={openQuality}
                  anchorEl={anchorElQuality}
                  onClose={handleCloseQuality}
                  disableEnforceFocus
                  sx={{ p: "5px", cursor: "pointer", zIndex: 1301 }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}>
                  <Box
                    sx={{
                      cursor: "pointer",
                      position: "relative",
                      zIndex: "1000",
                    }}>
                    <Box>
                      <Typography
                        onClick={() => handleSelectQuality("Chất lượng cao")}
                        sx={{
                          padding: "10px 8px",
                          width: "180px",
                          cursor: "pointer",
                          background:
                            selectedQuality == "Chất lượng cao"
                              ? theme.palette.active.main
                              : "unset",
                          color:
                            selectedQuality == "Chất lượng cao"
                              ? "white"
                              : "black",
                        }}>
                        Chất lượng cao
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        onClick={() => handleSelectQuality("Chất lượng HD")}
                        sx={{
                          padding: "10px 8px",
                          width: "180px",
                          cursor: "pointer",
                          background:
                            selectedQuality == "Chất lượng HD"
                              ? theme.palette.active.main
                              : "unset",
                          color:
                            selectedQuality == "Chất lượng HD"
                              ? "white"
                              : "black",
                        }}>
                        Chất lượng HD
                      </Typography>
                    </Box>
                  </Box>
                </Popover>
              </Box>
            </Box> */}
            {tab == "input_text" && (
              <Box
                width={"48%"}
                onClick={handleCreateVoice}
                border={"2px solid #dddddd"}
                bgcolor={theme.palette.active.main}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"20%"}
                height={"100%"}
                sx={{
                  pointerEvents: textVoice.length ? "auto" : "none",
                  opacity: textVoice.length ? "1" : ".5",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                  cursor: "pointer",
                  ".css-918vr5-MuiStack-root": {
                    transform: "rotate(180deg)",
                  },
                  ".css-lp854l-MuiFormControl-root-MuiTextField-root input[type=number]":
                    {
                      padding: "0 10px",
                    },
                  ".css-lp854l-MuiFormControl-root-MuiTextField-root": {
                    width: "45px",
                  },
                }}>
                <Typography
                  fontSize={".9rem"}
                  fontWeight={"bold"}
                  color='white'>
                  {t("create_speech")} ( {textVoice.length} {t("credits")} )
                </Typography>
                <Box>
                  <svg
                    data-v-fa4d36aa=''
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='icon flex-shrink-0 w-14 h-14 md:w-6 md:h-6'
                    width='1em'
                    style={{
                      color: "white",
                      fontSize: "30px",
                      marginTop: "5px",
                    }}
                    height='1em'
                    viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M4.929 19.071A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10H2zM11 6v12h2V6zM7 9v6h2V9zm8 0v6h2V9z'
                    />
                  </svg>
                </Box>
              </Box>
            )}
            {tab == "story_maker" && (
              <Box
                width={"48%"}
                onClick={handleStoryMaker}
                border={"2px solid #dddddd"}
                bgcolor={theme.palette.active.main}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"20%"}
                height={"100%"}
                sx={{
                  pointerEvents:
                    block.length > 0 && max_length.length <= 3000
                      ? "auto"
                      : "none",
                  opacity:
                    block.length > 0 && max_length.length <= 3000 ? "1" : ".5",
                  borderRadius: "10px",
                  cursor: "pointer",
                  ".css-918vr5-MuiStack-root": {
                    transform: "rotate(180deg)",
                  },
                  ".css-lp854l-MuiFormControl-root-MuiTextField-root input[type=number]":
                    {
                      padding: "0 10px",
                    },
                  ".css-lp854l-MuiFormControl-root-MuiTextField-root": {
                    width: "45px",
                  },
                }}>
                <Typography fontSize={"1rem"} fontWeight={"bold"} color='white'>
                  {t("create_story")}
                </Typography>
                <Box>
                  <svg
                    data-v-fa4d36aa=''
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='icon flex-shrink-0 w-14 h-14 md:w-6 md:h-6'
                    width='1em'
                    style={{
                      color: "white",
                      fontSize: "30px",
                      marginTop: "5px",
                    }}
                    height='1em'
                    viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M4.929 19.071A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10H2zM11 6v12h2V6zM7 9v6h2V9zm8 0v6h2V9z'
                    />
                  </svg>
                </Box>
              </Box>
            )}
            {tab == "document" && (
              <Box
                width={"48%"}
                onClick={handleCreateVoiceDocument}
                border={"2px solid #dddddd"}
                bgcolor={theme.palette.active.main}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"20%"}
                height={"100%"}
                sx={{
                  pointerEvents: file ? "auto" : "none",
                  opacity: file ? "1" : ".5",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                  cursor: "pointer",
                  ".css-918vr5-MuiStack-root": {
                    transform: "rotate(180deg)",
                  },
                  ".css-lp854l-MuiFormControl-root-MuiTextField-root input[type=number]":
                    {
                      padding: "0 10px",
                    },
                  ".css-lp854l-MuiFormControl-root-MuiTextField-root": {
                    width: "45px",
                  },
                }}>
                <Typography
                  fontSize={".9rem"}
                  fontWeight={"bold"}
                  color='white'>
                  {t("create_speech")}
                </Typography>
                <Box>
                  <svg
                    data-v-fa4d36aa=''
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='icon flex-shrink-0 w-14 h-14 md:w-6 md:h-6'
                    width='1em'
                    style={{
                      color: "white",
                      fontSize: "30px",
                      marginTop: "5px",
                    }}
                    height='1em'
                    viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M4.929 19.071A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10H2zM11 6v12h2V6zM7 9v6h2V9zm8 0v6h2V9z'
                    />
                  </svg>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Stack>
      <Drawer
        anchor='bottom' // Đảm bảo anchor là "right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            boxShadow: "none",
            height: "auto",
            padding: 0,
          },
        }}>
        <Box
          sx={{
            width: { xs: "90%", md: "60%" },
            p: 2,
            cursor: "pointer",
            mx: "auto",
            background: "white",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            position: "relative",
          }}
          role='presentation'>
          <Box
            sx={{
              border: "1px solid #dddddd",
              borderRadius: "50%",
              p: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              right: "15px",
              top: "15px",
              background: "white",
            }}>
            <img
              src={
                voice && voice.id && images[voice.id] ? images[voice.id] : voice.accent == "English"? "https://flagcdn.com/w320/us.png": vn
              }
              width={90}
              height={90}
              style={{ borderRadius: "50%", objectFit: "cover" }}
              alt=''
            />
          </Box>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Box
              width={"50px"}
              height={"5px"}
              borderRadius={"25px"}
              bgcolor={"#dddddd"}></Box>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"15px"}
            width={"100%"}
            paddingBottom={"15px"}
            borderBottom={"2px solid #dddddd"}>
            <SmartDisplayIcon />
            <Typography fontWeight={"500"}>Audio Player</Typography>
          </Box>
          <Box mt={"30px"} width={"calc(100%-20px)"} px={"10px"}>
            <Typography variant='h5' mb={"20px"} fontWeight={"500"}>
              {" "}
              {voice && voice.name}
            </Typography>
            <Box>
              <Box width={"98%"}>
                <AudioPlayer base64Audio={base64Voice} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          bottom: tab == "story_maker" ? "10%" : "-20px",
          left: "0px",
          width: "100%",
        }}>
        {tab == "input_text" && (
          <Box>
            <Box display={"flex"} bgcolor={"white"} sx={{ px: "20px" }}>
              <Box
                width={"50%"}
                sx={{ borderTopLeftRadius: "25px" }}
                border={"1px solid #dddddd"}>
                <Box
                  padding={"5px 0px"}
                  width={"100%"}
                  sx={{
                    ".css-918vr5-MuiStack-root": {
                      transform: "rotate(180deg)",
                    },
                    ".css-lp854l-MuiFormControl-root-MuiTextField-root input[type=number]":
                      {
                        padding: "0 10px !important",
                      },
                    ".css-lp854l-MuiFormControl-root-MuiTextField-root": {
                      width: "45px",
                    },
                  }}>
                  <InputSlider setValue={setSpeed} value={speed} label={true} />
                </Box>
                {/* <Box width={"100%"} sx={{ border: "2px solid #dddddd" }}>
              <Box
                sx={{
                  "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper css-kvalmi-MuiPaper-root-MuiPopover-paper":
                    {
                      padding: "5px",
                    },
                  height: "100%",
                }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                  aria-describedby={idQuality}
                  onClick={handleClickQuality}>
                  <RiHqLine size={20} />
                  <Typography fontSize={"1rem"}>Chất lượng cao</Typography>
                  <RiArrowDownSLine size={20} />
                </Box>

                <Popover
                  id={idQuality}
                  open={openQuality}
                  anchorEl={anchorElQuality}
                  onClose={handleCloseQuality}
                  sx={{ p: "5px" }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}>
                  <Typography sx={{ padding: "10px 8px", width: "180px" }}>
                    Chất lượng cao
                  </Typography>
                  <Typography sx={{ padding: "10px 8px", width: "180px" }}>
                    Chất lượng HD
                  </Typography>
                </Popover>
              </Box>
            </Box> */}
              </Box>
              <Box
                width={"47%"}
                border={"1px solid #dddddd"}
                onClick={handleClickOpenAuthor}
                padding={"5px"}
                sx={{
                  borderBottomRightRadius: "25px",
                }}>
                <Box
                  display={"flex"}
                  justifyContent={"end"}
                  height={"100%"}
                  alignItems={"center"}>
                  <Box>
                    <Typography fontWeight={"500"}>
                      {voice && voice.name}
                    </Typography>
                    <Typography fontSize={".9rem"}>Chất lượng cao</Typography>
                  </Box>
                  <img
                    src={
                      voice && voice.id && images[voice.id]
                        ? images[voice.id]
                        : voice.accent == "English"? "https://flagcdn.com/w320/us.png": vn
                    }
                    width={40}
                    style={{ borderRadius: "50%" }}
                    alt=''
                  />
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"20%"}
              width={"100%"}
              height={"100%"}
              sx={{
                ".css-918vr5-MuiStack-root": {
                  transform: "rotate(180deg)",
                },

                ".css-lp854l-MuiFormControl-root-MuiTextField-root": {},
                position: "relative",
                top: "-90px",
                left: "0",
                borderRadius: "50%",
              }}>
              <Box display={"flex"} justifyContent={"center"}>
                <Box
                  width={"max-content"}
                  onClick={handleCreateVoice}
                  sx={{
                    p: "2px 5px",
                    borderRadius: "50%",
                    pointerEvents: textVoice.length ? "auto" : "none",
                    opacity: textVoice.length ? "1" : ".5",
                  }}
                  bgcolor={theme.palette.active.main}
                  border={"2px solid #dddddd"}>
                  <svg
                    data-v-fa4d36aa=''
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='icon flex-shrink-0 w-14 h-14 md:w-6 md:h-6'
                    width='1em'
                    style={{
                      color: "white",
                      fontSize: "40px",
                      marginTop: "5px",
                    }}
                    height='1em'
                    viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M4.929 19.071A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10H2zM11 6v12h2V6zM7 9v6h2V9zm8 0v6h2V9z'
                    />
                  </svg>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {tab == "story_maker" && (
          <Box px={"20px"}>
            <Box
              onClick={handleStoryMaker}
              border={"2px solid #dddddd"}
              bgcolor={theme.palette.active.main}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"5px"}
              p={"5px"}
              sx={{
                pointerEvents:
                  block.length > 0 && max_length.length <= 3000
                    ? "auto"
                    : "none",
                opacity:
                  block.length > 0 && max_length.length <= 3000 ? "1" : ".5",
                borderRadius: "10px",
                cursor: "pointer",
                ".css-918vr5-MuiStack-root": {
                  transform: "rotate(180deg)",
                },
                ".css-lp854l-MuiFormControl-root-MuiTextField-root input[type=number]":
                  {
                    padding: "10px 10px",
                  },
                ".css-lp854l-MuiFormControl-root-MuiTextField-root": {
                  width: "45px",
                },
              }}>
              <Typography
                fontSize={{ xs: ".8rem", md: "1rem" }}
                fontWeight={"bold"}
                color='white'>
                Tạo câu chuyện
              </Typography>
              <Box>
                <svg
                  data-v-fa4d36aa=''
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='icon flex-shrink-0 w-14 h-14 md:w-6 md:h-6'
                  width='1em'
                  style={{
                    color: "white",
                    fontSize: "15px",
                    marginTop: "5px",
                  }}
                  height='1em'
                  viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M4.929 19.071A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10H2zM11 6v12h2V6zM7 9v6h2V9zm8 0v6h2V9z'
                  />
                </svg>
              </Box>
            </Box>
          </Box>
        )}
        {tab == "document" && (
          <Box>
            <Box display={"flex"} bgcolor={"white"} sx={{ px: "20px" }}>
              <Box
                width={"50%"}
                sx={{ borderTopLeftRadius: "25px" }}
                border={"1px solid #dddddd"}>
                <Box
                  padding={"5px 0px"}
                  width={"100%"}
                  sx={{
                    ".css-918vr5-MuiStack-root": {
                      transform: "rotate(180deg)",
                    },
                    ".css-lp854l-MuiFormControl-root-MuiTextField-root input[type=number]":
                      {
                        padding: "0 10px !important",
                      },
                    ".css-lp854l-MuiFormControl-root-MuiTextField-root": {
                      width: "45px",
                    },
                  }}>
                  <InputSlider setValue={setSpeed} value={speed} label={true} />
                </Box>
                {/* <Box width={"100%"} sx={{ border: "2px solid #dddddd" }}>
              <Box
                sx={{
                  "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper css-kvalmi-MuiPaper-root-MuiPopover-paper":
                    {
                      padding: "5px",
                    },
                  height: "100%",
                }}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                  aria-describedby={idQuality}
                  onClick={handleClickQuality}>
                  <RiHqLine size={20} />
                  <Typography fontSize={"1rem"}>Chất lượng cao</Typography>
                  <RiArrowDownSLine size={20} />
                </Box>

                <Popover
                  id={idQuality}
                  open={openQuality}
                  anchorEl={anchorElQuality}
                  onClose={handleCloseQuality}
                  sx={{ p: "5px" }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}>
                  <Typography sx={{ padding: "10px 8px", width: "180px" }}>
                    Chất lượng cao
                  </Typography>
                  <Typography sx={{ padding: "10px 8px", width: "180px" }}>
                    Chất lượng HD
                  </Typography>
                </Popover>
              </Box>
            </Box> */}
              </Box>
              <Box
                width={"47%"}
                border={"1px solid #dddddd"}
                onClick={handleClickOpenAuthor}
                padding={"5px"}
                sx={{
                  borderBottomRightRadius: "25px",
                }}>
                <Box
                  display={"flex"}
                  justifyContent={"end"}
                  height={"100%"}
                  alignItems={"center"}>
                  <Box>
                    <Typography fontWeight={"500"}>{voice.name}</Typography>
                    <Typography fontSize={".9rem"}>Chất lượng cao</Typography>
                  </Box>
                  <img
                    src={images[voice.id]}
                    width={40}
                    style={{ borderRadius: "50%" }}
                    alt=''
                  />
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"20%"}
              width={"100%"}
              height={"100%"}
              sx={{
                ".css-918vr5-MuiStack-root": {
                  transform: "rotate(180deg)",
                },

                ".css-lp854l-MuiFormControl-root-MuiTextField-root": {},
                position: "relative",
                top: "-90px",
                left: "0",
                borderRadius: "50%",
              }}>
              <Box display={"flex"} justifyContent={"center"}>
                <Box
                  width={"max-content"}
                  onClick={handleCreateVoiceDocument}
                  sx={{
                    p: "2px 5px",
                    borderRadius: "50%",
                    pointerEvents: file ? "auto" : "none",
                    opacity: file ? "1" : ".5",
                  }}
                  bgcolor={theme.palette.active.main}
                  border={"2px solid #dddddd"}>
                  <svg
                    data-v-fa4d36aa=''
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    aria-hidden='true'
                    role='img'
                    className='icon flex-shrink-0 w-14 h-14 md:w-6 md:h-6'
                    width='1em'
                    style={{
                      color: "white",
                      fontSize: "40px",
                      marginTop: "5px",
                    }}
                    height='1em'
                    viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M4.929 19.071A9.97 9.97 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10H2zM11 6v12h2V6zM7 9v6h2V9zm8 0v6h2V9z'
                    />
                  </svg>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Dialog
        fullWidth
        maxWidth='xl' // Đặt maxWidth lớn nhất để có thể sử dụng toàn bộ chiều rộng
        PaperProps={{
          sx: {
            width: "100%", // Chiều rộng 100%
            maxWidth: "100%",
            padding: "5px",
            ".css-kw13he-MuiDialogContent-root": {
              padding: { xs: "0" },
            },
            ".css-1m664ff-MuiPaper-root-MuiDialog-paper": {
              padding: "5px",
            },
          },
        }}
        open={openAuthor}
        onClose={handleCloseAuthor}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <Box
          display={"flex"}
          onClick={handleCloseAuthor}
          justifyContent={"end"}>
          <RiCloseLine size={25} />
        </Box>
        <Box>
          {!loadingVoices ? (
            <Author
              setVoice={setVoice}
              voice={voice}
              data={voices}
              type={""}
              voicesFavorite={voicesFavorite}
              setVoicesFavorite={setVoicesFavorite}
              handleClickOpenAddMyVoice={handleClickOpenAddMyVoice}
              myVoices={myVoices}
              loadMyVoices={loadMyVoices}
              setLoading={setLoading}
              setTypeVoice={setTypeVoice}
              typeVoice={typeVoice}
            />
          ) : (
            <Loading height={"100%"} />
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default VocalizeView;

// function AudioPlayer({ width }: any) {
//   return (
//     <Box>
//       <audio style={{ width: width }} controls>
//         <source src={mp3} type='audio/mpeg' />
//         Your browser does not support the audio element.
//       </audio>
//     </Box>
//   );
// }
const AudioPlayer = ({ base64Audio }: any) => {
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    // Tạo URL từ Base64
    const audioBlob = new Blob(
      [
        new Uint8Array(
          atob(base64Audio)
            .split("")
            .map((c) => c.charCodeAt(0))
        ),
      ],
      { type: "audio/mp3" }
    );
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);

    // Giải phóng URL khi component unmount
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [base64Audio]);

  return (
    <div>
      {audioUrl && (
        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <audio style={{ width: "90%" }} controls>
            <source src={audioUrl} type='audio/mp3' />
            Your browser does not support the audio tag.
          </audio>
          <Box>
            <a
              href={audioUrl}
              download='audio.mp3'
              style={{ display: "block", marginTop: "10px" }}>
              <FileDownloadIcon />
            </a>
          </Box>
        </Box>
      )}
    </div>
  );
};
