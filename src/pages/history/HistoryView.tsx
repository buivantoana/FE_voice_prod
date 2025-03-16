import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  RiArrowDownLine,
  RiCloseLine,
  RiDownload2Line,
  RiLoopLeftFill,
  RiPlayFill,
  RiVoiceprintFill,
  RiZhihuFill,
} from "react-icons/ri";
import mp3 from "../../images/hello_toan.mp3";

const HistoryView = ({ voices, loadingVoices, deleteVoice }: any) => {
  const theme: any = useTheme();
  const [accordion, setAccordion] = useState(null);
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [openAuthor, setOpenAuthor] = React.useState(false);

  const handleClickOpenAuthor = () => {
    setOpenAuthor(true);
  };

  const handleCloseAuthor = () => {
    setOpenAuthor(false);
  };
  return (
    <Box py={"30px"} px={{ xs: "2%", md: "15%" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        px={{ xs: "15px", md: "100px" }}
        alignItems={"center"}>
        <Typography
          width={"60%"}
          fontSize={{ xs: "1rem", md: "1.2rem" }}
          color='grey_500.main'>
          {t("history_des")}
        </Typography>
        <Button
          startIcon={<DeleteOutlineIcon sx={{ color: "red" }} />}
          sx={{
            borderRadius: "25px",
            padding: "7px 10px",
            backgroundColor: "transparent", // Màu nền của nút
            color: "red", // Màu chữ
            "&:hover": {
              backgroundColor: "transparent", // Màu nền khi hover
            },
          }}
          variant='contained'>
          {t("delete_all")}
        </Button>
      </Box>
      <Box
        mt={"50px"}
        sx={{
          ".css-6n0uv7-MuiTimelineConnector-root": {
            width: "1px",
          },
          ".css-1be8zi3-MuiTypography-root-MuiTimelineContent-root": {
            width: "100%",
            padding: { xs: 0, md: "0" },
          },
          ".css-uxg07t-MuiTimeline-root": {
            padding: { xs: "10px" },
          },
          ".css-4nz2w3": {
            padding: "0px !important",
          },
          ".css-9ntwry": {
            padding: "6px",
          },
        }}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}>
          {loadingVoices ? (
            <Box display={"flex"} justifyContent={"center"} width={"100%"}>
              <CircularProgress color='success' />
            </Box>
          ) : (
            <>
              {voices.length > 0 ? (
                <>
                  {voices.map((item: any, index: any) => {
                    let date = item.created.split("T");
                    let text = "";
                    if (item.voice == "story") {
                      console.log(item.text);
                      JSON.parse(item.text).map(
                        (ix: any) => (text += " " + ix.text)
                      );
                    } else {
                      text = item.text;
                    }
                    return (
                      <TimelineItem sx={{ mt: "20px" }}>
                        {/* <TimelineSeparator
                          sx={{ display: { xs: "none", md: "flex" } }}>
                          <RiZhihuFill
                            style={{
                              background: "rgb(222 247 236)",
                              padding: "6px",
                              borderRadius: "50%",
                            }}
                          />
                          <TimelineConnector sx={{ minHeight: "40px" }} />
                        </TimelineSeparator> */}
                        <TimelineContent>
                          <Box
                            width={{ xs: "95%", md: "100%" }}
                            padding={{ xs: "10px 10px", md: "20px" }}
                            borderRadius={"10px"}
                            border={"1px solid #dddddd"}
                            bgcolor={"white"}>
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              justifyContent={"space-between"}>
                              <Box
                                display={"flex"}
                                flexWrap={"wrap"}
                                gap={"10px"}>
                                {/* <Button
                                  sx={{
                                    borderRadius: "5px",
                                    padding: "2px 0px",
                                    backgroundColor: "rgb(253 232 232)", // Màu nền của nút
                                    color: "rgb(138 44 13)", // Màu chữ
                                    "&:hover": {
                                      backgroundColor: "rgb(253 232 232)", // Màu nền khi hover
                                    },
                                  }}
                                  variant='contained'>
                                  A9042
                                </Button> */}
                                <Button
                                  sx={{
                                    borderRadius: "5px",
                                    padding: "2px 5px",
                                    backgroundColor: "rgb(222 247 236)", // Màu nền của nút
                                    color: "black",
                                    // Màu chữ
                                    "&:hover": {
                                      backgroundColor: "rgb(222 247 236)", // Màu nền khi hover
                                    },
                                    textTransform: "capitalize",
                                  }}
                                  variant='contained'>
                                  {item.voice_name
                                    ? item.voice_name
                                    : item.voice}
                                </Button>
                                <Button
                                  sx={{
                                    borderRadius: "5px",
                                    padding: "2px 5px",
                                    backgroundColor: "rgb(253 246 178)", // Màu nền của nút
                                    color: "rgb(138 44 13)", // Màu chữ
                                    "&:hover": {
                                      backgroundColor: "rgb(253 246 178)", // Màu nền khi hover
                                    },
                                  }}
                                  variant='contained'>
                                  {item.credit} {t("credits")}
                                </Button>
                                {/* <Button
                                  sx={{
                                    borderRadius: "5px",
                                    padding: "2px 5px",
                                    backgroundColor: "rgb(225 239 254)", // Màu nền của nút
                                    color: "black", // Màu chữ
                                    "&:hover": {
                                      backgroundColor: "rgb(225 239 254)", // Màu nền khi hover
                                    },
                                  }}
                                  variant='contained'>
                                  Chất lượng cao
                                </Button> */}
                              </Box>
                              <Box
                                display={"flex"}
                                gap={"10px"}
                                alignItems={"center"}>
                                <Typography color='grey_500.main'>
                                  {date[0]} {date[1]}
                                </Typography>
                                <RiCloseLine
                                  onClick={() => deleteVoice(item.voice_id)}
                                  size={25}
                                  style={{
                                    color: theme.palette.grey_500.main,
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box
                              mt={"20px"}
                              sx={{
                                ".css-16dlh63-MuiInputBase-root-MuiInput-root":
                                  {
                                    border: "1px solid #dddddd",
                                  },
                              }}>
                              <TextField
                                placeholder='Nhập văn bản bạn muốn chuyển đổi thành tiếng nói ở đây...'
                                multiline
                                disabled={true}
                                value={text}
                                onChange={(e) => {}}
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
                            <Box
                              display={"flex"}
                              justifyContent={"center"}
                              my={"5px"}>
                              <RiArrowDownLine
                                size={26}
                                style={{
                                  color: theme.palette.active.main,
                                }}
                              />
                            </Box>
                            <Box
                              bgcolor={"rgb(248 250 252)"}
                              padding={"10px 10px 8px 10px"}
                              border={"1px solid #dddddd"}
                              borderRadius={"10px"}>
                              <Box
                                display={"flex"}
                                gap={"10px"}
                                alignItems={"center"}>
                                <Box width={"100%"}>
                                  <AudioPlayer
                                    width={"100%"}
                                    voice_id={item.voice_id}
                                    content={item.text}
                                    speed={item.speed}
                                    type={item.voice}
                                  />
                                </Box>
                              </Box>
                            </Box>
                            {item.voice == "story" && (
                              <Box
                                mt={"15px"}
                                sx={{
                                  maxHeight:
                                    accordion == index ? "500px" : "50px",
                                  overflow: "hidden",
                                  transition: ".3s",
                                }}>
                                <Box
                                  bgcolor={"rgb(248 250 252)"}
                                  border={"1px solid #dddddd"}
                                  padding={"8px 10px"}
                                  borderRadius={"25px"}>
                                  <Box
                                    onClick={() => setAccordion(index)}
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}>
                                    <Box display={"flex"} gap={"10px"}>
                                      <Box
                                        sx={{
                                          borderRadius: "50%",
                                          border: "2px solid black",
                                          width: "20px",
                                          height: "20px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}>
                                        <MoreHorizIcon />
                                      </Box>
                                      <Typography fontWeight={"500"}>
                                        {t("detail_block")}
                                      </Typography>
                                    </Box>

                                    <KeyboardArrowDownIcon
                                      sx={{
                                        transform:
                                          accordion == index
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                        transition: ".3s",
                                      }}
                                    />
                                  </Box>
                                </Box>
                                <Box>
                                  <EnhancedTable
                                    data={JSON.parse(item.text)}
                                    handleClickOpen={handleClickOpen}
                                  />
                                </Box>
                              </Box>
                            )}
                          </Box>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </>
              ) : (
                <Typography textAlign={"center"} color='grey_500.main'>
                  {t("no_history")}
                </Typography>
              )}
            </>
          )}
        </Timeline>
      </Box>
      <AlertDialogSlide
        handleClickOpen={handleClickOpen}
        open={open}
        handleClose={handleClose}
        handleClickOpenAuthor={handleClickOpenAuthor}
      />

      <Dialog
        maxWidth='lg' // sets a maximum width
        fullWidth
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
          <Author />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HistoryView;
function AudioPlayer({ width, voice_id, content, speed, type }: any) {
  const [mp3, setMp3] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate: any = useNavigate();
  const context: any = useCoursesContext();
  // Function to call API and fetch MP3
  const fetchMp3 = async () => {
    try {
      const data = await getPlayVoice({ voice_id });
      if (data.code === 0) {
        const audioBlob = new Blob(
          [
            new Uint8Array(
              atob(data.voice_base64)
                .split("")
                .map((c) => c.charCodeAt(0))
            ),
          ],
          { type: "audio/mp3" }
        );
        const url = URL.createObjectURL(audioBlob);
        setMp3(url); // Set MP3 URL in state

        // Play audio after URL is set
        // if (audioRef.current) {
        //   audioRef.current.load(); // Reload the audio element with the new source
        //   audioRef.current.play(); // Start playing
        // }
      }
    } catch (error) {
      console.error("Error fetching MP3:", error);
    }
  };

  // Handler for play button
  useEffect(() => {
    if (!mp3) {
      fetchMp3();
    }
  }, [mp3]);

  // Event handler for when playback ends

  return (
    <>
      <Box display={"flex"} width={"100%"} alignItems={"center"}>
        <Box width={"95%"}>
          <audio ref={audioRef} style={{ width: "98%" }} controls>
            {mp3 && <source src={mp3} type='audio/mpeg' />}
            Your browser does not support the audio element.
          </audio>
        </Box>
        <Box
          display={"flex"}
          gap={"10px"}
          sx={{ cursor: "pointer" }}
          alignItems={"center"}>
          <a
            href={mp3}
            download='audio.mp3'
            style={{ display: "block", marginTop: "10px" }}>
            <FileDownloadIcon />
          </a>
          <RiLoopLeftFill
            onClick={() => {
              context.dispatch({
                type: "HISTORY",
                payload: {
                  ...context.state,
                  history: {
                    content:
                      type == "story"
                        ? JSON.parse(content).map(
                            (item: any, index: number) => {
                              return {
                                id: index + 1,
                                name: item.name,
                                text: item.text,
                                delay: item.delay,
                                voice: item.id,
                                speed: item.speed,
                                open: false,
                                title:item.voice_name?item.voice_name:""
                              };
                            }
                          )
                        : content,
                    speed: speed,
                    type,
                    voice_id,
                  },
                },
              });
              navigate(`/`);
            }}
            style={{
              background: "rgb(255 90 31)",
              padding: "4px",
              borderRadius: "50%",
              border: "1px solid #dddddd",
              color: "white",
            }}
          />
        </Box>
      </Box>
    </>
  );
}

import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

interface Data {
  id: number;
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
  protein1: number;
}

function createData(
  id: number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  protein1: number
): Data {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
    protein1,
  };
}

const rows = [createData(1, "Cupcake", 305, 3.7, 67, 4.3, 7)];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,

    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const { t } = useTranslation();
  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: t("block"),
    },
    {
      id: "calories",
      numeric: true,
      disablePadding: false,
      label: t("text"),
    },
    {
      id: "fat",
      numeric: true,
      disablePadding: false,
      label: t("voice"),
    },
    {
      id: "carbs",
      numeric: true,
      disablePadding: false,
      label: t("speed"),
    },
    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: t("duration"),
    },
    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: t("status"),
    },
  ];
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color='inherit'
          variant='subtitle1'
          component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant='h6'
          id='tableTitle'
          component='div'>
          Khối
        </Typography>
      )}
    </Toolbar>
  );
}
function EnhancedTable(props: any) {
  const theme: any = useTheme();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<any>(props.data);
  const { t } = useTranslation();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: any) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box
      sx={{
        mt: "20px",
        width: "100%",
        ".css-1kenmbd-MuiPaper-root": {
          padding: 0,
        },
      }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}>
                    <TableCell
                      onClick={(event) => handleClick(event, row.id)}
                      padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'>
                      {row.name}
                    </TableCell>
                    <TableCell align='center'>{row.text}</TableCell>
                    <TableCell align='center'>
                      {row.voice_name ? row.voice_name : row.id}
                    </TableCell>
                    <TableCell align='center'>{row.speed}</TableCell>
                    <TableCell align='center'>{row.delay}</TableCell>
                    {/* <TableCell align='center'>{row.protein}</TableCell> */}
                    <TableCell align='center'>
                      {" "}
                      <Button
                        sx={{
                          borderRadius: "5px",
                          padding: "2px 5px",
                          backgroundColor: theme.palette.active.main, // Màu nền của nút
                          color: "white", // Màu chữ
                          "&:hover": {
                            backgroundColor: theme.palette.active.main, // Màu nền khi hover
                          },
                        }}
                        variant='contained'>
                        {t("complete")}
                      </Button>
                    </TableCell>
                    {/* <TableCell align='center'>
                      <Box
                        display={"flex"}
                        gap={"5px"}
                        justifyContent={"center"}>
                        <RiPlayFill
                          style={{
                            padding: "4px",
                            borderRadius: "50%",
                            border: "1px solid #dddddd",
                          }}
                        />
                        <RiDownload2Line
                          style={{
                            padding: "4px",
                            borderRadius: "50%",
                            border: "1px solid #dddddd",
                          }}
                        />
                        <RiLoopLeftFill
                          onClick={props.handleClickOpen}
                          style={{
                            background: "rgb(255 90 31)",
                            padding: "4px",
                            borderRadius: "50%",
                            border: "1px solid #dddddd",
                            color: "white",
                          }}
                        />
                      </Box>
                    </TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Số dòng mỗi trang'
        />
      </Paper>
    </Box>
  );
}

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import InputSlider from "../../components/InputSlide";
import Author from "../../components/Author";
import { getPlayVoice } from "../../service/voice";
import { useNavigate } from "react-router-dom";
import { useCoursesContext } from "../../App";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function AlertDialogSlide(props: any) {
  const theme: any = useTheme();
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth='sm' // sets a maximum width
        fullWidth
        onClose={props.handleClose}
        aria-describedby='alert-dialog-slide-description'>
        <Box display={"flex"} justifyContent={"space-between"} pb={"10px"}>
          <Typography variant='h6' fontWeight={"500"}>
            Thử lại khối
          </Typography>
          <RiCloseLine size={20} />
        </Box>
        <DialogContent dividers>
          <Box
            sx={{
              width: "100%",
              margin: "0 auto",
              ".search-input input": {
                padding: "15px 15px !important",
                width: "100%",
              },
              ".search-input": {
                width: "100%",
              },
              mt: "20px",
            }}>
            <Typography my={"5px"} fontWeight={"500"}>
              Tên
            </Typography>
            <TextField
              className='search-input'
              id='demo-helper-text-aligned'
              size='small'
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: "#dddddd", // Màu viền khi không có focus
                  },
                  "&:hover fieldset": {
                    borderColor: "#dddddd", // Màu viền khi hover
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
            mt={"30px"}
            sx={{
              ".css-16dlh63-MuiInputBase-root-MuiInput-root": {
                border: "1px solid #dddddd",
              },
            }}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"end"}>
              <Typography my={"5px"} fontSize={"1rem"} fontWeight={"500"}>
                Đầu vào
              </Typography>
              <Typography fontSize={".9rem"} color='grey_500.main'>
                10/210
              </Typography>
            </Box>
            <TextField
              placeholder='Nhập văn bản bạn muốn chuyển đổi thành tiếng nói ở đây...'
              multiline
              onChange={(e) => {}}
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
                  minHeight: "50px !important", // Đặt chiều cao tối thiểu nếu cần
                  resize: "none", // Bỏ resize của textarea
                  overflow: "auto", // Để có thể cuộn
                  scrollbarWidth: "none", // Ẩn thanh cuộn cho Firefox
                  msOverflowStyle: "none", // Ẩn thanh cuộn cho Internet Explorer và Edge
                  height: "50px !important",
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
          <Box
            mt={"20px"}
            sx={{
              ".css-16dlh63-MuiInputBase-root-MuiInput-root": {
                border: "1px solid #dddddd",
              },
            }}>
            <Box display={"flex"} alignItems={"end"}>
              <Typography
                sx={{ width: "54%" }}
                my={"5px"}
                fontSize={"1rem"}
                fontWeight={"500"}>
                Giọng nói
              </Typography>
              <Typography my={"5px"} fontSize={"1rem"} fontWeight={"500"}>
                Tốc độ
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}>
              <Box width={"49%"}>
                <Box
                  onClick={props.handleClickOpenAuthor}
                  sx={{
                    border: "1px solid #dddddd",
                    p: "5px 20px",
                    borderRadius: "25px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}>
                  <RiVoiceprintFill />
                  <Typography fontWeight={"500"}>Allow</Typography>
                </Box>
              </Box>
              <Box width={"49%"}>
                <Box
                  sx={{
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
                  <InputSlider label={false} />
                </Box>
              </Box>
            </Box>
            <Box
              mt={"30px"}
              border={"1px solid rgb(194 120 3)"}
              padding={"12px"}
              borderRadius={"15px"}
              bgcolor={"rgb(253 253 234)"}>
              <Typography color='rgb(194 120 3)' fontWeight={"500"}>
                Thông tin
              </Typography>
              <Typography color='rgb(194 120 3)'>
                Chúng tôi sẽ trừ 50% tín dụng cho mỗi lần thử lại.
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.handleClose}
            variant='contained'
            sx={{ background: "white", color: "black" }}>
            Hủy bỏ
          </Button>

          <Button
            onClick={props.handleClose}
            variant='contained'
            sx={{ background: theme.palette.active.main }}
            endIcon={<ArrowForwardIcon />}>
            Thử lại
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
