import { Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";

const Input = styled(TextField)`
  width: 62px;
`;

export default function InputSlider({
  label,
  setValue,
  value,
  center,
  onChange,
}: any) {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(Number(event.target.value));
    } else {
      setValue(Number(event.target.value));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value === "" ? 0 : Number(event.target.value));
    } else {
      setValue(event.target.value === "" ? 0 : Number(event.target.value));
    }
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography
          fontWeight={"500"}
          color='grey_500.main'
          ml={center ? "0px" : "35px"}>
          {t("speed")}
        </Typography>
      )}
      <Stack
        mt={"-7px"}
        direction={"row"}
        spacing={2}
        sx={{
          alignItems: "center",
          justifyContent: center ? "unset" : "center",
        }}>
        <Stack width={"55%"}>
          <input
            className='range_input'
            value={value}
            type='range'
            onChange={handleSliderChange}
            min={0}
            max={4}
            step={0.1}
            style={{
              width: "100%",
              accentColor: theme.palette.active.main, // Màu thanh trượt
              background: `linear-gradient(
            to right,
            ${theme.palette.active.main} 0%,
            ${theme.palette.active.main} ${(value / 4) * 100}%,
            #e0e0e0 ${(value / 4) * 100}%,
            #e0e0e0 100%
          )`, // Thay đổi màu theo giá trị
              borderRadius: "4px",
              outline: "none",
              height: "8px",
              cursor: "pointer",
              appearance: "none",
            }}
          />
        </Stack>
        <Stack
          width={{ xs: "40px", md: "20%" }}
          sx={{
            ".css-1yp1rry": {
              width: "100%",
            },
          }}>
          <Input
            value={value}
            size='small'
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 0.1,
              min: 0,
              max: 4,
              type: "number",
              "aria-labelledby": "input-slider",
              style: {
                // CSS để ẩn mũi tên tăng giảm của input kiểu number
                MozAppearance: "textfield",
                padding: "0px 0px 0px 10px",
                width: "90%",
              },
            }}
            sx={{
              "& input[type=number]": {
                MozAppearance: "textfield", // Ẩn mũi tên trên Firefox
              },
              "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                {
                  WebkitAppearance: "none", // Ẩn mũi tên trên Chrome, Safari
                  margin: 0,
                },
              ".css-57eq20-MuiInputBase-root-MuiOutlinedInput-root": {
                width: "70%",
              },
              padding: "0 ",
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
