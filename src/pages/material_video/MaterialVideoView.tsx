import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { country } from "../../utils/acent";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  RiArrowRightSLine,
  RiCloseCircleFill,
  RiFileAddLine,
  RiImage2Line,
  RiLinksFill,
  RiUploadCloudLine,
  RiVoiceprintFill,
} from "react-icons/ri";
import ex1 from "../../images/Screenshot 2024-12-30 230225.png";
import ex2 from "../../images/Screenshot 2024-12-30 230305.png";
import ex3 from "../../images/extension_3.png";
import ban from "../../images/ban.svg";
import cover from "../../images/cover.jpg";
import cover1 from "../../images/cover1.webp";

type Props = {
  handleClickOpenAuthor: any;
  productName: any;
  productUrl: any;
  productDesc: any;
  setProductUrl: any;
  fileList: any;
  setFileList: any;
  progress: any;
  setProgress: any;
  simulateUpload: any;
  handleAddLinkAsFile: any;
  productUrlOld: any;
  setOpenUrlImage: any;
  productVideo: any;
  generate: any;
  setProductMyDesc: any;
  productMyDesc: any;
  setProductTarget: any;
  productTarget: any;
  setSelectedVideolength: any;
  selectedVideolength: any;
  setSelectedVideoSize: any;
  selectedVideoSize: any;
  setSelectedVideoLanguage: any;
  selectedVideoLanguage: any;
  fileWaterMark: any;
  setFileWaterMark: any;
  fileEndCard: any;
  setFileEndCard: any;
  avatarVideo: any;
  setAvatarVideo: any;
  productId: any;
  setProductDesc: any;
  setProductName: any;
};

