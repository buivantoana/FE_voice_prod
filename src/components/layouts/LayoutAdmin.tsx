import { useTheme } from "@emotion/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
  Box,
  CssBaseline,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import React, { useEffect, useState } from "react";
import {
  RiArticleLine,
  RiBankCardFill,
  RiBardLine,
  RiContactsLine,
  RiFileListFill,
  RiGitBranchFill,
  RiLineChartFill,
  RiLogoutCircleRLine,
  RiMessage3Fill,
  RiOrganizationChart,
  RiPencilFill,
  RiPriceTag3Line,
  RiShuffleFill,
  RiSlideshow4Fill,
  RiTeamFill,
  RiUserAddFill,
  RiBriefcase2Line,
  RiUser3Fill,
  RiSecurePaymentFill,
} from "react-icons/ri";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import profile from "../../images/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg";
import logo from "../../images/loading-lines-6747317-5601928.webp";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "end",
  gap: "20px",
}));

const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#7ef2c2",
    color: "#0d8f50",
    "&:hover": {
      backgroundColor: "#a5f2d2",
    },
  },
}));

const LayoutAdmin = () => {
  const theme: any = useTheme();
  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState({
    overview: true,
    payment: false,
    user: false,
  });
  const [selectedItem, setSelectedItem] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("tab");
  useEffect(() => {
    if (activeTab && activeTab == "overview") {
      setActive({ payment: false, user: false, overview: true });
    }
    if (activeTab && activeTab == "user") {
      setActive({ payment: false, user: true, overview: false });
    }
    if (activeTab && activeTab == "payment") {
      setActive({ payment: true, user: false, overview: false });
    }
  }, [params]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (text: string) => {
    setSelectedItem(text);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [opened, setOpenEnd] = React.useState(false);

  const handleClickOpen = () => {
    setOpenEnd(true);
  };
  const handleClose = () => {
    setOpenEnd(false);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openned = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosed = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          ".css-123k39-MuiPaper-root-MuiAppBar-root": {
            zIndex: 8,
          },
          zIndex: 8,
        }}>
        <CssBaseline />
        <AppBar
          position='fixed'
          open={open}
          sx={{ background: "#262b40", color: "black", padding: 0, zIndex: 9 }}>
          <Toolbar
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <div style={{ display: "flex" }}>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{ mr: 2, ...(open && { display: "none" }) }}>
                <ChevronLeftIcon sx={{ color: "white", fontSize: "30px" }} />
              </IconButton>
            </div>

            <Box>
              <IconButton onClick={handleClick}>
                <img
                  src={profile}
                  width={34}
                  height={34}
                  style={{ borderRadius: "50%" }}
                  alt=''
                />
              </IconButton>
            </Box>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={openned}
              onClose={handleClosed}
              sx={{ padding: "5px" }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <Typography
                onClick={handleLogout}
                fontSize={"14px"}
                color={"#333"}
                sx={{ display: "flex", cursor: "pointer" }}
                alignItems={"center"}
                gap={"8px"}
                p={"5px"}>
                <RiLogoutCircleRLine size={20} /> Đăng xuất
              </Typography>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
              zIndex: 9,
              background: "#262b40",
            },
            zIndex: 8,
          }}>
          <Drawer
            sx={{
              width: drawerWidth,

              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                background: "#262b40",
              },
              ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
                background: "#262b40",
              },
              padding: "10px",
              background: "#262b40",
            }}
            variant='persistent'
            anchor='left'
            open={open}>
            <DrawerHeader>
              <img
                src={logo}
                width={80}
                height={80}
                style={{ objectFit: "contain" }}
                alt=''
              />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon sx={{ color: "white", fontSize: "30px" }} />
                ) : (
                  <ChevronRightIcon sx={{ color: "white", fontSize: "30px" }} />
                )}
              </IconButton>
            </DrawerHeader>

            <Box className='see-more-admin' sx={{ color: "white" }}>
              <List sx={{ px: "10px" }}>
                <ListItem
                  sx={{
                    a: {
                      color: "white",
                      width: "100%",
                      textDecoration: "none",
                    },
                    background: active.overview ? "#2e3650" : undefined,
                    border: active.overview ? "1px solid #4c5680" : "none",
                    borderRadius: active.overview ? "5px" : "none",
                  }}
                  disablePadding>
                  <Link to={"/admin?tab=overview"}>
                    <CustomListItemButton>
                      <ListItemIcon
                        sx={{ display: "flex", justifyContent: "center" }}>
                        <RiLineChartFill color={"white"} />
                      </ListItemIcon>
                      <ListItemText primary={"Tổng quan"} />
                    </CustomListItemButton>
                  </Link>
                </ListItem>
              </List>
              <Divider />
              <List sx={{ px: "10px" }}>
                <ListItem
                  sx={{
                    a: {
                      color: "white",
                      width: "100%",
                      textDecoration: "none",
                    },
                    background: active.user ? "#2e3650" : undefined,
                    border: active.user ? "1px solid #4c5680" : "none",
                    borderRadius: active.user ? "5px" : "none",
                  }}
                  disablePadding>
                  <Link to={"/admin?tab=user"}>
                    <CustomListItemButton>
                      <ListItemIcon
                        sx={{ display: "flex", justifyContent: "center" }}>
                        <RiUser3Fill color={"white"} />
                      </ListItemIcon>
                      <ListItemText primary={"Người dùng"} />
                    </CustomListItemButton>
                  </Link>
                </ListItem>
              </List>
              <Divider />
              <List sx={{ px: "10px" }}>
                <ListItem
                  sx={{
                    a: {
                      color: "white",
                      width: "100%",
                      textDecoration: "none",
                    },
                    background: active.payment ? "#2e3650" : undefined,
                    border: active.payment ? "1px solid #4c5680" : "none",
                    borderRadius: active.payment ? "5px" : "none",
                  }}
                  disablePadding>
                  <Link to={"/admin?tab=payment"}>
                    <CustomListItemButton>
                      <ListItemIcon
                        sx={{ display: "flex", justifyContent: "center" }}>
                        <RiSecurePaymentFill color={"white"} />
                      </ListItemIcon>
                      <ListItemText primary={"Thanh toán"} />
                    </CustomListItemButton>
                  </Link>
                </ListItem>
              </List>
              <Divider />
            </Box>
          </Drawer>
        </Box>
        <Main sx={{ background: "#f5f8fb", minHeight: "100vh" }} open={open}>
          <DrawerHeader />
          <Box>
            <Outlet />
          </Box>
        </Main>
      </Box>
    </div>
  );
};

export default LayoutAdmin;
