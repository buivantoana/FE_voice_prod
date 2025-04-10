import React, { useEffect, useState } from "react";
import TranslationView from "./TranslationView";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  useTheme,
} from "@mui/material";
import { RiCloseLine } from "react-icons/ri";
import Author from "../../components/Author";
import Loading from "../../components/Loading";
import { useCoursesContext } from "../../App";
import {
  getMyVoices,
  getVoicesFavorite,
  getVoicesOpenAi,
} from "../../service/voice";

type Props = {};

const TranslationController = (props: Props) => {
  const [typeVoice, setTypeVoice] = useState("openai");
  const [openAuthor, setOpenAuthor] = React.useState(false);
  const [voicesFavorite, setVoicesFavorite]: any = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [voices, setVoices] = useState<any>([]);
  const [voice, setVoice] = useState<any>({});
  const context: any = useCoursesContext();
  const [myVoices, setMyVoices] = useState<any>([]);
  const theme: any = useTheme();
  const handleClickOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };
  let user = localStorage.getItem("user");
  useEffect(() => {
    loadVoicesOpenai();
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
          setVoice(data.voices[0]);
        }

        setVoices(data.voices);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  return (
    <>
      <TranslationView handleClickOpenAuthor={handleClickOpenAuthor} />
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
            sx={{
              background: theme.palette.active.main,
              borderRadius: "8px",
            }}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TranslationController;