const MaterialVideoView = ({
  handleClickOpenAuthor,
  productName,
  productDesc,
  productUrl,
  setProductUrl,
  fileList,
  setFileList,
  progress,
  setProgress,
  simulateUpload,
  handleAddLinkAsFile,
  productUrlOld,
  setOpenUrlImage,
  productVideo,
  generate,
  setProductMyDesc,
  productMyDesc,
  setProductTarget,
  productTarget,
  setSelectedVideolength,
  selectedVideolength,
  setSelectedVideoSize,
  selectedVideoSize,
  setSelectedVideoLanguage,
  selectedVideoLanguage,
  fileWaterMark,
  setFileWaterMark,
  fileEndCard,
  setFileEndCard,
  avatarVideo,
  setAvatarVideo,
  productId,
  setProductDesc,
  setProductName,
}: Props) => {
  const theme: any = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [tabDes, setTabDes] = useState(0);
  const { t } = useTranslation();
  const [viewMore, setViewMore] = useState(false);
  const navigate = useNavigate()
  const handleClickOpenAvatar = () => {
    setOpenAvatar(true);
  };

  const handleCloseAvatar = () => {
    setOpenAvatar(false);
  };
  const handleClickOpen = async () => {
    if (productUrlOld == productUrl) {
      setOpenUrlImage(true);
    } else {
      if (
        productUrl.startsWith("http://") ||
        productUrl.startsWith("https://")
      ) {
        setOpen(true);
      } else {
        toast.warning("Link không đúng định dạng.");
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ marginTop: "20px" }} px={{ xs: "2%", md: "17%" }}>
      <Box
        height={"72vh"}
        py={"5px"}
        className='scroll-filter'
        sx={{ overflowY: "scroll" }}>
        <Typography fontWeight={"bold"} fontSize={"1.2rem"}>
          {t("import_materials")}
        </Typography>
        <Box
          sx={{
            ".css-gspymc-MuiInputBase-root-MuiOutlinedInput-root": {
              paddingRight: 0,
            },
            ".material-video div": {
              p: "5px 5px 5px 10px",
            },
            mt: "10px",
            position: "relative",
          }}>
          {" "}
          <TextField
            className='material-video'
            id='demo-helper-text-aligned'
            size='small'
            value={productUrl}
            onChange={(e: any) => {
              setProductUrl(e.target.value);
            }}
            onFocus={() => setIsFocused(true)} // Xử lý sự kiện focus
            onBlur={() => setIsFocused(false)} // Xử lý sự kiện blur
            sx={{
              width: "100%",

              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: theme.palette.grey_500.main, // Màu viền khi không có focus
                },
                "&:hover fieldset": {
                  borderColor: "unset", // Màu viền khi hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.active.main, // Màu viền khi focused
                },
              },
              fontSize: "16px",
            }}
            InputProps={{
              // Thêm icon ở đầu
              endAdornment: (
                <Button
                  variant='contained'
                  disabled={!productUrl}
                  onClick={handleClickOpen}
                  sx={{
                    width: "200px",
                    background: theme.palette.active.main,
                    fontSize: { xs: "10px", md: "15px" },
                    borderRadius: "8px",
                  }}>
                  {t("import_from_link")}
                </Button>
              ),
              startAdornment: (
                <RiLinksFill style={{ paddingRight: "5px" }} size={30} />
              ),
            }}
          />
          {!isFocused && !productUrl && (
            <label
              htmlFor='demo-helper-text-aligned'
              style={{
                position: "absolute",
                top: "26%",
                left: "5%",
                width: "max-content",
                overflow: "hidden",
              }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  ".css-16iqw5x": {
                    fontSize: "25px",
                    opacity: ".8",
                  },
                }}
                className='css-1n4ct1u'>
                <Typography
                  mb={"11px"}
                  color='grey_500.main'
                  className='chakra-text css-0'>
                  {t("import_from_link_desc")}
                </Typography>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_amazon_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M17.242 16.3a.33.33 0 0 0-.2.022 14 14 0 0 1-3.008 1.008q-3.157.642-6.15-.671-.832-.367-2.31-1.24a.16.16 0 0 0-.09-.033.2.2 0 0 0-.088.015.16.16 0 0 0-.062.052q-.023.033-.007.09.015.057.077.124.261.307.647.653.384.346 1.02.784.635.436 1.327.777.692.339 1.609.57a7.5 7.5 0 0 0 1.831.232q.91 0 1.766-.183a8 8 0 0 0 1.448-.434 8.4 8.4 0 0 0 1.085-.552c.331-.2.576-.372.735-.507q.24-.206.338-.325.116-.142.116-.25 0-.112-.084-.132M12.26 9.256q-.382.032-.92.139a8 8 0 0 0-1.002.257 5.3 5.3 0 0 0-.943.426q-.481.271-.82.619-.338.346-.554.87a3 3 0 0 0-.216 1.15q0 .68.24 1.214.237.535.639.844.401.311.904.489.504.179 1.058.157a4.6 4.6 0 0 0 1.078-.172 3.2 3.2 0 0 0 .981-.474q.457-.325.75-.765.108.166.193.246l.145.15q.146.148.447.436t.608.564l1.748-1.672-.1-.082a2 2 0 0 1-.255-.24 4 4 0 0 1-.288-.343 2 2 0 0 1-.246-.433 1.2 1.2 0 0 1-.104-.477v-4.4q0-.254-.095-.55a2.4 2.4 0 0 0-.347-.64 2.8 2.8 0 0 0-.623-.62q-.373-.272-.998-.458a4.9 4.9 0 0 0-1.392-.186q-.785.001-1.467.182a4.3 4.3 0 0 0-1.167.489q-.484.306-.832.71-.346.404-.515.844a2.5 2.5 0 0 0-.17.889l2.264.199q.139-.412.368-.717.233-.306.432-.443.202-.138.43-.221.231-.082.312-.09t.127-.007q.67 0 .93.395.164.238.163.724v.948q-.381.015-.763.049m.765 2.543q0 .417-.109.753-.231.73-.877.917a1.24 1.24 0 0 1-1.07-.164 1.12 1.12 0 0 1-.539-.992q0-.5.251-.856.251-.355.67-.53.419-.178.82-.25.4-.075.854-.09zm5.612 3.664q-.109-.134-.585-.179a3.5 3.5 0 0 0-.832.007q-.384.044-.792.224t-.361.298l.011.022.015.011.024.004h.077l.054-.003.065-.007q.03-.004.085-.007a1 1 0 0 0 .1-.012l.173-.015.24-.021q.073-.008.242-.015.169-.008.27 0l.228.018a.7.7 0 0 1 .207.045q.081.033.119.085.13.165-.05.736-.18.57-.342.907-.07.142 0 .179t.2-.067q.39-.306.654-.926.154-.366.22-.765.06-.398-.022-.519'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_amazon_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_shopify_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        fill-rule='evenodd'
                        d='m13.56 18.04.3-.065h-.001l.441-11.66-.053-.053c-.079-.08-.232-.055-.29-.038l-.399.124c-.238-.688-.658-1.32-1.397-1.32q-.031 0-.063.002c-.21-.28-.47-.401-.695-.401-1.721 0-2.544 2.162-2.802 3.261l-1.204.375c-.374.118-.385.13-.434.483-.037.268-1.014 7.86-1.014 7.86zM11.95 5.746c.088.27.146.658.146 1.181v.076l-1.118.42c.215-1.007.619-1.493.971-1.677M9.301 7.982c.267-1.062.902-2.794 2.033-2.794.074.002.146.03.202.08-.505.276-1.045.973-1.274 2.366zm2.794 1.314-.515 1.499s-.452-.235-1.005-.235c-.811 0-.853.497-.853.623 0 .27.285.475.63.722.528.379 1.196.857 1.196 1.827 0 1.26-.819 2.073-1.922 2.073-1.324 0-2.001-.806-2.001-.806l.354-1.145s.697.585 1.283.585c.384 0 .54-.296.54-.511 0-.392-.287-.62-.61-.875-.414-.327-.887-.701-.887-1.525 0-1.234.907-2.429 2.737-2.429.705 0 1.053.197 1.053.197m.667-2.432.45-.189c-.113-.473-.291-.883-.558-.929.066.258.108.583.108.986zm2.07-.022-.416 11.012 3.272-.711-1.457-9.904a.13.13 0 0 0-.117-.109l-1.073-.08z'
                        clip-rule='evenodd'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_shopify_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_youTube_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M18.8 8.672a1.78 1.78 0 0 0-1.254-1.255c-1.107-.298-5.543-.298-5.543-.298s-4.436 0-5.543.296a1.78 1.78 0 0 0-1.254 1.256c-.296 1.108-.296 3.42-.296 3.42s0 2.311.296 3.418a1.78 1.78 0 0 0 1.254 1.255c1.107.298 5.543.298 5.543.298s4.436 0 5.543-.298A1.78 1.78 0 0 0 18.8 15.51c.296-1.107.296-3.418.296-3.418s0-2.312-.296-3.419m-8.206 5.54V9.97l3.673 2.106z'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_youTube_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_tikTokShop_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M17.102 9.055a1.367 1.367 0 0 0-1.364-1.225h-.99c-.01-1.485-1.226-2.687-2.726-2.687S9.305 6.345 9.296 7.83H8.274A1.367 1.367 0 0 0 6.91 9.055l-.732 7.294a2.094 2.094 0 0 0 2.094 2.294h7.468a2.094 2.094 0 0 0 2.093-2.294zM13.376 7.83h-2.71c.004-.352.147-.688.397-.934a1.353 1.353 0 0 1 1.477-.292 1.35 1.35 0 0 1 .837 1.226m-4.053 6.817a1.94 1.94 0 0 1 1.564-2.182c.202-.041.504-.041.66-.007v1.112q-.07-.018-.14-.03a.862.862 0 0 0-.68 1.539.8.8 0 0 0 .882.1c.308-.136.473-.385.508-.721q.008-.07.006-.146v-4c0-.107 0-.107.1-.107h.894c.065 0 .09.01.095.086.047.686.568 1.27 1.236 1.36q.105.013.23.022v1.082a2.5 2.5 0 0 1-1.451-.45v2.076a1.97 1.97 0 0 1-1.524 1.922c-1.219.277-2.25-.604-2.38-1.656'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_tikTokShop_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#mercado_libre_gray_svg__a)'>
                      <circle cx='12' cy='12' r='12' fill='#272729'></circle>
                      <g clip-path='url(#mercado_libre_gray_svg__b)'>
                        <path
                          fill='#fff'
                          fill-opacity='0.6'
                          d='M11.999 5.713c-5.189 0-9.429 2.819-9.429 6.215v.385c0 3.652 3.67 6.6 9.429 6.6 5.758 0 9.428-2.948 9.428-6.6v-.385c0-3.396-4.24-6.215-9.428-6.215m-.633 10.252c-.443 0-.76-.32-.822-.769 0-.064 0-.127-.064-.064-.126.128-.316.257-.633.128-.442-.191-.506-.512-.442-.64 0-.064 0-.064-.064 0-.19.128-.38.192-.633.128-.57-.192-.506-.833-.506-.962a.57.57 0 0 1-.443.193c-.38 0-.633-.256-.633-.64 0-.386.254-.642.633-.642.316 0 .57.256.633.577.126-.128.443-.512 1.012-.384.38.127.443.512.443.576h.063c.064-.128.38-.32.824-.128.57.257.316.962.316 1.025 0 .064-.063.129 0 .129h.063c.063 0 .19-.065.38-.065.442 0 .822.385.822.833-.19.385-.506.706-.95.706zm5.506-2.242c-.38.256-.697.064-.76 0 0 0-1.012-.897-1.392-1.218-.063-.064-.126-.064-.19-.064-.063.064.063.192.063.192l1.14 1.154s.19.192.19.384a.53.53 0 0 1-.317.513c-.443.256-.76.064-.822 0l-.19-.192c-.317-.321-.57-.578-.824-.77-.063-.063-.125-.063-.189-.063-.063.064.063.192.063.192l.823.961s.19.257 0 .512l-.063.065-.064.064c-.19.128-.443.192-.57.128-.189-.064-.189-.128-.189-.128s-.317-.449-.697-.77c-.062-.063-.125-.063-.19-.063-.062.064.064.192.064.192l.76.833c.062.064 0 .064 0 .128-.063.064-.127.128-.444.193-.316.064-.695-.129-.885-.257.063-.128.126-.32.126-.513 0-.576-.442-1.024-1.012-1.024h-.127c.063-.385-.063-.834-.506-1.026-.19-.064-.316-.129-.443-.129-.126 0-.253.065-.38.065-.063-.192-.19-.384-.506-.513-.127-.064-.253-.064-.38-.064-.253 0-.506.128-.632.193-.19-.193-.443-.385-.696-.385a.96.96 0 0 0-.633.256c-.19-.128-.95-.705-3.544-1.282-.063 0-.19-.063-.316-.063-.063 0-.19-.065-.254-.065.19-1.153 1.013-2.242 2.09-3.075.948.448 1.58.641 2.34.833.253.064.886.192 1.013.192.253 0 .506-.064.822-.128h.063l.76-.193-.253.257-.886.897s-.19.192-.126.385c.063.064.126.192.19.192.189.192.695.256 1.138.192.317-.064.633-.32.95-.577l.062-.064c.38-.256.76-.577 1.076-.641.127-.063.254-.063.38-.063.19.064.443.128.823.384.633.512 3.544 3.075 3.606 3.075 0 0 .19.193.19.449 0 .192-.063.385-.252.449m.19-1.09-.254-.256c-.823-.705-2.721-2.371-3.29-2.82-.317-.256-.507-.384-.696-.448-.19-.064-.38-.128-.76 0-.316.064-.633.32-.949.576-.063 0-.063.065-.127.065-.316.256-.696.512-.949.577-.442.128-.886 0-1.012-.193-.063-.064.063-.192.063-.192l.76-.833c.632-.641 1.202-1.217 2.594-1.282.95 0 1.835.45 1.835.45 1.708.832 3.48.511 4.936-.065 1.012.833 1.709 1.858 1.898 3.012-2.151.577-3.733 1.217-4.05 1.41'></path>
                      </g>
                    </g>
                    <defs>
                      <clipPath id='mercado_libre_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                      <clipPath id='mercado_libre_gray_svg__b'>
                        <path
                          fill='#fff'
                          d='M2.57 2.572h18.857V21.43H2.57z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_aliExpress_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M12.384 15.914a.334.334 0 1 0 0 .668.334.334 0 0 0 0-.668m1.572.015a.25.25 0 0 0-.235.148.3.3 0 0 0-.02.094h.5A.26.26 0 0 0 14.13 16a.23.23 0 0 0-.173-.07'></path>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M16.68 5.625H7.328q-1.7 0-1.7 1.7v9.35q0 1.7 1.7 1.7h9.35q1.7 0 1.7-1.7v-9.35q0-1.7-1.7-1.7m-7.76 11.11-.104-.317h-.48l-.114.317h-.216l.478-1.297h.183l.476 1.297zm.488 0h-.167v-1.297h.169zm.395 0h-.168v-.911h.168zm-.085-.967a.27.27 0 0 0-.248-.253.26.26 0 0 0 .248-.227c.01.193.237.241.237.241-.214 0-.236.242-.236.242zm1.13.96h-.816v-1.29h.768v.174h-.588v.378h.53v.166h-.53v.398h.638zm.748.009-.227-.342-.228.342h-.238l.342-.485-.309-.449h.245l.185.295.2-.3h.227l-.301.45.35.49zm.79 0a.5.5 0 0 1-.334-.133v.603h-.154v-.959a.489.489 0 1 1 .488.489m1.107-.74h-.088a.21.21 0 0 0-.174.08.34.34 0 0 0-.072.228v.425h-.171v-.94h.161v.214a.25.25 0 0 1 .098-.134.27.27 0 0 1 .17-.063h.076zm.931.31h-.72a.28.28 0 0 0 .063.19.25.25 0 0 0 .198.08.32.32 0 0 0 .25-.113l.099.14-.06.049a.5.5 0 0 1-.284.083.45.45 0 0 1-.348-.132.534.534 0 0 1 0-.683.45.45 0 0 1 .341-.143.44.44 0 0 1 .336.143.46.46 0 0 1 .125.325zm.667.368a.43.43 0 0 1-.244.069.4.4 0 0 1-.255-.079.21.21 0 0 1-.08-.179l.152-.061a.16.16 0 0 0 .157.162h.026q.184 0 .18-.121 0-.085-.14-.12a4 4 0 0 1-.248-.075.23.23 0 0 1-.134-.227.23.23 0 0 1 .114-.213.42.42 0 0 1 .228-.057c.08-.004.16.018.227.064l.064.053-.098.114a.28.28 0 0 0-.213-.07q-.147 0-.147.093t.083.098l.181.048q.099.021.181.079a.23.23 0 0 1 .081.189.26.26 0 0 1-.115.233m.79 0a.43.43 0 0 1-.245.069.4.4 0 0 1-.254-.079.21.21 0 0 1-.079-.179l.151-.061a.16.16 0 0 0 .157.162h.025q.185 0 .182-.121 0-.085-.14-.12a3 3 0 0 1-.249-.075.23.23 0 0 1-.134-.227.23.23 0 0 1 .114-.213c.069-.04.148-.06.227-.057.081-.004.161.018.228.064l.07.053-.097.114a.28.28 0 0 0-.213-.07q-.147 0-.147.093t.083.098l.181.048q.099.021.181.079a.23.23 0 0 1 .066.187.26.26 0 0 1-.106.235m-3.877-2.608c-2.337 0-4.25-2.124-4.25-4.458h.85c0 1.874 1.522 3.61 3.4 3.61s3.4-1.736 3.4-3.61h.85c0 2.334-1.913 4.458-4.25 4.458'
                        opacity='0.5'></path>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='m8.567 15.674-.18.577h.363l-.179-.572zm3.814.241a.334.334 0 1 0 0 .668.334.334 0 0 0 0-.668'></path>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='m8.567 15.674-.18.577h.363l-.179-.572zm5.387.256a.25.25 0 0 0-.236.148.24.24 0 0 0-.02.094h.5a.26.26 0 0 0-.072-.172.23.23 0 0 0-.172-.07'></path>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M16.68 7.537H7.328q-1.7 0-1.7 1.7v7.437q0 1.7 1.7 1.7h9.35q1.7 0 1.7-1.699V9.237q0-1.7-1.7-1.7m-7.76 9.197-.104-.316h-.48l-.114.316h-.216l.478-1.296h.183l.476 1.296zm.488 0h-.167v-1.296h.169zm.395 0h-.168v-.91h.168zm-.085-.966a.27.27 0 0 0-.248-.253.26.26 0 0 0 .248-.228c.01.194.237.242.237.242-.214 0-.236.242-.236.242zm1.13.96h-.816v-1.29h.768v.174h-.588v.378h.53v.166h-.53v.397h.638zm.748.008-.227-.341-.228.341h-.238l.342-.485-.309-.448h.245l.185.295.2-.3h.227l-.301.449.35.49zm.79 0a.5.5 0 0 1-.334-.133v.604h-.154v-.959a.489.489 0 1 1 .488.488m1.107-.74h-.088a.21.21 0 0 0-.174.081.34.34 0 0 0-.072.228v.425h-.171v-.94h.161v.213a.25.25 0 0 1 .098-.133.27.27 0 0 1 .17-.064h.076zm.931.311h-.72a.28.28 0 0 0 .063.19.25.25 0 0 0 .198.08.32.32 0 0 0 .25-.114l.099.14-.06.05a.5.5 0 0 1-.284.082.45.45 0 0 1-.348-.132.534.534 0 0 1 0-.683.45.45 0 0 1 .341-.142.44.44 0 0 1 .336.142.46.46 0 0 1 .125.326zm.667.368a.43.43 0 0 1-.244.068.4.4 0 0 1-.255-.078.21.21 0 0 1-.08-.179l.152-.062a.16.16 0 0 0 .157.162h.026q.184 0 .18-.12 0-.086-.14-.121a4 4 0 0 1-.248-.074.23.23 0 0 1-.134-.228.23.23 0 0 1 .114-.213.42.42 0 0 1 .228-.057c.08-.004.16.019.227.064l.064.054-.098.114a.28.28 0 0 0-.213-.071q-.147 0-.147.093 0 .094.083.098l.181.05q.099.02.181.078a.23.23 0 0 1 .081.189.26.26 0 0 1-.115.233m.79 0a.43.43 0 0 1-.245.068.4.4 0 0 1-.254-.078.21.21 0 0 1-.079-.179l.151-.062a.16.16 0 0 0 .157.162h.025q.185 0 .182-.12 0-.086-.14-.121a3 3 0 0 1-.249-.074.23.23 0 0 1-.134-.228.23.23 0 0 1 .114-.213c.069-.04.148-.06.227-.057.081-.004.161.019.228.064l.07.054-.097.114a.28.28 0 0 0-.213-.071q-.147 0-.147.093 0 .094.083.098l.181.05q.099.02.181.078a.23.23 0 0 1 .066.186.26.26 0 0 1-.106.236m-3.877-2.608c-2.337 0-4.25-2.124-4.25-4.458h.85c0 1.874 1.522 3.609 3.4 3.609s3.4-1.735 3.4-3.609h.85c0 2.334-1.913 4.458-4.25 4.458'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_aliExpress_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_eBay_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M6.91 12.36V8.143h1.028v2.593c.506-.602 1.202-.776 1.888-.776 1.148 0 2.424.775 2.424 2.447 0 .2-.013.392-.052.572.206-.816 1.092-1.118 2.483-1.152.437-.015.938-.015 1.337-.015v-.116c0-.758-.477-1.066-1.312-1.066-.617 0-1.067.257-1.118.694h-1.093c.116-1.105 1.286-1.388 2.302-1.388.912 0 1.71.231 2.07.874l-.374-.72h1.209l1.761 3.536 1.762-3.537h1.065l-3.188 6.262h-1.154l.917-1.749-1.997-3.754c.111.218.171.475.171.797v2.108c0 .297.009.592.035.862h-.955a6 6 0 0 1-.04-.656c-.517.63-1.131.823-1.988.823-1.269 0-1.948-.669-1.948-1.453q.002-.192.032-.347c-.257 1.068-1.166 1.788-2.372 1.788-.745 0-1.452-.27-1.885-.797 0 .206-.013.423-.035.629H6.872c.017-.334.034-.733.034-1.067v-.9h-4.14c.056.938.701 1.491 1.588 1.491.616 0 1.162-.257 1.344-.797h1.063c-.205 1.106-1.38 1.479-2.391 1.479-1.837.018-2.651-1-2.651-2.363 0-1.503.841-2.494 2.67-2.494 1.447 0 2.512.76 2.52 2.405zm7.831.157c-.938.029-1.517.2-1.517.814 0 .398.309.831 1.119.831 1.08 0 1.658-.591 1.658-1.555v-.111c-.385 0-.848.005-1.272.019h.01zm-5.194 1.607c.951 0 1.608-.691 1.608-1.732s-.658-1.731-1.623-1.731c-.951 0-1.62.69-1.62 1.731 0 1.04.656 1.732 1.608 1.732h.027m-3.729-2.155c-.037-.964-.732-1.325-1.478-1.325-.81 0-1.452.406-1.556 1.325z'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_eBay_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_etsy_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M10.338 7.22c0-.163.013-.26.279-.26h3.54c.62 0 .96.554 1.207 1.598l.198.835h.607C16.28 7.031 16.367 6 16.367 6s-1.516.183-2.414.183h-4.53L6.995 6.09v.685l.817.164c.57.117.712.248.755.796 0 0 .05 1.631.05 4.32s-.05 4.306-.05 4.306c0 .49-.185.666-.755.783l-.817.17V18l2.426-.078h4.054c.916 0 3.033.078 3.033.078.05-.587.36-3.25.403-3.537h-.57l-.606 1.449c-.483 1.142-1.176 1.227-1.95 1.227h-2.302c-.774 0-1.146-.327-1.146-1.031v-3.72s1.721 0 2.278.052c.433.033.693.164.836.797l.185.848h.663l-.05-2.14.093-2.154h-.662l-.217.946c-.142.62-.229.738-.835.803-.793.078-2.29.065-2.29.065z'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_etsy_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_appleStore_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        fill-rule='evenodd'
                        d='M10.21 13.605h2.136v.01c.43-.014.852.13 1.184.404.614.533.426 1.055.18 1.388a.28.28 0 0 1-.214.102H6.212a.975.975 0 0 1-.98-.793.956.956 0 0 1 .925-1.11h1.85L10.88 8.67l-.71-1.234a.95.95 0 0 1 .346-1.296 1 1 0 0 1 .482-.142.96.96 0 0 1 .826.469l.167.29.157-.284a.97.97 0 0 1 .827-.469.9.9 0 0 1 .753.389 1.03 1.03 0 0 1 .021 1.107l-.456.784-.213.37-1.101 1.891-.164.284zm5.73-.005h1.827l-.006-.006a1 1 0 0 1 .994.79.953.953 0 0 1-.926 1.113h-.768l.617 1.07a.95.95 0 0 1-.346 1.296c-.146.084-.312.13-.481.136a.95.95 0 0 1-.82-.47l-1.059-1.828-.117-.192-1.101-1.897-.281-.487-.525-.91a2.53 2.53 0 0 1-.308-1.91c.098-.388.327-.731.648-.971a.15.15 0 0 1 .21.052zm-8.965 2.104c.298-.085.616-.066.901.055a.95.95 0 0 1 .519.51.67.67 0 0 1-.047.564l-.404.69a.93.93 0 0 1-.814.473 1 1 0 0 1-.488-.133.925.925 0 0 1-.327-1.283l.352-.617a.55.55 0 0 1 .308-.26'
                        clip-rule='evenodd'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_appleStore_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_googlePlay_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M7.719 17.178V6.822c0-.36.207-.676.511-.822l6 6-6 6a.92.92 0 0 1-.511-.822M16.13 13.9l-6.554 3.79 5.171-5.172zm2.04-2.625c.208.165.36.42.36.725a.9.9 0 0 1-.347.719l-1.395.804L15.266 12l1.523-1.523zM9.578 6.311 16.13 10.1l-1.383 1.382z'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_googlePlay_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className='css-16iqw5x'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <g clip-path='url(#logo_more_gray_svg__a)'>
                      <rect
                        width='24'
                        height='24'
                        fill='#272729'
                        rx='12'></rect>
                      <path
                        fill='#fff'
                        fill-opacity='0.6'
                        d='M16.714 13.18a1.179 1.179 0 1 0 0-2.358 1.179 1.179 0 0 0 0 2.357M11.999 13.18a1.179 1.179 0 1 0 0-2.358 1.179 1.179 0 0 0 0 2.357M7.284 13.18a1.179 1.179 0 1 0 0-2.358 1.179 1.179 0 0 0 0 2.357'></path>
                    </g>
                    <defs>
                      <clipPath id='logo_more_gray_svg__a'>
                        <path fill='#fff' d='M0 0h24v24H0z'></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </Box>
            </label>
          )}
        </Box>
        <Box mt={"20px"}>
          <FileUploader
            fileList={fileList}
            setFileList={setFileList}
            progress={progress}
            setProgress={setProgress}
            simulateUpload={simulateUpload}
            handleAddLinkAsFile={handleAddLinkAsFile}
          />
        </Box>
        <Box mt={"20px"}>
          <Typography mb={"5px"} fontWeight={"500"}>
            {t("product_name")}
          </Typography>
          <TextField
            className='search-input'
            placeholder='Your product name or video topic'
            id='demo-helper-text-aligned'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            size='small'
            sx={{
              width: "100%",

              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: theme.palette.grey_500.main, // Màu viền khi không có focus
                },
                "&:hover fieldset": {
                  borderColor: "unset", // Màu viền khi hover
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
          mt={"20px"}
          sx={{
            ".css-16dlh63-MuiInputBase-root-MuiInput-root": {
              border: "1px solid #dddddd",
            },
          }}>
          <Box
            display={"flex"}
            gap={"15px"}
            mb={"10px"}
            alignItems={"center"}
            width={"max-content"}
            borderRadius={"8px"}
            p={"5px"}
            bgcolor={"rgb(147 147 147 / 10%)"}>
            <Box>
              <Button
                variant='contained'
                onClick={() => setTabDes(0)}
                sx={{
                  width: "250px",
                  background: tabDes == 0 ? theme.palette.active.main : "unset",
                  fontSize: { xs: "10px", md: "15px" },
                  borderRadius: "8px",
                  color: tabDes == 0 ? "white" : "black",
                }}>
                {t("product_detail")}
              </Button>
            </Box>
            <Box>
              <Button
                variant='contained'
                onClick={() => setTabDes(1)}
                sx={{
                  width: "200px",
                  background: tabDes == 1 ? theme.palette.active.main : "unset",
                  fontSize: { xs: "10px", md: "15px" },
                  borderRadius: "8px",
                  color: tabDes == 1 ? "white" : "black",
                }}>
                {t("product_detail_my")}
              </Button>
            </Box>
          </Box>
          {tabDes == 0 && (
            <TextField
              placeholder={t("product_detail_my_desc")}
              multiline
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              fullWidth
              variant='standard' // Loại bỏ border mặc định
              InputProps={{
                disableUnderline: true, // Bỏ underline của variant="standard"
                sx: {
                  backgroundColor: "white", // Nền trắng
                  borderRadius: 2, // Đặt border-radius nếu cần
                  padding: 2, // Khoảng cách padding
                  border: "1px solid black",
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  minHeight: "150px !important", // Đặt chiều cao tối thiểu nếu cần
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
          )}
          {tabDes == 1 && (
            <TextField
              placeholder={t("product_detail_my_desc")}
              multiline
              fullWidth
              value={productMyDesc}
              onChange={(e) => {
                setProductMyDesc(e.target.value);
              }}
              variant='standard' // Loại bỏ border mặc định
              InputProps={{
                disableUnderline: true, // Bỏ underline của variant="standard"
                sx: {
                  backgroundColor: "white", // Nền trắng
                  borderRadius: 2, // Đặt border-radius nếu cần
                  padding: 2, // Khoảng cách padding
                  border: "1px solid black",
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  minHeight: "150px !important", // Đặt chiều cao tối thiểu nếu cần
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
          )}
        </Box>
        <Box
          mt={"20px"}
          maxHeight={viewMore ? "700px" : "30px"}
          overflow={"hidden"}
          sx={{ cursor: "pointer", transition: ".5s" }}>
          <Typography
            onClick={() => setViewMore(!viewMore)}
            display={"flex"}
            alignItems={"center"}
            fontWeight={"500"}
            gap={"5px"}>
            <RiArrowRightSLine
              style={{
                transform: viewMore ? "rotate(90deg)" : "rotate(0deg)",
                transition: ".5s",
              }}
              size={"20px"}
            />{" "}
            {t("more_option")}
          </Typography>
          <Box mt={"20px"}>
            {/* <Box
              display={"flex"}
              gap={"15px"}
              mb={"10px"}
              alignItems={"center"}
              width={"max-content"}
              borderRadius={"8px"}
              p={"5px"}
              bgcolor={"rgb(147 147 147 / 10%)"}>
              <Box>
                <Button
                  variant='contained'
                  onClick={() => setTabMore(0)}
                  sx={{
                    width: "250px",
                    background:
                      tabMore == 0 ? theme.palette.active.main : "unset",
                    fontSize: { xs: "10px", md: "15px" },
                    borderRadius: "8px",
                    color: tabMore == 0 ? "white" : "black",
                  }}>
                  Choose A Style
                </Button>
              </Box>
              <Box>
                <Button
                  variant='contained'
                  onClick={() => setTabMore(1)}
                  sx={{
                    width: "200px",
                    background:
                      tabMore == 1 ? theme.palette.active.main : "unset",
                    fontSize: { xs: "10px", md: "15px" },
                    borderRadius: "8px",
                    color: tabMore == 1 ? "white" : "black",
                  }}>
                  Use My Style Prompt
                </Button>
              </Box>
            </Box> */}
            <Box mt={"20px"}>
              {/* <FormControl fullWidth>
                <Select id='demo-simple-select'>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
              <Typography mb={"5px"} fontWeight={"500"}>
                {t("more_option_target")}
              </Typography>
              <TextField
                className='search-input'
                placeholder={t("more_option_target_desc")}
                id='demo-helper-text-aligned'
                size='small'
                value={productTarget}
                onChange={(e) => {
                  setProductTarget(e.target.value);
                }}
                sx={{
                  width: "100%",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "white",
                    "& fieldset": {
                      borderColor: theme.palette.grey_500.main, // Màu viền khi không có focus
                    },
                    "&:hover fieldset": {
                      borderColor: "unset", // Màu viền khi hover
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
              mt={"20px"}
              width={"25%"}
              sx={{
                ".css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  padding: "10px",
                },
              }}>
              <Typography mb={"5px"} fontWeight={"500"}>
                {t("size_video")}
              </Typography>
              <FormControl fullWidth>
                <Select
                  id='demo-simple-select'
                  className='more-select'
                  value={selectedVideolength}
                  onChange={(e) => {
                    setSelectedVideolength(e.target.value);
                  }}
                  sx={{
                    background: "white", // Màu nền mặc định
                    "&:focus": {
                      borderColor: theme.palette.active.main, // Màu viền khi focus
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "gray", // Màu viền mặc định
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.active.main, // Màu viền khi được focus
                    },
                  }}>
                  <MenuItem value={"50"}>Auto (30s-50s)</MenuItem>
                  <MenuItem value={"30"}>(15s-30s)</MenuItem>
                  <MenuItem value={"45"}>(30s-45s)</MenuItem>
                  <MenuItem value={"60"}>(45s-60s)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              mt={"20px"}
              sx={{
                ".css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  padding: "10px",
                },
              }}>
              <Typography mb={"5px"} fontWeight={"500"}>
                {t("logo")}
              </Typography>
              <Box display={"flex"} gap={"20px"}>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "gray", // Màu mặc định
                          "&.Mui-checked": {
                            color: theme.palette.active.main, // Màu khi được chọn
                          },
                        }}
                        defaultChecked
                      />
                    }
                    label={t("endcard")}
                  />
                  <ImageUploadPreview
                    file={fileEndCard}
                    setFile={setFileEndCard}
                  />
                </Box>

                <Box
                  width={"max-content"}
                  display={"flex"}
                  mt={"44px"}
                  flexDirection={"column"}
                  alignItems={"center"}>
                  <FormControl
                    sx={{
                      width: "200px",
                      ".css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      },
                    }}>
                    <Select
                      className='more-select'
                      id='demo-simple-select'
                      value={"16:9"}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "center",
                        },
                        transformOrigin: {
                          vertical: "bottom",
                          horizontal: "center",
                        },
                        PaperProps: {
                          sx: {
                            overflowY: "auto", // Cuộn nếu quá dài
                          },
                        },
                      }}
                      sx={{
                        background: "white", // Màu nền mặc định
                        "&:focus": {
                          borderColor: theme.palette.active.main, // Màu viền khi focus
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "gray", // Màu viền mặc định
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.active.main, // Màu viền khi được focus
                        },
                      }}>
                      <MenuItem
                        value={"16:9"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}>
                        <Typography width={"60px"}>For 9:16</Typography>

                        <Box
                          width={"9px"}
                          height={"16px"}
                          bgcolor={"#ccc"}
                          border={"1px solid #ddd"}
                          borderRadius={"3px"}></Box>
                      </MenuItem>
                      <MenuItem
                        value={"3:4"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}>
                        <Typography width={"60px"}> For 3:4</Typography>{" "}
                        <Box
                          width={"12px"}
                          height={"16px"}
                          bgcolor={"#ccc"}
                          border={"1px solid #ddd"}
                          borderRadius={"3px"}></Box>
                      </MenuItem>
                      <MenuItem
                        value={"1:1"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}>
                        <Typography width={"60px"}> For 1:1</Typography>{" "}
                        <Box
                          width={"16px"}
                          height={"16px"}
                          bgcolor={"#ccc"}
                          border={"1px solid #ddd"}
                          borderRadius={"3px"}></Box>
                      </MenuItem>
                      <MenuItem
                        value={"4:3"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}>
                        <Typography width={"60px"}> For 4:3</Typography>
                        <Box
                          width={"16px"}
                          height={"12px"}
                          bgcolor={"#ccc"}
                          border={"1px solid #ddd"}
                          borderRadius={"3px"}></Box>
                      </MenuItem>
                      <MenuItem
                        value={"16:9"}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}>
                        <Typography width={"60px"}> For 16:9</Typography>{" "}
                        <Box
                          width={"16px"}
                          height={"9px"}
                          bgcolor={"#ccc"}
                          border={"1px solid #ddd"}
                          borderRadius={"3px"}></Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{
                      width: "200px",
                      ".css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      },
                    }}>
                    <Select
                      id='demo-simple-select'
                      defaultValue={10}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "center",
                        },
                        transformOrigin: {
                          vertical: "bottom",
                          horizontal: "center",
                        },
                        PaperProps: {
                          sx: {
                            maxHeight: 200, // Giới hạn chiều cao dropdown
                            overflowY: "auto", // Cuộn nếu quá dài
                          },
                        },
                      }}
                      sx={{
                        mt: "30px",
                        background: "white", // Màu nền mặc định
                        "&:focus": {
                          borderColor: theme.palette.active.main, // Màu viền khi focus
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "gray", // Màu viền mặc định
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.active.main, // Màu viền khi được focus
                        },
                      }}>
                      <MenuItem
                        value={10}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}>
                        <input
                          style={{ width: "30px" }}
                          type='color'
                          width={"30px !important"}
                          height={"30px !important"}
                          value={"white"}
                        />{" "}
                        Black
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}>
                        {" "}
                        <input
                          style={{ width: "30px" }}
                          type='color'
                          width={"30px !important"}
                          height={"30px !important"}
                          value={"#FFFFFF"}
                        />
                        White
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "gray", // Màu mặc định
                          "&.Mui-checked": {
                            color: theme.palette.active.main, // Màu khi được chọn
                          },
                        }}
                        defaultChecked
                      />
                    }
                    label={t("watermark")}
                  />
                  <ImageUploadPreview
                    file={fileWaterMark}
                    setFile={setFileWaterMark}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        borderTop={"1px solid #ccc"}
        padding={"10px"}
        sx={{
          ".MuiNativeSelect-select": {
            p: "7px",
          },
          display: "flex",
          justifyContent: "space-between",
        }}
        bgcolor={"rgb(147 147 147 / 10%)"}>
        <Box display={"flex"} gap={"10px"}>
          <FormControl
            sx={{
              width: "150px",
              ".css-1kg98rc-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              {
                display: "flex",
                alignItems: "center",
                gap: "10px",
              },
            }}>
            <Select
              className='more-select'
              id='demo-simple-select'
              value={selectedVideoSize}
              onChange={(e) => {
                setSelectedVideoSize(e.target.value);
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                PaperProps: {
                  sx: {
                    overflowY: "auto", // Cuộn nếu quá dài
                  },
                },
              }}
              sx={{
                background: "white", // Màu nền mặc định
                "&:focus": {
                  borderColor: theme.palette.active.main, // Màu viền khi focus
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray", // Màu viền mặc định
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.active.main, // Màu viền khi được focus
                },
              }}>
              <MenuItem
                value={"9:16"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}>
                <Typography width={"60px"}> 9:16</Typography>
              </MenuItem>
              <MenuItem
                value={"3:4"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}>
                <Typography width={"60px"}> 3:4</Typography>{" "}
              </MenuItem>
              <MenuItem
                value={"1:1"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}>
                <Typography width={"60px"}> 1:1</Typography>{" "}
              </MenuItem>
              <MenuItem
                value={"4:3"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}>
                <Typography width={"60px"}> 4:3</Typography>
              </MenuItem>
              <MenuItem
                value={"16:9"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}>
                <Typography width={"60px"}> 16:9</Typography>{" "}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "150px" }}>
            <Select
              className='more-select'
              id='demo-simple-select'
              value={selectedVideoLanguage}
              onChange={(e) => {
                setSelectedVideoLanguage(e.target.value);
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                PaperProps: {
                  sx: {
                    overflowY: "auto", // Cuộn nếu quá dài
                    maxHeight: "250px",
                  },
                },
              }}
              sx={{
                background: "white", // Màu nền mặc định
                "&:focus": {
                  borderColor: theme.palette.active.main, // Màu viền khi focus
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray", // Màu viền mặc định
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.active.main, // Màu viền khi được focus
                },
              }}>
              {country.map((item: any) => {
                return (
                  <MenuItem
                    value={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}>
                    <Typography
                      sx={{
                        padding: "3px 10px",
                        width: "100px",
                        fontSize: ".8rem",
                      }}>
                      {item.name}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            onClick={handleClickOpenAuthor}
            sx={{
              width: "150px",
              fontSize: { xs: "10px", md: "15px" },
              borderRadius: "8px",
              color: "black",
              border: "1px solid #ccc",
              background: "white",
            }}>
            <RiVoiceprintFill style={{ marginRight: "10px" }} /> {t("voice")}
          </Button>
          <Button
            onClick={handleClickOpenAvatar}
            sx={{
              width: "150px",
              fontSize: { xs: "10px", md: "15px" },
              borderRadius: "8px",
              color: "black",
              border: "1px solid #ccc",
              background: "white",
            }}>
            <RiImage2Line style={{ marginRight: "10px" }} />
            {t("avatar")}
          </Button>
        </Box>

        <Button
          variant='contained'
          onClick={() => generate()}
          disabled={
            !productId ||
            !(
              fileList.length ==
              progress.filter((item: any) => item == 100).length
            ) ||
            !(fileList.length > 0) ||
            !productDesc ||
            !productName
          }
          sx={{
            width: "180px",
            background: theme.palette.active.main,
            fontSize: { xs: "10px", md: "15px" },
            borderRadius: "8px",
            color: "white",
            py: "0px"
          }}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.7em'
            height='1.7em'
            fill='none'
            viewBox='0 0 17 21'
            focusable='false'
            className='chakra-icon css-1uib6s7'>
            <path
              fill='#fff'
              d='M9.05 8.2a.474.474 0 0 1 .901 0l.847 2.542a3.8 3.8 0 0 0 2.4 2.399l2.541.846a.474.474 0 0 1 0 .9l-2.542.847a3.8 3.8 0 0 0-2.4 2.4l-.846 2.542a.474.474 0 0 1-.9 0l-.847-2.542a3.8 3.8 0 0 0-2.399-2.4l-2.542-.846a.474.474 0 0 1 0-.9l2.542-.847a3.8 3.8 0 0 0 2.4-2.4zM3.98 1.506a.285.285 0 0 1 .541 0l.508 1.525c.227.68.76 1.213 1.44 1.44l1.525.508a.285.285 0 0 1 0 .54l-1.525.508a2.27 2.27 0 0 0-1.44 1.44l-.508 1.525a.285.285 0 0 1-.54 0l-.508-1.525a2.27 2.27 0 0 0-1.44-1.44L.508 5.52a.285.285 0 0 1 0-.54l1.525-.508a2.27 2.27 0 0 0 1.44-1.44zM13.26.13a.19.19 0 0 1 .36 0l.338 1.016c.15.454.507.81.96.96l1.017.34a.19.19 0 0 1 0 .359l-1.016.338a1.52 1.52 0 0 0-.961.961l-.339 1.016a.19.19 0 0 1-.36 0l-.338-1.016a1.52 1.52 0 0 0-.96-.96l-1.015-.34a.19.19 0 0 1 0-.359l1.016-.338c.454-.151.81-.507.96-.961z'></path>
          </svg>
          <Box ml={"10px"}>
            {t("generate")}  <p style={{ fontSize: "10px", marginTop: "-5px" }}>(100000 {t("credits")})</p>
          </Box>

        </Button>
      </Box>
      <Dialog
        sx={{ cursor: "pointer" }}
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <Box
            width={"100%"}
            display={"flex"}
            onClick={handleClose}
            justifyContent={"end"}>
            <RiCloseCircleFill size={25} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box width={"500px"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              gap={"15px"}
              sx={{
                ".p": {
                  margin: 0,
                },
              }}
              alignItems={"center"}>
              <Typography fontWeight={"500"}>{t("extension1")}</Typography>
              <Typography fontWeight={"500"}>{t("extension2")}</Typography>
              <Button
                variant='contained'
                onClick={() => {
                  const url = "https://chromewebstore.google.com/detail/gmv-aiconvert-any-url-to/cghofmippgoofobjppomgbbkiblkckbk?utm_source=ext_app_menu";
                  window.open(url, "_blank");
                }}
                endIcon={
                  <div className='css-3ukjbq'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='1em'
                      height='1em'
                      fill='none'
                      viewBox='0 0 18 18'
                      style={{ width: "18px", height: "18px" }}>
                      <path
                        fill='#fff'
                        d='M.003 9a8.98 8.98 0 1 0 17.96-.007A8.98 8.98 0 0 0 .004 9'></path>
                      <path
                        fill='#EA4336'
                        d='m4.533 7.84-2.57-4.45A8.975 8.975 0 0 1 16.71 4.402H9.385A4.636 4.636 0 0 0 4.533 7.84'></path>
                      <path
                        fill='#FABD05'
                        d='M12.197 5.703h5.156a8.9 8.9 0 0 1 .61 3.277 8.975 8.975 0 0 1-8.88 8.981l3.679-6.362a4.586 4.586 0 0 0-.563-5.896z'></path>
                      <path
                        fill='#4285F4'
                        d='M5.722 9a3.262 3.262 0 1 1 6.523-.007 3.262 3.262 0 0 1-6.523.008'></path>
                      <path
                        fill='#34A852'
                        d='m10.22 13.43-2.57 4.467A9 9 0 0 1 0 9.013 8.86 8.86 0 0 1 1.163 4.61l3.663 6.33a4.62 4.62 0 0 0 4.158 2.65 5.3 5.3 0 0 0 1.237-.16'></path>
                    </svg>
                  </div>
                }
                sx={{
                  width: "250px",
                  background: theme.palette.active.main,
                  fontSize: { xs: "10px", md: "15px" },
                  borderRadius: "8px",
                }}>
                {t("extension3")}
              </Button>
              <Typography fontWeight={"500"}>{t("extension4")}</Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              padding={"20px 0"}>
              <Box>
                <Typography color=''>{t("extension_step1")}</Typography>
                <Typography color=''>{t("extension_step1_desc")}</Typography>
                <Box width={205} height={147}>
                  <img src={ex1} width={"100%"} height={"100%"} alt='' />
                </Box>
              </Box>
              <Box>
                <Typography color=''>{t("extension_step2")}</Typography>
                <Typography color=''>{t("extension_step2_desc")}</Typography>
                <Box width={205} height={147}>
                  <img src={ex2} width={"100%"} height={"100%"} alt='' />
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        sx={{ cursor: "pointer" }}
        maxWidth={"lg"}
        fullWidth={true}
        open={openAvatar}
        onClose={handleCloseAvatar}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          <Box
            width={"100%"}
            display={"flex"}
            onClick={handleCloseAvatar}
            justifyContent={"end"}>
            <RiCloseCircleFill size={25} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box display={"flex"} flexWrap={"wrap"} gap={"10px"}>
            <Box
              width={"13.5%"}
              height={"250px"}
              onClick={() => setAvatarVideo(null)}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}sx={{ border:
                avatarVideo == null
                  ? `4px solid ${theme.palette.active.main}`
                  : "none",}}
              borderRadius={"20px"}
              bgcolor={"#dddddd"}>
              <img src={ban}    width={60} height={60} alt='' />
            </Box>
            {productVideo &&
              productVideo.length > 0 &&
              productVideo.map((item: any) => {
                return (
                  <img
                    onClick={() => setAvatarVideo(item.id)}
                    src={item.thumb}
                    width={"13.5%"}
                    height={"250px"}
                    style={{
                      borderRadius: "20px",
                      objectFit: "cover",
                      border:
                        avatarVideo == item.id
                          ? `4px solid ${theme.palette.active.main}`
                          : "none",
                    }}
                    alt=''
                  />
                );
              })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAvatar}
            variant='contained'
            sx={{ background: theme.palette.active.main, borderRadius: "8px" }}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaterialVideoView;

import { LinearProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ImageUploadPreview = ({ file, setFile }: any) => {
  // Lưu file ảnh đã chọn
  const [progress, setProgress] = useState<number>(0); // Thanh tiến trình tải file
  const theme = useTheme();
  // Giả lập process tải ảnh
  const simulateUploadProgress = () => {
    let uploaded = 0;
    const interval = setInterval(() => {
      uploaded += 10;
      setProgress(uploaded);
      if (uploaded >= 100) clearInterval(interval); // Kết thúc tiến trình
    }, 200);
  };

  // Xử lý khi chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile); // Lưu file nếu đúng định dạng
        setProgress(0); // Reset thanh tiến trình
        simulateUploadProgress(); // Giả lập tiến trình
      } else {
        alert("Chỉ chấp nhận các file ảnh định dạng png, jpg, jpeg!");
      }
    }
  };

  return (
    <Box
      sx={{
        width: "200px",
        height: "200px",
        border: "2px dashed #555",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "white",
      }}>
      {/* Input file */}
      <input
        type='file'
        accept='image/png, image/jpg, image/jpeg'
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0,
          cursor: "pointer",
        }}
        onChange={handleFileChange}
      />

      {/* Nội dung hiển thị */}
      {file ? (
        <>
          {/* Ảnh đã chọn */}
          <img
            src={URL.createObjectURL(file)}
            alt='preview'
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Hiển thị thanh tiến trình */}
          {progress < 100 && (
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}>
              <LinearProgress variant='determinate' value={progress} />
            </Box>
          )}
        </>
      ) : (
        // Hiển thị icon tải lên ban đầu
        <Box textAlign='center' sx={{ color: theme.palette.active.main }}>
          <RiUploadCloudLine size={40} color={theme.palette.active.main} />
          <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
            png, jpg, jpeg
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const FileUploader = ({
  fileList,
  setFileList,
  progress,
  setProgress,
  simulateUpload,
  handleAddLinkAsFile,
}: any) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles: File[] = [];
      const allowedTypes = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/bmp",
        "image/webp",
        "video/mp4",
        "video/mov",
      ];

      Array.from(files).forEach((file) => {
        if (allowedTypes.includes(file.type)) {
          validFiles.push(file);
        }
      });

      // Cập nhật danh sách file và phần trăm tải về
      setFileList((prev: any) => [...prev, ...validFiles]);
      setProgress((prev: any) => [...prev, ...validFiles.map(() => 0)]);

      // Giả lập tiến trình upload
      validFiles.forEach((_, index) => simulateUpload(index + fileList.length));
    }
  };

  // Hàm xóa file
  const handleRemoveFile = (index: number) => {
    setFileList((prev: any) => prev.filter((_: any, i: any) => i !== index));
    setProgress((prev: any) => prev.filter((_: any, i: any) => i !== index));
  };

  return (
    <Box mt={"20px"}>
      {/* Khu vực tải lên */}

      <Box
        padding={"20px 0"}
        sx={{
          border: "2px dashed #ccc",
          textAlign: "center",
          marginBottom: "20px",
          borderRadius: "8px",
          background: "white",
        }}>
        <input
          type='file'
          accept='image/*,video/*'
          multiple
          style={{ display: "none" }}
          id='file-upload'
          onChange={handleFileUpload}
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
          <RiUploadCloudLine size={55} color={theme.palette.active.main} />
          <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
            {t("upload_desc")}
          </Typography>
        </label>
        <p style={{ margin: "10px 0" }}>(mp4, mov, png, jpg, bmp, webp)</p>
      </Box>

      {/* Danh sách file đã tải */}
      {fileList.length > 0 && (
        <Box
          display='flex'
          flexWrap='wrap'
          padding={"20px"}
          border={"2px dashed #ccc"}
          borderRadius={"8px"}
          bgcolor={"white"}
          gap='20px'>
          {fileList.map((file, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "150px",
                height: "150px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
                textAlign: "center",
                overflow: "hidden",
              }}>
              {/* Hiển thị hình ảnh hoặc video */}
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  muted
                />
              )}

              {/* Nút xóa */}
              <IconButton
                onClick={() => handleRemoveFile(index)}
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  color: "red",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}>
                <RiCloseCircleFill />
              </IconButton>

              {/* Phần trăm tải */}
              {progress[index] < 100 && (
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: "5px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "12px",
                    background: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "5px",
                  }}>
                  Uploading {progress[index].toFixed(2)}%
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
