import { Box, Typography, Grid, Paper, Stack } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  BarElement,
  CategoryScale,
  ArcElement,
  LinearScale,
  ChartDataLabels,
  Tooltip,
  Legend
);

const Overview = ({ user, payment }: any) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0); // Đảm bảo chỉ xét ngày, không xét giờ

  const isSameDayJS = (date1, date2) => date1.toDateString() === date2.toDateString();

  const isSameWeekJS = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    const firstDayOfWeek = new Date(d2);
    firstDayOfWeek.setDate(d2.getDate() - d2.getDay() + 1);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    return d1 >= firstDayOfWeek && d1 <= lastDayOfWeek;
  };

  const isSameMonthJS = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();

  const filterRevenue = (filterFn: (date: Date) => boolean) => {
    return payment
      .filter((p: any) => p.status === "success" && filterFn(new Date(p.date)))
      .reduce((acc: number, p: any) => acc + p.amount, 0);
  };


  const summary = {
    today: filterRevenue(date => isSameDayJS(date, new Date())),
    yesterday: filterRevenue(date => isSameDayJS(date, new Date(new Date().setDate(new Date().getDate() - 1)))),
    thisWeek: filterRevenue(date => isSameWeekJS(date, new Date())),
    thisMonth: filterRevenue(date => isSameMonthJS(date, new Date())),
    total: payment.filter((p: any) => p.status === "success").reduce((acc: number, p: any) => acc + p.amount, 0),
  };

  console.log(summary);

  const data = {
    labels: ["Hôm nay", "Hôm qua", "Tuần này", "Tháng này", "Tổng cộng"],
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: Object.values(summary),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4caf50",
          "#9c27b0",
        ],
        borderColor: ["#d32f2f", "#1976d2", "#ffa000", "#388e3c", "#7b1fa2"],
        borderWidth: 1,
      },
    ],
  };
  const optionsTotal = {
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        formatter: (value: number) => {
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(value);
        },
        color: "#000",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const options = {
    scales: {
      y: { beginAtZero: true },
    },
    plugins: {
      legend: { display: true },
    },
  };

  const statusCount = {
    success: payment.filter((p: any) => p.status === "success").length,
    pending: payment.filter((p: any) => p.status === "pending").length,
  };

  const dataCountPayment = {
    labels: ["Đã hoàn tất", "Đang xử lý"],
    datasets: [
      {
        label: "Số lượng giao dịch",
        data: Object.values(statusCount),
        backgroundColor: ["#4caf50", "#ff9800"],
        borderColor: ["#388e3c", "#f57c00"],
        borderWidth: 1,
      },
    ],
  };
  const totalUsers = user.length;
  const buyers = new Set(
    payment
      .filter((p: any) => p.status === "pending")
      .map((p: any) => p.user_id)
  ).size;

  const conversionRate = totalUsers > 0 ? (buyers / totalUsers) * 100 : 0;

  const data2 = {
    labels: ["Người đã mua", "Người chưa mua"],
    datasets: [
      {
        label: "Tỷ lệ chuyển đổi (%)",
        data: [buyers, totalUsers - buyers],
        backgroundColor: ["#4caf50", "#f44336"],
        borderColor: ["#388e3c", "#d32f2f"],
        borderWidth: 1,
      },
    ],
  };
  const optionsPie = {
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a: number, b: number) => a + b,
            0
          );
          return total > 0 ? `${((value / total) * 100).toFixed(2)}%` : "0%";
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
    },
  };
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box width={"45%"}>
          <Typography variant='h5' fontWeight={"bold"} mb={3}>
            Tổng doanh thu
          </Typography>

          <Bar data={data} options={optionsTotal} />
        </Box>
        <Box width={"45%"}>
          <Typography variant='h5' fontWeight={"bold"} mb={3}>
            Số lượng giao dịch
          </Typography>

          <Bar data={dataCountPayment} options={options} />
        </Box>
      </Box>
      <Box py={"30px"}>
        <Typography variant='h5' fontWeight={"bold"} mb={3}>
          Tỷ lệ chuyển đổi
        </Typography>
        <Stack direction='row' spacing={4} mb={2}>
          <Typography variant='h6'>Tổng số User: {totalUsers}</Typography>
          <Typography variant='h6'>Tổng số Người đã nạp: {buyers}</Typography>
        </Stack>
        <Typography variant='h6' color='primary'>
          {conversionRate.toFixed(2)}%
        </Typography>
        <Box display={"flex"} justifyContent={"center"}>
          <Box width={"30%"}>
            <Pie data={data2} options={optionsPie} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
