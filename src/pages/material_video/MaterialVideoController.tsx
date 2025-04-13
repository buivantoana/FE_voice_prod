import React, { useEffect, useState } from "react";
import MaterialVideoView from "./MaterialVideoView";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import { RiCloseCircleFill, RiCloseLine } from "react-icons/ri";
import Author from "../../components/Author";
import Loading from "../../components/Loading";
import {
  getInfo,
  getMyVoices,
  getVoicesFavorite,
  getVoicesOpenAi,
} from "../../service/voice";
import { useCoursesContext } from "../../App";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import MaterialVideoRegenerateController from "./MaterialVideoRegenerateController";
import { useTranslation } from "react-i18next";
import {
  generateVideo,
  generateVideoScript,
} from "../../service/material_video";

type Props = {};

const MaterialVideoController = (props: Props) => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const productId = searchParams.get("product_id");
  const [typeVoice, setTypeVoice] = useState("openai");
  const [openAuthor, setOpenAuthor] = React.useState(false);
  const [openUrlImage, setOpenUrlImage] = React.useState(false);
  const [voicesFavorite, setVoicesFavorite]: any = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voices, setVoices] = useState<any>([]);
  const [voice, setVoice] = useState<any>({});
  const [productName, setProductName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [productUrlOld, setProductUrlOld] = useState(null);
  const [productDesc, setProductDesc] = useState("");
  const [productMyDesc, setProductMyDesc] = useState("");
  const [productTarget, setProductTarget] = useState("");
  const [selectedVideolength, setSelectedVideolength] = useState("50");
  const [selectedVideoSize, setSelectedVideoSize] = useState("9:16");
  const [selectedVideoLanguage, setSelectedVideoLanguage] = useState("English");
  const [productImage, setProductImage]: any = useState([]);
  const [generateResult, setGenerateResult]: any = useState({});
  const [productVideo, setProductVideo]: any = useState([]);
  const [avatarVideo, setAvatarVideo]: any = useState("");
  const [productVideoUrl, setProductVideoUrl]: any = useState([]);
  const context: any = useCoursesContext();
  const theme: any = useTheme();
  const [myVoices, setMyVoices] = useState<any>([]);
  const [selectedUrls, setSelectedUrls]: any = useState([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const [fileEndCard, setFileEndCard] = useState<any>(null);
  const [fileWaterMark, setFileWaterMark] = useState<any>(null);
  const [formGenerate, setFormGenerate] = useState<any>(null);
  const [formGenerateScrip, setFormGenerateScrip] = useState<any>(null);
  const [progress, setProgress] = useState<number[]>([]);
  const [loadingScrip1, setLoadingScrip1] = React.useState(false);
  const [scrip, setScrip] = React.useState({});
  const navigate: any = useNavigate();
  const { t } = useTranslation();
  const handleCheckboxChange = (url: string) => {
    setSelectedUrls((prev: any) =>
      prev.includes(url)
        ? prev.filter((item: any) => item !== url)
        : [...prev, url]
    );
  };
  const handleClickOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };
  let user = localStorage.getItem("user");
  console.log(user);
  useEffect(() => {
    if (productId) {
      if (user) {
        (async () => {
          let infor = await getInfo({ user_id: JSON.parse(user).phone });
          if (infor.code == 0) {
            (async () => {
              try {
                let data = await fetch(
                  "https://dev.ttsopenai.zeezoo.mobi/product/get/info",
                  {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                      Authorization:
                        "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
                    },
                    body: JSON.stringify({
                      user_id: JSON.parse(user).phone,
                      product_id: productId,
                    }),
                  }
                );
                let result = await data.json();
                if (Object.keys(result.product).length > 0) {
                  if (result.product.summary) {
                    setProductDesc(result.product.summary);
                  }
                  if (result.product.product_url) {
                    setProductUrlOld(result.product.product_url);
                    setProductUrl(result.product.product_url);
                  }
                  if (result.product.title) {
                    setProductName(result.product.title);
                  }
                  if (result.product.images.length > 0) {
                    console.log(result.product.images);
                    console.log(result.product.videos);
                    setOpenUrlImage(true);
                    setProductImage([
                      ...JSON.parse(result.product.images[0]).filter(
                        (item: any) => item != ""
                      ),
                    ]);
                    setProductVideoUrl(
                      JSON.parse(result.product.videos[0]).filter(
                        (item: any) => item != ""
                      )
                    );
                  }
                } else {
                  toast.warning("Error");
                }
              } catch (error) {
                console.log(error);
              }
            })();
          } else {
            toast.warning("Bạn cần đăng nhập để sử dụng tính năng.");
            localStorage.setItem("material_video", productId);
            setTimeout(() => {
              navigate("/signin");
            }, 500);
          }
        })();
      } else {
        toast.warning("Bạn cần đăng nhập để sử dụng tính năng.");
        localStorage.setItem("material_video", productId);
        setTimeout(() => {
          navigate("/signin");
        }, 500);
      }
    }
  }, [productId, user]);
  console.log(productImage);
  useEffect(() => {
    loadVoicesOpenai();
    (async () => {
      try {
        let data = await fetch("https://dev.ttsopenai.zeezoo.mobi/product/samples", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
          },
        });
        let result = await data.json();
        if (result.videos && result.videos.length > 0) {
          setAvatarVideo(result.videos[0].id);
          setProductVideo(result.videos);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(productVideo);
  useEffect(() => {
    loadMyVoices();
    loadVoicesFavorite();
    if (Object.keys(context.state.user).length == 0) {
      setVoicesFavorite([]);
      setMyVoices([]);
    }
  }, [context.state.user]);
  useEffect(() => {
    if (myVoices.length > 0) {
      setVoicesFavorite([
        ...voicesFavorite,
        ...myVoices
          .filter((item: any) => item.favorite == true)
          .map((item: any) => item.voice_id),
      ]);
    }
  }, [myVoices]);
  const loadVoicesFavorite = async () => {
    setLoadingVoices(true);
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        let data = await getVoicesFavorite({
          user_id: context.state.user.user_id,
        });
        console.log("AAAA data", data);
        if (data.voices && data.voices.length > 0) {
          data.voices = data.voices.filter(
            (item: any) => item.favorite == true
          );
          console.log(data.voices.map((item: any) => item.id));
          setVoicesFavorite(data.voices.map((item: any) => item.id));
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  const loadMyVoices = async (check_type = false) => {
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        let data = await getMyVoices(context.state.user.user_id);
        console.log("AAAA data", data);
        if (data.my_voices && data.my_voices.length > 0) {
          setMyVoices(
            data.my_voices.map((item: any) => {
              return {
                ...item,
                type: "my_voice",
                id: item.voice_id,
                name: item.voice_name,
                description: item.voice_desc,
                voice: item.voice_name,
              };
            })
          );
        }
        if (check_type) {
          setTypeVoice("my_voices");
          if (data.my_voices.length == 0) {
            setMyVoices([]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(voicesFavorite);
  console.log(voices);
  const loadVoicesOpenai = async () => {
    setLoadingVoices(true);
    try {
      let data = await getVoicesOpenAi();
      console.log("AAAA data", data);
      if (data.voices && data.voices.length > 0) {
        if (!(Object.keys(context.state.history).length > 0)) {
          setVoice(data.voices[0]);
        }

        setVoices(data.voices);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  const handleSelectImage = async () => {
    try {
      if (selectedUrls.length > 0) {
        const promises = selectedUrls.map((url: any) =>
          handleAddLinkAsFile(url)
        );
        await Promise.all(promises); // Chờ tất cả ảnh được tải
        setOpenUrlImage(false);
      }
    } catch (error) {
      console.log("Error in handleSelectImage:", error);
    }
  };
  console.log("Proceess", progress);
  const handleAddLinkAsFile = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      // Lấy tên file từ link hoặc đặt tên mặc định
      const fileName = url.split("/").pop() || "downloaded_file";
      const fileType = blob.type;

      // Tạo file từ blob
      const file = new File([blob], fileName, { type: fileType });

      // Cập nhật danh sách file và phần trăm tải về
      setFileList((prev) => {
        const updatedList = [...prev, file];
        setProgress((progress) => [...progress, 0]);
        simulateUpload(updatedList.length - 1); // Đảm bảo chỉ số chính xác
        return updatedList;
      });
    } catch (error) {
      console.error("Tải ảnh thất bại:", error);
    }
  };

  // Giả lập tiến trình upload
  const simulateUpload = (index: number) => {
    let uploadProgress = 0;
    const interval = setInterval(() => {
      uploadProgress += Math.random() * 10;
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = Math.min(100, uploadProgress);
        return newProgress;
      });
      if (uploadProgress >= 100) clearInterval(interval);
    }, 500);
  };
  const generate = async () => {
    if (context.state.user.credits > 100000) {
      setLoadingScrip1(true);
      setLoading(true);
      try {
        let formDataGenerate: any = new FormData();
        formDataGenerate.append("product_id", productId);
        formDataGenerate.append("product_name", productName);
        formDataGenerate.append("product_desc", productDesc);
        formDataGenerate.append("my_script", productMyDesc);
        formDataGenerate.append("language", selectedVideoLanguage);
        formDataGenerate.append("target_audience", productTarget);
        setFormGenerateScrip(formDataGenerate);
        const formData: any = new FormData();
        formData.append("video_length", selectedVideolength);
        formData.append("video_size", selectedVideoSize);
        formData.append("voice_id", voice.id);
        formData.append("logo_position", "start");
        formData.append("voice_type", voice.type);
        formData.append("user_id", context.state.user.user_id);
        if (fileWaterMark) {
          formData.append("watermark", fileWaterMark);
        }
        if (fileEndCard) {
          formData.append("logo_or_video", fileEndCard);
        }
        if(avatarVideo){
          formData.append("video_kol", avatarVideo);
        }
        const imageFiles = fileList.filter((file) =>
          file.type.startsWith("image/")
        );
        const videoFiles = fileList.filter((file) =>
          file.type.startsWith("video/")
        );

        // Thêm file ảnh vào formData với key `listImage`
        imageFiles.forEach((file) => {
          formData.append("list_images", file);
        });

        // Thêm file video vào formData với key `listVideo`
        videoFiles.forEach((file) => {
          formData.append("list_videos", file);
        });

        let result = await generateVideo(formDataGenerate);
        console.log(result);
        if (Object.keys(result).length > 0) {
          setScrip(result);
          const cleanedData = processData(result);
          console.log(cleanedData);
          setFormGenerate(formData);
          formData.append("scrip", result.scrip_1);
          setLoading(false);
          setGenerateResult(cleanedData);
          let video = await generateVideoScript(formData);
          console.log("video", video);
          if (video && video.video) {
            setVideoUrl(`data:video/mp4;base64,${video.video}`);
            let infor = await getInfo({ user_id: context.state.user.phone });
            if (infor.code == 0) {
              context.dispatch({
                type: "LOGIN",
                payload: {
                  ...context.state,
                  user: { ...context.state.user, ...infor.data },
                },
              });
            }
          }

          if (video && video.detail.length > 0) {
            console.log(video.detail);
            const messages = video.detail.map((error: any) => {
              const loc = error.loc;
              let message = `Error in: ${loc.join(" -> ")}`;
              return message;
            });
            console.log(messages);
            for (let i = 0; i < messages.length; i++) {
              toast.warning(messages[i]);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      setLoadingScrip1(false);
    } else {
      toast.warning("Số dư tín dụng không đủ.");
    }
  };
  return (
    <>
      {loading && <Loading />}
      {!(Object.keys(generateResult).length > 0) && (
        <MaterialVideoView
          handleClickOpenAuthor={handleClickOpenAuthor}
          productName={productName}
          productUrl={productUrl}
          productDesc={productDesc}
          setProductUrl={setProductUrl}
          fileList={fileList}
          setFileList={setFileList}
          progress={progress}
          setProgress={setProgress}
          simulateUpload={simulateUpload}
          handleAddLinkAsFile={handleAddLinkAsFile}
          productUrlOld={productUrlOld}
          setOpenUrlImage={setOpenUrlImage}
          productVideo={productVideo}
          generate={generate}
          setProductMyDesc={setProductMyDesc}
          productMyDesc={productMyDesc}
          setProductTarget={setProductTarget}
          productTarget={productTarget}
          setSelectedVideolength={setSelectedVideolength}
          selectedVideolength={selectedVideolength}
          setSelectedVideoSize={setSelectedVideoSize}
          selectedVideoSize={selectedVideoSize}
          setSelectedVideoLanguage={setSelectedVideoLanguage}
          selectedVideoLanguage={selectedVideoLanguage}
          fileWaterMark={fileWaterMark}
          setFileWaterMark={setFileWaterMark}
          fileEndCard={fileEndCard}
          setFileEndCard={setFileEndCard}
          avatarVideo={avatarVideo}
          setAvatarVideo={setAvatarVideo}
          productId={productId}
          setProductDesc={setProductDesc}
          setProductName={setProductName}
        />
      )}
      {Object.keys(generateResult).length > 0 && (
        <MaterialVideoRegenerateController
          generateResult={generateResult}
          desc={productDesc}
          listFile={fileList}
          name={productName}
          videoUrl={videoUrl}
          loadingScrip1={loadingScrip1}
          formGenerate={formGenerate}
          scrip={scrip}
          formGenerateScrip={formGenerateScrip}
          setGenerateResult={setGenerateResult}
          setLoadingScrip1={setLoadingScrip1}
          setVideoUrl={setVideoUrl}
          voice_old={voice}
          progress_child={progress}
          selectedVideoSize={selectedVideoSize}
        />
      )}

      <Dialog
        fullWidth
        maxWidth='xl' // Đặt maxWidth lớn nhất để có thể sử dụng toàn bộ chiều rộng
        PaperProps={{
          sx: {
            width: "100%", // Chiều rộng 100%
            maxWidth: "100%",
            ".css-kw13he-MuiDialogContent-root": {
              padding: { xs: "0" },
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
        <DialogContent>
          {!loadingVoices ? (
            <Author
              setVoice={setVoice}
              voice={voice}
              data={voices}
              type={"story"}
              voicesFavorite={voicesFavorite}
              setVoicesFavorite={setVoicesFavorite}
              myVoices={myVoices}
              typeVoice={typeVoice}
              setTypeVoice={setTypeVoice}
              is_action={true}
            />
          ) : (
            <Loading height={"100%"} />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAuthor}
            variant='contained'
            sx={{ background: theme.palette.active.main, borderRadius: "8px" }}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        sx={{ cursor: "pointer" }}
        maxWidth={"md"}
        fullWidth={true}
        open={openUrlImage}
        onClose={() => setOpenUrlImage(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <Box
            width={"100%"}
            display={"flex"}
            onClick={() => setOpenUrlImage(false)}
            justifyContent={"end"}>
            <RiCloseCircleFill size={25} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box textAlign={"center"} mb={"20px"}>
            <Typography fontWeight={"bold"} fontSize={"1.6rem"}>
              {t("select_image")}
            </Typography>
            <Typography fontSize={".8rem"} textAlign={"center"}>
              {t("select_image_desc")}
            </Typography>
          </Box>

          <Box display={"flex"} flexWrap={"wrap"} gap={"25px"}>
            {productImage.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  position='relative'
                  display='flex'
                  flexDirection='column'
                  justifyContent={"center"}
                  width={"150px"}
                  height={"150px"}
                  bgcolor={"rgba(0,0,0,.1)"}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                  alignItems='center'>
                  <img
                    src={item}
                    width={"100px"}
                    height={"100px"}
                    style={{ borderRadius: "20px", objectFit: "contain" }}
                    alt=''
                  />
                  <Checkbox
                    checked={selectedUrls.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      color: "black",
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                  />
                </Box>
              );
            })}
            {productVideoUrl.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  position='relative'
                  display='flex'
                  flexDirection='column'
                  justifyContent={"center"}
                  width={"150px"}
                  height={"150px"}
                  bgcolor={"rgba(0,0,0,.1)"}
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                  alignItems='center'>
                  <video
                    src={item}
                    width='100'
                    height='100'
                    style={{ borderRadius: "20px", objectFit: "contain" }}
                    controls
                  />
                  <Checkbox
                    checked={selectedUrls.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      color: "black",
                      "&.Mui-checked": {
                        color: "green",
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => {
              if (selectedUrls.length == productImage.length) {
                setSelectedUrls([]);
              } else {
                setSelectedUrls(productImage);
              }
            }}
            sx={{
              background: theme.palette.active.main,
              borderRadius: "8px",
            }}>
            {selectedUrls.length == productImage.length
              ? t("clear_all")
              : t("select_all")}
          </Button>
          <Button
            onClick={handleSelectImage}
            disabled={!selectedUrls.length > 0}
            variant='contained'
            sx={{ background: theme.palette.active.main, borderRadius: "8px" }}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MaterialVideoController;
const processData = (data: any) => {
  const result: any = {};

  Object.entries(data).forEach(([key, value]) => {
    // Loại bỏ || cuối cùng (nếu có)
    const cleanedValue = value.endsWith("||") ? value.slice(0, -2) : value;

    // Loại bỏ dấu chấm không cần thiết và tách thành các câu
    const sentences = cleanedValue
      .split("||") // Tách dựa trên dấu ||
      .filter((sentence) => sentence.trim() !== "" && sentence.trim() !== ".") // Loại bỏ câu rỗng hoặc chỉ chứa dấu chấm
      .map((sentence, index) => `${index + 1}. ${sentence.trim()}`); // Đánh số

    result[key] = sentences;
  });

  return result;
};
