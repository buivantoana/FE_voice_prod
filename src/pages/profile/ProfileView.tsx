import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import {
  Box,
  Button,
  InputAdornment,
  styled,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import user from "../../images/user.png";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { RiPaypalFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import LeftProfile from "../../components/LeftProfile";
type Props = {};

const ProfileView = (props: Props) => {
  const theme: any = useTheme();
  return (
    <Box padding={"2% 10%"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <LeftProfile />
        <Box
          sx={{ position: "relative" }}
          bgcolor={"white"}
          padding={"10px"}
          minHeight={"80vh"}
          border={"1px solid #dddddd"}
          p={"30px"}
          width={{ xs: "100%", md: "100%", lg: "62%" }}>
          <Box borderBottom={"1px solid #dddddd"} pb={"20px"}>
            <Typography variant='h6' fontWeight={"500"}>
              Thay đổi tên tài khoản.
            </Typography>
          </Box>
          <Box mt={"20px"}>
            <TextField
              variant='outlined'
              sx={{
                width: { xs: "291px", md: "500px" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: theme.palette.grey_500.main, // Màu viền khi không có focus
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.grey_500.main, // Màu viền khi hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.active.main, // Màu viền khi focused
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button
                      sx={{
                        borderRadius: "5px",
                        padding: "7px 10px",
                        backgroundColor: theme.palette.active.main, // Màu nền của nút
                        color: "white", // Màu chữ
                        "&:hover": {
                          backgroundColor: theme.palette.active.main, // Màu nền khi hover
                        },
                      }}
                      variant='contained'>
                      Cập nhật
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box borderBottom={"1px solid #dddddd"} pb={"20px"} mt={"20px"}>
            <Typography variant='h6' fontWeight={"500"}>
              Đổi mật khẩu
            </Typography>
          </Box>
          <Box borderBottom={"1px solid #dddddd"} pb={"20px"} mt={"20px"}>
            <Typography variant='h6' fontWeight={"500"}>
              Vùng Nguy hiểm
            </Typography>
          </Box>
          <Box mt={"20px"}>
            <Button
              sx={{
                borderRadius: "5px",
                padding: "7px 10px",
                backgroundColor: "rgb(240 82 82)", // Màu nền của nút
                color: "white", // Màu chữ
                "&:hover": {
                  backgroundColor: "rgb(240 82 82)", // Màu nền khi hover
                },
              }}
              variant='contained'>
              Xóa tài khoản
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileView;
const WhiteTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "white", // Set background to white
    color: "black", // Set text color to black for contrast
    border: "1px solid #ddd", // Optional border
    fontSize: "0.875rem", // Adjust font size if needed
  },
});
