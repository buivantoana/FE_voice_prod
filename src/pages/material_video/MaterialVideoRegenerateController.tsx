import React, { useEffect, useState } from "react";
import MaterialVideoRegenerateView from "./MaterialVideoRegenerateView";
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
import {
  generateVideo,
  generateVideoScript,
} from "../../service/material_video";

type Props = {
  generateResult: any;
  desc: any;
  listFile: any;
  name: any;
  videoUrl: any;
  loadingScrip1: any;
  formGenerate: any;
  scrip: any;
  formGenerateScrip: any;
  setLoadingScrip1: any;
  setGenerateResult: any;
  setVideoUrl: any;
  voice_old: any;
  progress_child: any;
  selectedVideoSize:any;
};

const MaterialVideoRegenerateController = ({
  generateResult,
  desc,
  listFile,
  name,
  videoUrl,
  loadingScrip1,
  formGenerate,
  scrip,
  formGenerateScrip,
  setGenerateResult,
  setLoadingScrip1,
  setVideoUrl,
  voice_old,
  progress_child,
  selectedVideoSize
}: Props) => {
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
  const [productUrlOld, setProductUrlOld] = useState(null);
  const [productNameAndDescOld, setProductNameAndDescOld]: any = useState({});
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage]: any = useState([]);
  const [productVideo, setProductVideo]: any = useState([]);
  const context: any = useCoursesContext();
  const theme: any = useTheme();
  const [myVoices, setMyVoices] = useState<any>([]);
  const [selectedUrls, setSelectedUrls]: any = useState([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [loadingScrip2, setLoadingScrip2] = React.useState(false);
  const [loadingScrip3, setLoadingScrip3] = React.useState(false);
  const [videoUrl2, setVideoUrl2] = useState("");
  const [videoUrl3, setVideoUrl3] = useState("");
  const [resize, setResize] = useState("");
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
  useEffect(() => {
    let boby: any = {};
    setProgress(progress_child);
    setResize(selectedVideoSize)
    if (!productDesc) {
      boby.productDesc = desc;
      setProductDesc(desc);
    }
    if (!productName) {
      boby.productName = name;
      setProductName(name);
    }
    if (fileList.length == 0) {
      setFileList(listFile);
    }
    setTypeVoice(voice_old.type);
    setVoice(voice_old);
    setProductNameAndDescOld(boby);
  }, []);
  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };
  console.log(productNameAndDescOld);
  useEffect(() => {
    if (productId) {
      (async () => {
        try {
          let data = await fetch(
            "https://dev.ttsopenai.zeezoo.mobi/api/product/get/info",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization:
                  "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
              },
              body: JSON.stringify({
                user_id: "0399524219",
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
                ...JSON.parse(result.product.videos[0]).filter(
                  (item: any) => item != ""
                ),
              ]);
            }
          } else {
            toast.warning("Error");
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [productId]);
  console.log(productImage);
  useEffect(() => {
    loadVoicesOpenai();
    (async () => {
      try {
        let data = await fetch("https://dev.ttsopenai.zeezoo.mobi/api/product/samples", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer dHRzb3BlbmFpeGluY2hhb2NhY2JhbmdtdjEyMzQ1Ng==",
          },
        });
        let result = await data.json();
        if (result.videos && result.videos.length > 0) {
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
        // if (!(Object.keys(context.state.history).length > 0)) {
        //   setVoice(data.voices[0]);
        // }
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
  const generate = async (scrip_check: any) => {
    if (context.state.user.credits > 100000) {
      formGenerate.delete("scrip");
      if (scrip_check == "scrip_2") {
        setLoadingScrip2(true);
        try {
          formGenerate.delete("voice_id");
          formGenerate.delete("video_size");
          formGenerate.delete("voice_type");
          formGenerate.append("voice_id", voice.id);
          formGenerate.append("voice_type", voice.type);
          formGenerate.append("video_size", resize);
          formGenerate.append("scrip", scrip.scrip_2);
          const newFormData = new FormData();
          formGenerate.forEach((value: any, key: any) => {
            if (key !== "list_images") {
              newFormData.append(key, value);
            }
          });
          formGenerate = newFormData;
          const imageFiles = fileList.filter((file: any) =>
            file.type.startsWith("image/")
          );
          const videoFiles = fileList.filter((file: any) =>
            file.type.startsWith("video/")
          );

          // Thêm file ảnh vào formData với key `listImage`
          imageFiles.forEach((file: any) => {
            formGenerate.append("list_images", file);
          });

          // Thêm file video vào formGenerate với key `listVideo`
          videoFiles.forEach((file: any) => {
            formGenerate.append("list_videos", file);
          });
          let video = await generateVideoScript(formGenerate);
          console.log("video", video);
          if (video && video.video) {
            setVideoUrl2(`data:video/mp4;base64,${video.video}`);
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
        } catch (error) {
          console.log(error);
        }

        setLoadingScrip2(false);
      }
      if (scrip_check == "scrip_3") {
        setLoadingScrip3(true);
        try {
          formGenerate.delete("voice_id");
          formGenerate.delete("video_size");
          formGenerate.delete("voice_type");
          formGenerate.append("voice_id", voice.id);
          formGenerate.append("voice_type", voice.type);
          formGenerate.append("video_size", resize);
          formGenerate.append("scrip", scrip.scrip_3);
          const newFormData = new FormData();
          formGenerate.forEach((value: any, key: any) => {
            if (key !== "list_images") {
              newFormData.append(key, value);
            }
          });
          formGenerate = newFormData;
          const imageFiles = fileList.filter((file: any) =>
            file.type.startsWith("image/")
          );
          const videoFiles = fileList.filter((file: any) =>
            file.type.startsWith("video/")
          );

          // Thêm file ảnh vào formData với key `listImage`
          imageFiles.forEach((file: any) => {
            formGenerate.append("list_images", file);
          });

          // Thêm file video vào formGenerate với key `listVideo`
          videoFiles.forEach((file: any) => {
            formGenerate.append("list_videos", file);
          });
          let video = await generateVideoScript(formGenerate);
          console.log("video", video);
          if (video && video.video) {
            setVideoUrl3(`data:video/mp4;base64,${video.video}`);
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
        } catch (error) {
          console.log(error);
        }

        setLoadingScrip3(false);
      }
    } else {
      toast.warning("Số dư tín dụng không đủ.");
    }
  };

  const generateNew = async () => {
    if (context.state.user.credits > 100000) {
      setLoadingScrip1(true);
      setVideoUrl2("");
      setVideoUrl3("");
      try {
        formGenerate.delete("voice_id");
        formGenerate.delete("video_size");
        formGenerate.delete("voice_type");
        formGenerateScrip.delete("product_name");
        formGenerateScrip.delete("product_desc");
        formGenerateScrip.append("product_name", productName);
        formGenerateScrip.append("product_desc", productDesc);
        formGenerate.append("voice_id", voice.id);
        formGenerate.append("voice_type", voice.type);
        formGenerate.append("video_size", resize);
        const newFormData = new FormData();
        formGenerate.forEach((value: any, key: any) => {
          if (key !== "list_images") {
            newFormData.append(key, value);
          }
        });
        formGenerate = newFormData;
        const imageFiles = fileList.filter((file: any) =>
          file.type.startsWith("image/")
        );
        const videoFiles = fileList.filter((file: any) =>
          file.type.startsWith("video/")
        );

        // Thêm file ảnh vào formData với key `listImage`
        imageFiles.forEach((file: any) => {
          formGenerate.append("list_images", file);
        });

        // Thêm file video vào formGenerate với key `listVideo`
        videoFiles.forEach((file: any) => {
          formGenerate.append("list_videos", file);
        });
        if (
          productNameAndDescOld.productName == productName &&
          productNameAndDescOld.productDesc == productDesc
        ) {
          console.log(productName);
          let video = await generateVideoScript(formGenerate);
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
          setLoadingScrip1(false);
        } else {
          setLoading(true);
          console.log("test");
          formGenerate.delete("scrip");
          let result = await generateVideo(formGenerateScrip);
          console.log(result);
          if (Object.keys(result).length > 0) {
            const cleanedData = processData(result);
            console.log(cleanedData);
            formGenerate.append("scrip", result.scrip_1);
            setLoading(false);
            setGenerateResult(cleanedData);
            let video = await generateVideoScript(formGenerate);
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
      <MaterialVideoRegenerateView
        handleClickOpenAuthor={handleClickOpenAuthor}
        productName={productName}
        productUrl={productUrl}
        productDesc={productDesc}
        setProductUrl={setProductUrl}
        setProductDesc={setProductDesc}
        fileList={fileList}
        setFileList={setFileList}
        progress={progress}
        setProgress={setProgress}
        simulateUpload={simulateUpload}
        handleAddLinkAsFile={handleAddLinkAsFile}
        productUrlOld={productUrlOld}
        setOpenUrlImage={setOpenUrlImage}
        productVideo={productVideo}
        generateResult={generateResult}
        videoUrl={videoUrl}
        loadingScrip1={loadingScrip1}
        videoUrl2={videoUrl2}
        loadingScrip2={loadingScrip2}
        videoUrl3={videoUrl3}
        loadingScrip3={loadingScrip3}
        generate={generate}
        generateNew={generateNew}
        setProductName={setProductName}
        resize={resize}
        setResize={setResize}
      />

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
    </>
  );
};

export default MaterialVideoRegenerateController;
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
