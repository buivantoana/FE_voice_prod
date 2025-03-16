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
import { subDays, isSameDay, isSameWeek, isSameMonth } from "date-fns";
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

  const filterRevenue = (filterFn: (date: Date) => boolean) => {
    return payment
      .filter((p: any) => filterFn(new Date(p.date)))
      .reduce((acc: number, p: any) => acc + p.amount, 0);
  };

  const summary = {
    today: filterRevenue((date) => isSameDay(date, today)),
    yesterday: filterRevenue((date) => isSameDay(date, subDays(today, 1))),
    thisWeek: filterRevenue((date) =>
      isSameWeek(date, today, { weekStartsOn: 1 })
    ),
    thisMonth: filterRevenue((date) => isSameMonth(date, today)),
    total: payment.reduce((acc: number, p: any) => acc + p.amount, 0),
  };

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
  let data_fake = [
    {
      code_payment: "PAYMENT09745731281738654070860",
      user_id: "0974573128",
      amount: 200000.0,
      date: "2025-02-04T07:27:50",
      status: "pending",
    },
    {
      code_payment: "PAYMENT09745731281738654076370",
      user_id: "0974573128",
      amount: 200000.0,
      date: "2025-02-04T07:27:56",
      status: "pending",
    },
    {
      code_payment: "PAYMENT09745731281738654076370",
      user_id: "0974573128",
      amount: 200000.0,
      date: "2025-02-04T07:27:56",
      status: "cancelled",
    },
    {
      code_payment: "PAYMENT09745731281738654076370",
      user_id: "0974573128",
      amount: 200000.0,
      date: "2025-02-04T07:27:56",
      status: "success",
    },
    {
      code_payment: "PAYMENT09745731281738654076370",
      user_id: "0974573128",
      amount: 200000.0,
      date: "2025-02-04T07:27:56",
      status: "success",
    },
  ];
  const statusCount = {
    success: data_fake.filter((p: any) => p.status === "success").length,
    pending: data_fake.filter((p: any) => p.status === "pending").length,
    cancelled: data_fake.filter((p: any) => p.status === "cancelled").length,
  };

  const dataCountPayment = {
    labels: ["Đã hoàn tất", "Đang xử lý", "Bị hủy"],
    datasets: [
      {
        label: "Số lượng giao dịch",
        data: Object.values(statusCount),
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        borderColor: ["#388e3c", "#f57c00", "#d32f2f"],
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
