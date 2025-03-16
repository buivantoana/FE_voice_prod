import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import VocalizeView from "./VocalizeView";
import Loading from "../../components/Loading";
import {
  createStoryMaker,
  createVoice,
  getInfo,
  getMyVoices,
  getVoicesFavorite,
  getVoicesOpenAi,
} from "../../service/voice";
import { useCoursesContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddMyVoiceController from "./AddMyVoiceController";

type Props = {};
let arr: any = [];
const VocalizeController = (props: Props) => {
  const [typeVoice, setTypeVoice] = useState("system");
  const [textVoice, setTextVoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [speed, setSpeed] = useState<any>(1);
  const [selectedQuality, setSelectedQuality] = useState("Chất lượng cao");
  const [anchorElQuality, setAnchorElQuality] = useState(null);
  const [base64Voice, setBase64Voice] = useState("");
  const openQuality = Boolean(anchorElQuality);
  const idQuality = openQuality ? "simple-popover" : undefined;
  const [isOpen, setIsOpen] = useState(false);
  const [openAuthor, setOpenAuthor] = React.useState(false);
  const [openAddMyVoice, setOpenAddMyVoice] = React.useState(false);
  const [voicesFavorite, setVoicesFavorite]: any = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voices, setVoices] = useState<any>([]);
  const [voice, setVoice] = useState<any>({});
  const [block, setBlock] = useState<any>([]);
  const [hidden, setHidden] = useState(false);
  const context: any = useCoursesContext();
  const navigate: any = useNavigate();
  const [file, setFile] = useState<any>(null);
  const [tab, setTab] = useState("input_text");
  const [myVoices, setMyVoices] = useState<any>([]);

  const toggleDrawer = (open: any) => () => {
    setIsOpen(open);
  };

  useEffect(() => {
    loadVoicesOpenai();
    if (Object.keys(context.state.history).length > 0) {
      if (context.state.history.content) {
        if (context.state.history.type == "story") {
          setBlock(context.state.history.content);
          arr = context.state.history.content;
          setTab("story_maker");
          setHidden(true);
        } else {
          setTextVoice(context.state.history.content);
          setSpeed(context.state.history.speed);
        }
      }
    }
    if (context.state.tts_text) {
      setTextVoice(context.state.tts_text);
    }
    if (context.state.tts_story) {
      setBlock(context.state.tts_story);
      setTab("story_maker");
      arr = context.state.tts_story;
      setHidden(true);
    }
  }, []);
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
          setVoice(data.voices.filter((item: any) => item.type == "system")[0]);
        }

        setVoices(data.voices);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  const handleClickOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };
  const handleClickOpenAddMyVoice = () => {
    if (
      Object.keys(context.state.user).length > 0 &&
      context.state.user.user_id
    ) {
      setOpenAddMyVoice(true);
    } else {
      toast.warning("Bạn cần đăng nhập để sử dụng tính năng này.");
    }
  };

  const handleCloseAddMyVoice = () => {
    setOpenAddMyVoice(false);
  };
  const handleSelectQuality = (quality: any) => {
    setSelectedQuality(quality);
    handleCloseQuality();
  };

  const handleClickQuality = (event: any) => {
    setAnchorElQuality(event.currentTarget);
  };
  const handleCloseQuality = () => {
    setAnchorElQuality(null);
  };
  const handleCreateVoice = async () => {
    setLoading(true);
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        let data = await createVoice(
          {
            user_id: context.state.user.user_id,
            txt: textVoice,
            speed: speed,
            voice: voice.id,
            voice_type: voice.type,
            voice_name: voice.name,
          },
          false
        );
        console.log(data);
        if (data.code == 0) {
          setBase64Voice(data.voice_base64);
          setIsOpen(true);
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
        } else {
          toast.warning(data.msg);
        }
      } else {
        localStorage.setItem("tts_text", textVoice);
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleStoryMaker = async () => {
    setLoading(true);
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        let body = {
          user_id: context.state.user.user_id,
          list_story: block.map((item: any) => {
            return {
              id: item.voice,
              name: item.name,
              text: item.text,
              delay: Number(item.delay),
              voice: voices.filter((ix: any) => ix.id == item.voice)[0]
                ? voices.filter((ix: any) => ix.id == item.voice)[0].gender ==
                  "Male"
                  ? "en_us_male"
                  : "en_us_female"
                : item.voice,
              speed: Number(item.speed),
              voice_type: voices.filter((ix: any) => ix.id == item.voice)[0]
                ? voices.filter((ix: any) => ix.id == item.voice)[0].type
                : "my_voice",
              voice_name: item.title ? item.title : item.voice,
            };
          }),
        };
        console.log(body);
        let data = await createStoryMaker(body);

        if (data.code == 0) {
          setBase64Voice(data.voice_base64);
          setIsOpen(true);
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
        } else {
          toast.warning(data.msg);
        }
      } else {
        localStorage.setItem("tts_story", JSON.stringify(block));
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  console.log("AAA context voice====", myVoices);
  const handleCreateVoiceDocument = async () => {
    setLoading(true);
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        const formData = new FormData();
        formData.append("user_id", context.state.user.user_id); // Thêm user_id
        formData.append("voice", voice.id); // Thêm voice
        formData.append("voice_name", voice.name);
        formData.append("speed", speed); // Thêm speed
        formData.append("file", file);
        formData.append("voice_type", voice.type);
        let data = await createVoice(formData, true);
        if (data.code == 0) {
          setBase64Voice(data.voice_base64);
          setIsOpen(true);
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
        } else {
          toast.warning(data.msg);
        }
      } else {
        toast.warning("Bạn vui lòng đăng nhập để sử dụng.");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}
      <VocalizeView
        textVoice={textVoice}
        setSpeed={setSpeed}
        speed={speed}
        setBlock={setBlock}
        block={block}
        setTextVoice={setTextVoice}
        handleClickQuality={handleClickQuality}
        handleCloseQuality={handleCloseQuality}
        idQuality={idQuality}
        anchorElQuality={anchorElQuality}
        openQuality={openQuality}
        handleSelectQuality={handleSelectQuality}
        selectedQuality={selectedQuality}
        base64Voice={base64Voice}
        handleCloseAuthor={handleCloseAuthor}
        handleClickOpenAuthor={handleClickOpenAuthor}
        openAuthor={openAuthor}
        toggleDrawer={toggleDrawer}
        isOpen={isOpen}
        handleCreateVoice={handleCreateVoice}
        voices={voices}
        voice={voice}
        setVoice={setVoice}
        loadingVoices={loadingVoices}
        handleStoryMaker={handleStoryMaker}
        limit={
          Object.keys(context.state.user).length > 0 &&
          context.state.user.limit_txt
            ? context.state.user.limit_txt
            : 0
        }
        setTab={setTab}
        tab={tab}
        setHidden={setHidden}
        hidden={hidden}
        arr={arr}
        handleCreateVoiceDocument={handleCreateVoiceDocument}
        setFile={setFile}
        file={file}
        voicesFavorite={voicesFavorite}
        setVoicesFavorite={setVoicesFavorite}
        handleClickOpenAddMyVoice={handleClickOpenAddMyVoice}
        myVoices={myVoices}
        loadMyVoices={loadMyVoices}
        setLoading={setLoading}
        setTypeVoice={setTypeVoice}
        typeVoice={typeVoice}
      />
      <AddMyVoiceController
        handleClickOpenAddMyVoice={handleClickOpenAddMyVoice}
        handleCloseAddMyVoice={handleCloseAddMyVoice}
        openAddMyVoice={openAddMyVoice}
        setLoading={setLoading}
        loadMyVoices={loadMyVoices}
      />
    </>
  );
};

export default VocalizeController;
