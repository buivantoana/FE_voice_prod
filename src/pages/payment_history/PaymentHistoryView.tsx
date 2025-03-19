import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Box,
  Button,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { RiPaypalFill } from "react-icons/ri";
import LeftProfile from "../../components/LeftProfile";
import Loading from "../../components/Loading";
import { convertToVND } from "../../utils/utils";
import { useTranslation } from "react-i18next";
type Props = {
  history: any;
  loadingHistory: any;
};

const PaymentHistoryView = ({ history, loadingHistory }: Props) => {
  const theme: any = useTheme();
  const { t } = useTranslation();
  return (
    <Box padding={"2% 5%"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <LeftProfile />
        <Box
          sx={{ position: "relative" }}
          bgcolor={"white"}
          minHeight={"80vh"}
          border={"1px solid #dddddd"}
          width={{ xs: "100%", md: "100%", lg: "62%" }}>
          <Box borderBottom={"1px solid #dddddd"} p={"10px"}>
            <Typography
              variant='h6'
              fontSize={{ xs: "1rem", md: "1.2rem" }}
              fontWeight={"500"}>
              {t("history_pay")}
            </Typography>
          </Box>
          <Box
            mt={"20px"}
            sx={{
              ".css-1be8zi3-MuiTypography-root-MuiTimelineContent-root": {
                padding: 0,
              },
              position: "relation",
              maxHeight: "65vh",
              overflowY: "scroll",
            }}>
            {!loadingHistory ? (
              <>
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}>
                  {history && history.length > 0 ? (
                    <>
                      {history.map((item: any) => {
                        let date = item.date.split("T");
                        return (
                          <TimelineItem>
                            <TimelineSeparator
                              sx={{ display: { xs: "none", md: "flex" } }}>
                              <HighlightOffIcon />
                              <TimelineConnector sx={{ minHeight: "40px" }} />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Box
                                display={"flex"}
                                width={"100%"}
                                justifyContent={"space-between"}>
                                <Box
                                  width={"100%"}
                                  p={"5px"}
                                  display={"flex"}
                                  flexDirection={"column"}
                                  borderBottom={"1px dashed #dddddd"}
                                  gap={{ xs: "5px", md: "10px" }}>
                                  <Box
                                    display={{ xs: "flex", md: "flex" }}
                                    justifyContent={{
                                      xs: "space-between",
                                      md: "unset",
                                    }}
                                    alignItems={"end"}
                                    gap={"10px"}>
                                    <Typography
                                      variant='h5'
                                      fontWeight={"500"}
                                      fontSize={{ xs: "1.2rem", md: "1.3rem" }}>
                                      {convertToVND(item.amount)}
                                    </Typography>
                                    <Box display={"flex"} gap={"10px"}>
                                      {item.status == "pending"?
                                      <Button
                                        sx={{
                                          borderRadius: "5px",
                                          padding: "2px 0px",
                                          backgroundColor: "rgb(254 236 220)", // Màu nền của nút
                                          color: "rgb(138 44 13)", // Màu chữ
                                          "&:hover": {
                                            backgroundColor: "rgb(254 236 220)", // Màu nền khi hover
                                          },
                                        }}
                                        variant='contained'>
                                        {item.status}
                                      </Button>:<Button
                                        sx={{
                                          borderRadius: "5px",
                                          padding: "2px 0px",
                                          backgroundColor: "rgb(205 255 199)", // Màu nền của nút
                                          color: "rgb(21 72 9)", // Màu chữ
                                          "&:hover": {
                                            backgroundColor: "rgb(205 255 199)", // Màu nền khi hover
                                          },
                                        }}
                                        variant='contained'>
                                        {item.status}
                                      </Button>
                                      }
                                    </Box>
                                  </Box>
                                  <Typography
                                    fontSize={".8rem"}
                                    color='grey_500.main'>
                                    {date[0]} {date[1]}
                                  </Typography>
                                  <Typography
                                    fontSize={".9rem"}
                                    color='grey_500.main'>
                                    Order ID:
                                    {item.code_payment}
                                  </Typography>
                                  {/* <Typography
                        fontSize={".9rem"}
                        sx={{ display: "flex", alignItems: "center" }}
                        color='grey_500.main'>
                        <RiPaypalFill /> Paypal ID:
                        1db0f73e-9223-11ef-b28d-be6d42b1dbef
                      </Typography> */}
                                </Box>
                                {/* <Typography variant='h5' color='grey_500.main'>
                                  8$
                                </Typography> */}
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
                </Timeline>
              </>
            ) : (
              <Loading height={"100%"} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentHistoryView;
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
