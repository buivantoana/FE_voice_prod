import { useState } from "react";
import BuyCreditView from "./BuyCreditView";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { RiCloseLine } from "react-icons/ri";
import { confirmPayment, createPayment } from "../../service/payment";
import { useCoursesContext } from "../../App";
import Loading from "../../components/Loading";
import { convertToVND } from "../../utils/utils";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const BuyCreditController = () => {
  const [amount, setAmount] = useState(0.2);
  const [openQr, setOpenQr] = useState(false);
  const [codePayment, setCodePayment] = useState("");
  const [loading, setLoading] = useState(false);
  const context: any = useCoursesContext();
  const { t } = useTranslation();
  const handleSliderChange = (event: any, newValue: any) => {
    // Cập nhật giá trị của Slider
    setAmount(newValue);
  };

  const handleCreatePayment = async () => {
    setLoading(true);
    try {
      let data = await createPayment({
        user_id: context.state.user.user_id,
        amount: amount * 1000000,
      });
      if (data.code == 0) {
        setCodePayment(data.data.code_payment);
        handleClickOpenQr();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleClickOpenQr = () => {
    setOpenQr(true);
  };

  const handleCloseQr = () => {
    setOpenQr(false);
  };
  const handleConfirmPayment = async () => {
    try {
      let data = await confirmPayment({ payment_id: `${codePayment}` });
      if (data.code == 0) {
        context.dispatch({
          type: "PAYMENT",
          payload: {
            ...context.state,
            user: { ...context.state.user, credits: data.data.credits },
          },
        });
        toast.success("Bạn đã nạp tiền thành công");
        handleCloseQr();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading && <Loading position={"fixed"} />}
      <BuyCreditView
        amount={amount}
        setAmount={setAmount}
        handleSliderChange={handleSliderChange}
        handleClickOpenQr={handleClickOpenQr}
        handleCreatePayment={handleCreatePayment}
        credits={
          Object.keys(context.state.user) && context.state.user.credits
            ? context.state.user.credits
            : 0
        }
      />
      <Dialog
        maxWidth='xs' // sets a maximum width
        fullWidth
        open={openQr}
        onClose={handleCloseQr}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <Box display={"flex"} onClick={handleCloseQr} justifyContent={"end"}>
          <RiCloseLine size={25} />
        </Box>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography textAlign={"center"} variant='h6'>
              {t("qr")}
            </Typography>
            <img
              src={`https://qr.limcorp.vn/qrcode.png?bank=970422&number=99192886868&amount=${
          
                amount < 1 ? amount * 1000000 : amount * 1000000
              }&content=TTS ${codePayment}`}
              alt='QR Code'
              width='300px'
              height='100%'
            />
            <Typography textAlign={"center"} fontSize={"1rem"}>
              Số tiền: {convertToVND(amount * 1000000)}
            </Typography>
            <Typography textAlign={"center"} fontSize={"1rem"}>
              Số TK: 99192886868
            </Typography>
            <Typography textAlign={"center"} fontSize={"1rem"}>
              Chủ tài khoản: TRAN MANH TOAN
            </Typography>
            <Typography textAlign={"center"} fontSize={"1rem"}>
              Ngân hàng: MB Bank
            </Typography>
            <Box mt={"5px"}>
              <Button
                onClick={handleConfirmPayment}
                sx={{
                  width: "100%",
                  backgroundColor: "#4CAF50", // Màu nền của nút
                  color: "#fff", // Màu chữ
                  "&:hover": {
                    backgroundColor: "#388E3C", // Màu nền khi hover
                  },
                }}
                variant='contained'>
                {t("paid")}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuyCreditController;
