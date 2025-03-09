import { useEffect, useState } from "react";
import HistoryView from "./HistoryView";
import { deleteVoiceApi, getHistoryVoices } from "../../service/voice";
import { useCoursesContext } from "../../App";
import Loading from "../../components/Loading";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";

const HistoryController = () => {
  const [voices, setVoices] = useState([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idVoice, setIdVoice] = useState(null);
  const context: any = useCoursesContext();
  useEffect(() => {
    if (Object.keys(context.state.user).length > 0) loadVoices();
  }, [context]);
  const loadVoices = async () => {
    setLoadingVoices(true);
    try {
      let data = await getHistoryVoices({
        user_id: context.state.user && context.state.user.user_id,
      });
      console.log("AAAA data", data);
      if (data.code == 0) {
        if (data.data && data.data.length > 0) {
          setVoices(data.data.reverse());
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingVoices(false);
  };
  const deleteVoice = async (voice_id: any) => {
    setIdVoice(voice_id);
    handleClickOpen();
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteVoice = async () => {
    setLoading(true);
    try {
      let data = await deleteVoiceApi({ voice_id: idVoice });
      if (data.code == 0) {
        loadVoices();
        toast.success("Xóa thành công");
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
    setLoading(false);
  };
  return (
    <>
      {loading && <Loading />}
      <HistoryView
        voices={voices}
        loadingVoices={loadingVoices}
        deleteVoice={deleteVoice}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{"Xóa phát âm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Bạn có chắc muốn xóa không? Bạn sẽ không thể khôi phục lại.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDeleteVoice} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HistoryController;
