import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DescriptionIcon from "@mui/icons-material/Description";
import HelpIcon from "@mui/icons-material/Help";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import vn from "../images/vn.png";
import us from "../images/us.png";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  styled,
  Tooltip,
  Typography,
  useTheme,
  Hidden,
  Popover,
  Modal,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  RiContactsLine,
  RiFileHistoryLine,
  RiFileList3Line,
  RiHistoryLine,
  RiMenuFill,
  RiNotification2Line,
  RiPriceTag2Line,
  RiShieldKeyholeLine,
} from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import logo from "../images/loading-lines-6747317-5601928.webp";

import profile from "../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import { useCoursesContext } from "../App";
import { useTranslation } from "react-i18next";
const Header = () => {
  const theme: any = useTheme();
  const context: any = useCoursesContext();
  const [isOpen, setIsOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [user, setUser] = useState(null);
  const { t, i18n } = useTranslation();

  // Hàm đổi ngôn ngữ

  const toggleDrawer = (open: any) => () => {
    setIsOpen(open);
  };
  const [isMenu, setIsMenu] = useState(false);

  const toggleDrawerMenu = (Menu: any) => () => {
    setIsMenu(Menu);
  };
  useEffect(() => {
    if (Object.keys(context.state.user).length > 0) {
      setUser(context.state.user);
    }
  }, [context.state.user]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
    handleClose();
  };
  console.log(i18n);
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        height: "65px",
        background: "rgb(252 253 254)",
        zIndex: "100",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: { xs: "90%", md: "84%" },
          px: { xs: "5%", md: "8%" },
          py: "5px",
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Hidden mdUp>
            <Box onClick={toggleDrawerMenu(true)}>
              <RiMenuFill />
            </Box>
          </Hidden>
          <Box>
            <Link to={"/"}>
              <img src={logo} width={50} />
            </Link>
          </Box>
          <Hidden mdDown>
            <Box>
              <Link to={"/"}>
                <Typography fontSize={"1.25rem"}>
                  Text To Speech OpenAI
                </Typography>
              </Link>
            </Box>
          </Hidden>
        </Box>
        <Hidden mdDown>
          <Box
            border={"1px solid grey"}
            padding={"0 20px"}
            borderRadius={"30px"}
            sx={{ cursor: "pointer" }}>
            <Stack direction={"row"} gap={"20px"}>
              <NavLink to='/'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    color={"grey_500.main"}
                    fontWeight={"500"}>
                    {t("vocalize")}
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/material-video'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    {t("materials_to_video")}
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/translation'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    {t("translate")}
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/history'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    {t("history")}
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/pricing-plans'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    {t("pricing_plans")}
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/privacy'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    {t("privacy_policy")}
                  </Typography>
                </Box>
              </NavLink>
              <NavLink to='/terms'>
                <Box padding={"9px 0"}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    {t("terms")}
                  </Typography>
                </Box>
              </NavLink>
              <Box padding={"9px 0"} onClick={()=>setOpenContact(true)}>
                  <Typography
                    fontSize={".9rem"}
                    fontWeight={"500"}
                    color={"grey_500.main"}>
                    {t("contact")}
                  </Typography>
                </Box>
            </Stack>
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box>
            <Typography fontSize={{ xs: "1rem", lg: "1.25rem" }}>
              Text To Speech OpenAI
            </Typography>
          </Box>
        </Hidden>
        {/* <Box
          padding={"3px 5px"}
          borderRadius={"10px"}
          bgcolor={"rgb(225 239 254)"}>
          <Typography fontWeight={"500"}>
            {t("available_credit")}:
            {Object.keys(context.state.user).length > 0
              ? context.state.user.credits
              : 0}
          </Typography>
        </Box> */}
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"40px"}
          sx={{ cursor: "pointer" }}>
          <Box>
            <Box aria-describedby={id} onClick={handleClick}>
              {(i18n.language === "vi" || i18n.language === "vi-VN") && (
                <img
                  src={vn}
                  width={25}
                  height={25}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  alt=''
                />
              )}
              {(i18n.language === "us" || i18n.language === "en-US"|| i18n.language === "en") && (
                <img
                  src={us}
                  width={25}
                  height={25}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                  alt=''
                />
              )}
            </Box>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}>
              <Box
                sx={{ cursor: "pointer" }}
                display={"flex"}
                flexDirection={"column"}
                gap={"8px"}>
                <Box
                  display={"flex"}
                  onClick={() => changeLanguage("vi")}
                  alignItems={"center"}
                  gap={"15px"}>
                  <img
                    src={vn}
                    width={30}
                    height={20}
                    style={{ borderRadius: "3px", objectFit: "cover" }}
                    alt=''
                  />
                  <Typography>Việt Nam </Typography>
                </Box>
                <Box
                  display={"flex"}
                  onClick={() => changeLanguage("us")}
                  alignItems={"center"}
                  gap={"15px"}>
                  <img
                    src={us}
                    width={30}
                    height={20}
                    style={{ borderRadius: "3px", objectFit: "cover" }}
                    alt=''
                  />
                  <Typography>English</Typography>
                </Box>
              </Box>
            </Popover>
          </Box>
          {user && Object.keys(user).length > 0 ? (
            <Box
              onClick={toggleDrawer(true)}
              display={"flex"}
              gap={"20px"}
              alignItems={"center"}>
              {/* <RiNotification2Line size={20} /> */}
              <img
                src={profile}
                style={{ borderRadius: "50%" }}
                width={50}
                alt=''
              />
            </Box>
          ) : (
            <Box>
              <Link to={"/signin"}>
                <Button
                  variant='contained'
                  sx={{
                    background: theme.palette.active.main,
                    fontSize: { xs: "10px", md: "15px" },
                    minWidth: { xs: "87px", md: "64px" },
                    padding: { xs: "6px 8px", md: "6px 16px" },
                  }}
                  endIcon={
                    <ArrowForwardIcon
                      sx={{ fontSize: { xs: "15px !important", md: "25px" } }}
                    />
                  }>
                  {t("sign_up")}
                </Button>
              </Link>
            </Box>
          )}
        </Box>

        <Drawer
          anchor='right' // Đảm bảo anchor là "right"
          open={isOpen}
          PaperProps={{
            sx: {
              width: { xs: "92vw", md: "400px", lg: "400px" }, // Chiều rộng toàn màn hình
              height: "100vh", // Chiều cao toàn màn hình
            },
          }}
          onClose={toggleDrawer(false)}>
          <Box sx={{ p: 2, cursor: "pointer" }} role='presentation'>
            <Box display='flex' justifyContent='end' alignItems='center'>
              <IconButton onClick={toggleDrawer(false)}>
                <HighlightOffIcon sx={{ fontSize: "35px" }} />
              </IconButton>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"8px"}
              flexDirection={"column"}>
              <img
                src={profile}
                style={{ borderRadius: "50%" }}
                width={100}
                alt=''
              />
              <Typography variant='h4' fontWeight={"500"}>
                {context.state.user &&
                  Object.keys(context.state.user).length > 0 &&
                  context.state.user.name}
              </Typography>
              <Typography color='grey_500.main'>
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
              <Box
                padding={"2px 8px"}
                borderRadius={"25px"}
                bgcolor={"#fdf6b2"}>
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
                borderRadius={"10px"}
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
            <Link onClick={toggleDrawer(false)} to={"/buy-credits"}>
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
                  <Typography>{t("buy_credit")}</Typography>
                </Box>
              </Box>
            </Link>
            <Link onClick={toggleDrawer(false)} to={"/payment-history"}>
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
            {/* <Link onClick={toggleDrawer(false)} to={"/profile"}>
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
              onClick={() => {
                setIsOpen(false);
                localStorage.removeItem("user");
                localStorage.removeItem("access_token");
                setUser(null);
                context.dispatch({
                  type: "LOGIN",
                  payload: {
                    ...context.state,
                    user: {},
                  },
                });
              }}
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
                <LogoutIcon />
                <Typography>{t("sign_out")}</Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>
        <Drawer
          anchor='left' // Đảm bảo anchor là "right"
          open={isMenu}
          PaperProps={{
            sx: {
              width: { xs: "92vw" }, // Chiều rộng toàn màn hình
              height: "100vh", // Chiều cao toàn màn hình
            },
          }}
          onClose={toggleDrawerMenu(false)}>
          <Box sx={{ p: 2, cursor: "pointer" }} role='presentation'>
            <Box display='flex' justifyContent='end' alignItems='center'>
              <IconButton onClick={toggleDrawerMenu(false)}>
                <HighlightOffIcon sx={{ fontSize: "35px" }} />
              </IconButton>
            </Box>
            <Box>
              <Typography fontWeight={"500"} fontSize={"1.2rem"}>
                {t("goto")}
              </Typography>
            </Box>
            <Link onClick={toggleDrawerMenu(false)} to={"/"}>
              <Box
                mt={"10px"}
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
                  <Typography> {t("vocalize")}</Typography>
                </Box>
              </Box>
            </Link>
            <Link onClick={toggleDrawerMenu(false)} to={"/history"}>
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
                  <RiHistoryLine />
                  <Typography> {t("history")}</Typography>
                </Box>
              </Box>
            </Link>
            <Link onClick={toggleDrawerMenu(false)} to={"/pricing-plans"}>
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
                  <RiPriceTag2Line />
                  <Typography> {t("pricing_plans")}</Typography>
                </Box>
              </Box>
            </Link>
            <Link onClick={toggleDrawerMenu(false)} to={"/privacy"}>
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
                  <RiShieldKeyholeLine />
                  <Typography> {t("privacy_policy")}</Typography>
                </Box>
              </Box>
            </Link>
            <Link onClick={toggleDrawerMenu(false)} to={"/terms"}>
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
                  <RiFileList3Line />
                  <Typography> {t("terms")}</Typography>
                </Box>
              </Box>
            </Link>
            <Box
                mt={"20px"}
                border={"1px solid #dddddd"}
                borderRadius={"10px"}
                onClick={()=>setOpenContact(true)}
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
                <RiContactsLine />
                  <Typography> {t("contact")}</Typography>
                </Box>
              </Box>
          </Box>
        </Drawer>
        <ModalContact openContact={openContact} handleCloseContact={()=>setOpenContact(false)}/>
      </Box>
    </Box>
  );
};

export default Header;
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:250,md:400},
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function ModalContact({openContact,handleCloseContact}:any) {
  const { t } = useTranslation();
  const theme: any = useTheme();
  return (
    <div>
      <Modal
        open={openContact}
        onClose={handleCloseContact}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" >
          {t("contact_us")}: <b>ai@gmv.vn</b>
          </Typography>
          <Box mt={"8px"} display={"flex"} justifyContent={"end"}>

          <Button onClick={handleCloseContact} sx={{ background: theme.palette.active.main,color:"white"}}>{t("close")}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
