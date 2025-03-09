import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { Box, Hidden, styled, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import user from "../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import { useCoursesContext } from "../App";
import { useTranslation } from "react-i18next";

type Props = {};

const LeftProfile = (props: Props) => {
  const context: any = useCoursesContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Hidden mdDown>
      <Box sx={{ width: "33%", p: 2, cursor: "pointer" }}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"8px"}
          flexDirection={"column"}>
          <img src={user} style={{ borderRadius: "50%" }} width={100} alt='' />
          <Typography variant='h4' fontWeight={"500"}>
            {context.state.user &&
              Object.keys(context.state.user).length > 0 &&
              context.state.user.name}
          </Typography>
          <Typography color='grey_500.main'>
            {" "}
            {context.state.user &&
              Object.keys(context.state.user).length > 0 &&
              context.state.user.phone}
          </Typography>
        </Box>
        {/* <Box
          mt={"20px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Box
            gap={"10px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <CheckCircleOutlineIcon />
            <Typography>Kế hoạch hiện tại</Typography>
          </Box>
          <Box padding={"2px 8px"} borderRadius={"25px"} bgcolor={"#fdf6b2"}>
            <Typography fontWeight={"500"}>Miễn phí</Typography>
          </Box>
        </Box> */}
        <Box
          mt={"10px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Box
            gap={"10px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <StarOutlineOutlinedIcon />

            <Typography>{t("available_credit")}</Typography>
          </Box>
          <Box
            padding={"3px 10px"}
            borderRadius={"50%"}
            bgcolor={"rgb(225 239 254)"}>
            <Typography fontWeight={"500"}>
              {Object.keys(context.state.user).length > 0
                ? context.state.user.credits
                : 0}
            </Typography>
          </Box>
        </Box>
        {/* <Box
          mt={"10px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Box
            gap={"10px"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <LockClockOutlinedIcon />

            <Typography>Tín dụng bị khóa</Typography>
            <WhiteTooltip
              title='Chúng tôi khóa tín dụng của bạn để thực hiện công việc bạn yêu cầu. Nếu công việc thất bại hoặc bị hủy, số tín dụng sẽ được trả lại vào tài khoản của bạn.'
              placement='top'>
              <HelpIcon fontSize='small' />
            </WhiteTooltip>
          </Box>
          <Box
            padding={"3px 10px"}
            borderRadius={"50%"}
            bgcolor={"rgb(252 232 243)"}>
            <Typography fontWeight={"500"}>0</Typography>
          </Box>
        </Box> */}
        <Link to={"/buy-credits"}>
          <Box
            mt={"40px"}
            border={"1px solid #dddddd"}
            borderRadius={"10px"}
            p={"10px 15px"}
            sx={{
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
              "&:hover": {
                backgroundColor: "grey_700.main", // Background on hover
                color: "active.main", // Text and icon color on hover
              },
              "&:hover .MuiSvgIcon-root": {
                color: "active.main", // Icon color on hover
              },
            }}
            width={"calc(100%-30px)"}>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <AddShoppingCartIcon />
              <Typography> {t("buy_credit")}</Typography>
            </Box>
          </Box>
        </Link>
        <Link to={"/payment-history"}>
          <Box
            mt={"20px"}
            border={"1px solid #dddddd"}
            borderRadius={"10px"}
            p={"10px 15px"}
            sx={{
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
              "&:hover": {
                backgroundColor: "grey_700.main", // Background on hover
                color: "active.main", // Text and icon color on hover
              },
              "&:hover .MuiSvgIcon-root": {
                color: "active.main", // Icon color on hover
              },
            }}
            width={"calc(100%-30px)"}>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <DescriptionIcon />
              <Typography>{t("payment_history")}</Typography>
            </Box>
          </Box>
        </Link>
        {/* <Link to={"/profile"}>
          <Box
            mt={"20px"}
            border={"1px solid #dddddd"}
            borderRadius={"10px"}
            p={"10px 15px"}
            sx={{
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
              "&:hover": {
                backgroundColor: "grey_700.main", // Background on hover
                color: "active.main", // Text and icon color on hover
              },
              "&:hover .MuiSvgIcon-root": {
                color: "active.main", // Icon color on hover
              },
            }}
            width={"calc(100%-30px)"}>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <ContactMailIcon />
              <Typography> Thông tin tài khoản</Typography>
            </Box>
          </Box>
        </Link> */}
        <Box
          mt={"20px"}
          border={"1px solid #dddddd"}
          borderRadius={"10px"}
          p={"10px 15px"}
          sx={{
            cursor: "pointer",
            transition: "background-color 0.3s, color 0.3s", // Smooth transition for hover
            "&:hover": {
              backgroundColor: "grey_700.main", // Background on hover
              color: "active.main", // Text and icon color on hover
            },
            "&:hover .MuiSvgIcon-root": {
              color: "active.main", // Icon color on hover
            },
          }}
          width={"calc(100%-30px)"}>
          <Box
            display={"flex"}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("access_token");
              context.dispatch({
                type: "LOGIN",
                payload: {
                  ...context.state,
                  user: {},
                },
              });
              setTimeout(() => {
                navigate("/");
              }, 500);
            }}
            alignItems={"center"}
            gap={"10px"}>
            <LogoutIcon />
            <Typography>{t("sign_out")} </Typography>
          </Box>
        </Box>
      </Box>
    </Hidden>
  );
};

export default LeftProfile;
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
