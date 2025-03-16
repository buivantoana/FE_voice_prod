import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  FormControlLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import {
  RiCheckboxBlankFill,
  RiCloseLine,
  RiDeleteBin5Fill,
  RiFileAddLine,
  RiMicFill,
  RiPauseFill,
  RiPlayFill,
  RiStopCircleLine,
} from "react-icons/ri";
import CustomTextField from "../../components/CustomTextField";
import logo from "../../images/loading-lines-6747317-5601928.webp";

type Props = {
  handleClickOpenAddMyVoice: any;
  handleCloseAddMyVoice: any;
  openAddMyVoice: any;
  setLoading: any;
  loadMyVoices: any;
};

const AddMyVoiceView = ({
  handleClickOpenAddMyVoice,
  handleCloseAddMyVoice,
  openAddMyVoice,
  setLoading,
  loadMyVoices,
}: Props) => {
  const theme: any = useTheme();
  const [samples, setSamples]: any = useState([]); // Danh sách bản ghi và file upload
  const [name, setName]: any = useState("");
  const [desc, setDesc]: any = useState("");
  const [checked, setChecked] = useState(true);
  const context: any = useCoursesContext();
  const handleAddMyVoice = async () => {
    setLoading(true);
    try {
      if (
        Object.keys(context.state.user).length > 0 &&
        context.state.user.user_id
      ) {
        const formData: any = new FormData();
        formData.append("user_id", context.state.user.user_id); // Thêm user_id
        formData.append("voice_name", name); // Thêm voice
        formData.append("remove_background", checked); // Thêm speed
        formData.append("des", desc);
        for (let i = 0; i < samples.length; i++) {
          const sample = samples[i];
          let file;

          if (sample.type === "upload") {
            // Nếu là file upload, tạo File từ URL
            file = new File(
              [await fetch(sample.url).then((res) => res.blob())],
              sample.name,
              {
                type: sample.name.split(".").pop(),
              }
            );
          } else if (sample.type === "recording") {
            // Nếu là ghi âm, tạo File từ Blob
            const blob = await fetch(sample.url).then((res) => res.blob());
            file = new File([blob], sample.name, { type: "audio/mp3" });
          }

          // Thêm file vào formData
          if (file) {
            formData.append("list_file", file);
          }
        }

        let result = await addMyVoice(formData);
        if (result.my_voices && result.my_voices.length > 0) {
          handleCloseAddMyVoice();
          loadMyVoices(true);
          setSamples([]);
          setName("");
          setDesc("");
          toast.success("Success");
        } else {
          toast.warning(result.msg);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <Box>
      <Dialog
        fullWidth
        maxWidth='md' // Đặt maxWidth lớn nhất để có thể sử dụng toàn bộ chiều rộng
        PaperProps={{
          sx: {
            width: { xs: "100%", md: "40%" }, // Chiều rộng 100%
            maxWidth: "100%",
            padding: "5px",
            ".css-kw13he-MuiDialogContent-root": {
              padding: { xs: "0", md: "30px" },
            },
            ".css-1m664ff-MuiPaper-root-MuiDialog-paper": {
              padding: "30px",
            },
          },
        }}
        open={openAddMyVoice}
        onClose={handleCloseAddMyVoice}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <Box
          padding={"0 20px"}
          display={"flex"}
          onClick={handleCloseAddMyVoice}
          justifyContent={"space-between"}>
          <Typography variant='h6'>Add Voice</Typography>
          <RiCloseLine size={25} />
        </Box>
        <Box
          padding={"0px 20px"}
          className='hidden-add-voice'
          sx={{ maxHeight: "90vh", overflowY: "scroll" }}>
          <Box
            sx={{
              width: "100%",
              margin: "0 auto",
              ".search-input input": {
                padding: "5px 15px !important",
                width: "100%",
              },
              ".search-input": {
                width: "100%",
              },
            }}>
            <Typography my={"5px"} fontWeight={"500"}>
              Name
            </Typography>
            <TextField
              className='search-input'
              id='demo-helper-text-aligned'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              size='small'
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: "#dddddd", // Màu viền khi không có focus
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent", // Màu viền khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.active.main, // Màu viền khi focused
                  },
                },
                fontSize: "16px",
              }}
            />
          </Box>
          <Box>
            <VoiceAndFileUploader setSamples={setSamples} samples={samples} />
          </Box>
          <Box my={"5px"}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                  color={theme.palette.active.main}
                />
              }
              label='Remove background noise from audio samples'
            />
          </Box>
          <Box
            mt={"5px"}
            sx={{
              ".css-16dlh63-MuiInputBase-root-MuiInput-root": {
                border: "1px solid #dddddd",
              },
            }}>
            <Typography>Description</Typography>
            <TextField
              placeholder='Nhập mô tả...'
              multiline
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              fullWidth
              variant='standard' // Loại bỏ border mặc định
              InputProps={{
                disableUnderline: true, // Bỏ underline của variant="standard"
                sx: {
                  backgroundColor: "rgb(248 250 252)", // Nền trắng
                  borderRadius: 2, // Đặt border-radius nếu cần
                  padding: 2, // Khoảng cách padding
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  minHeight: "35px !important", // Đặt chiều cao tối thiểu nếu cần
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
        <DialogActions>
          <Button
            onClick={handleCloseAddMyVoice}
            variant='contained'
            sx={{ background: "white", color: "black", borderRadius: "8px" }}>
            Cancel
          </Button>

          <Button
            disabled={!name || !samples[0]}
            onClick={handleAddMyVoice}
            variant='contained'
            sx={{ background: theme.palette.active.main, borderRadius: "8px" }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddMyVoiceView;

import { useState, useRef } from "react";
import { useCoursesContext } from "../../App";
import { addMyVoice } from "../../service/voice";
import { toast } from "react-toastify";

const VoiceAndFileUploader = ({ setSamples, samples }: any) => {
  const [isRecording, setIsRecording]: any = useState(false); // Trạng thái ghi âm
  const [showRecord, setshowRecord]: any = useState(false);
  const [recordTime, setRecordTime]: any = useState(0); // Thời gian ghi âm (giây)
  const mediaRecorderRef: any = useRef(null); // Đối tượng MediaRecorder
  const chunksRef: any = useRef([]); // Dữ liệu ghi âm
  const timerRef: any = useRef(null); // Bộ đếm thời gian
  const recordTimeoutRef: any = useRef(null); // Hẹn giờ dừng ghi âm sau 30 giây
  const theme: any = useTheme();
  // Bắt đầu ghi âm
  const startRecording = async () => {
    if (isRecording) return;

    try {
      const stream: any = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder: any = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event: any) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/mp3" });
        const newRecording = {
          id: Date.now(),
          url: URL.createObjectURL(blob),
          name: `Recording-${new Date().toLocaleTimeString()}.mp3`,
          size: (blob.size / 1024).toFixed(2) + " kB",
          type: "recording",
        };

        setSamples((prev: any) => [...prev, newRecording]);
        setRecordTime(0); // Reset thời gian
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordTime(0);

      // Đếm thời gian ghi âm
      timerRef.current = setInterval(() => {
        setRecordTime((prev: any) => prev + 1);
      }, 1000);

      // Tự động dừng sau 30 giây
      recordTimeoutRef.current = setTimeout(() => {
        stopRecording();
      }, 30000);
    } catch (error) {
      console.error("Không thể ghi âm: ", error);
    }
  };

  // Dừng ghi âm
  const stopRecording = () => {
    if (!isRecording || !mediaRecorderRef.current) return;

    setIsRecording(false);
    clearInterval(timerRef.current);
    clearTimeout(recordTimeoutRef.current);

    mediaRecorderRef.current.stop();
    setshowRecord(false);
  };

  // Thêm file từ upload vào danh sách
  const handleFileUpload = (e: any) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file: any) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " kB",
      type: "upload",
    }));

    setSamples((prev: any) => [...prev, ...newFiles]);
  };

  // Xóa sample khỏi danh sách
  const deleteSample = (id: any) => {
    setSamples((prev: any) => prev.filter((sample: any) => sample.id !== id));
  };

  const [playingId, setPlayingId] = useState<string | null>(null); // ID audio đang phát
  const audioRefs: { [key: string]: HTMLAudioElement | null } = {}; // Lưu tham chiếu audio

  const handlePlayPause = (sample: any) => {
    const audio = audioRefs[sample.id];
    if (!audio) return;

    if (playingId === sample.id) {
      // Nếu đang phát, dừng lại
      audio.pause();
      setPlayingId(null);
    } else {
      // Nếu chưa phát, dừng audio khác và phát audio này
      if (playingId) {
        const previousAudio = audioRefs[playingId];
        previousAudio?.pause();
        previousAudio!.currentTime = 0;
      }
      audio.play();
      setPlayingId(sample.id);
    }

    // Khi audio kết thúc, tự động dừng
    audio.onended = () => setPlayingId(null);
  };

  return (
    <Box style={{ maxWidth: "600px", margin: "20px auto" }}>
      {!showRecord ? (
        <Box
          padding={"20px 0"}
          sx={{
            border: "2px dashed #ccc",
            textAlign: "center",
            marginBottom: "20px",
            borderRadius: "8px",
          }}>
          <input
            type='file'
            accept='audio/*,video/*'
            multiple
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id='file-upload'
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
            <RiFileAddLine size={55} color={theme.palette.active.main} />
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Click to upload a file or drag and drop
            </Typography>
          </label>
          <p style={{ margin: "10px 0" }}>
            Audio or Video files, up to 10MB each
          </p>

          <Box sx={{ padding: "5px 25%" }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Box
                  sx={{
                    width: "40%",
                    height: "2px",
                    background: theme.palette.active.main,
                  }}></Box>
                <Typography>OR</Typography>
                <Box
                  sx={{
                    width: "40%",
                    height: "2px",
                    background: theme.palette.active.main,
                  }}></Box>
              </Box>
            </Box>
            <Button
              onClick={() => {
                setshowRecord(true);
              }}
              sx={{
                borderRadius: "8px",
                border: "1px solid #dddddd",
                width: "100%",
                marginTop: "10px",
                color: theme.palette.active.main,
              }}>
              Record Audio
            </Button>
          </Box>

          {/* <Button
          onClick={startRecording}
          disabled={isRecording}
          style={{
            backgroundColor: isRecording ? "#ccc" : "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            cursor: isRecording ? "not-allowed" : "pointer",
          }}>
          {isRecording ? "Recording..." : "Record Audio"}
        </Button>
        {isRecording && (
          <Button
            onClick={stopRecording}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              marginLeft: "10px",
            }}>
            Stop Recording
          </Button>
        )} */}
        </Box>
      ) : (
        <Box
          padding={"20px 0"}
          style={{
            border: "2px dashed #ccc",
            textAlign: "center",
            marginBottom: "20px",
            borderRadius: "8px",
          }}>
          {!isRecording && (
            <Button
              onClick={startRecording}
              disabled={isRecording}
              style={{
                backgroundColor: "transparent",

                border: `2px solid ${theme.palette.active.main}`,
                borderRadius: "50%",
                padding: "20px 20px",
                cursor: "pointer",
              }}>
              <RiMicFill size={35} color={theme.palette.active.main} />
            </Button>
          )}
          {isRecording && (
            <Button
              onClick={stopRecording}
              style={{
                backgroundColor: "transparent",
                border: `2px solid ${theme.palette.active.main}`,
                borderRadius: "50%",
                padding: "20px 20px",
                cursor: "pointer",
              }}>
              <RiCheckboxBlankFill size={35} color={"red"} />
            </Button>
          )}
          <Box>
            <img src={logo} height={"100px"} alt='' />
          </Box>
          <Typography
            style={{
              margin: "10px 0",
              fontSize: "16px",
              fontWeight: "bold",
            }}>
            Recording Time {recordTime}s / 30s
          </Typography>
        </Box>
      )}

      {/* Khu vực ghi âm */}

      <Typography fontWeight={"bold"}>Samples {samples.length} / 25</Typography>
      <ul
        className='hidden-add-voice'
        style={{
          listStyle: "none",
          padding: 0,
          maxHeight: "200px",
          overflowY: "scroll",
        }}>
        {samples.map((sample: any) => (
          <li
            key={sample.id}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
              gap: "15px",
            }}>
            <div style={{ flex: "1" }}>
              <Typography style={{ fontSize: ".9rem" }}>
                {sample.name}{" "}
                <span style={{ marginLeft: "10px", color: "#555" }}>
                  ({sample.size})
                </span>
              </Typography>
            </div>
            {/* Nút phát */}
            <button
              onClick={() => handlePlayPause(sample)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
              }}>
              {playingId === sample.id ? <RiPauseFill /> : <RiPlayFill />}
            </button>

            {/* Audio ẩn */}
            <audio
              ref={(ref) => (audioRefs[sample.id] = ref)}
              src={sample.url}
              preload='auto'
              style={{ display: "none" }} // Ẩn thẻ audio
            ></audio>

            {/* Nút xóa */}
            <button
              onClick={() => deleteSample(sample.id)}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                padding: "5px 10px",
              }}>
              <RiDeleteBin5Fill />
            </button>
          </li>
        ))}
      </ul>
    </Box>
  );
};
