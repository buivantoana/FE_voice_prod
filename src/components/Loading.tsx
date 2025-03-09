import { Box, CircularProgress } from "@mui/material";
import logo from "../images/loading-lines-6747317-5601928.webp";
const Loading = (props: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: props.width ? props.width : "100%",
        height: props.height ? props.height : "100vh",
        position: props.position ? props.position : "absolute",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255,255,255,.8)",
        zIndex: 10000,
      }}>
      <Box>
        <img src={logo} width={"100px"} alt='' />
      </Box>
    </Box>
  );
};

export default Loading;
