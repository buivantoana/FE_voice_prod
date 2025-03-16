import {
  Box,
  Button,
  Modal,
  Popover,
  Skeleton,
  Stack,
  TablePagination,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Payment = ({ payment }: any) => {
  const [filterModel2, setFilterModel2] = useState({
    items: [],
  });

  const columns2 = [
    { field: "code_payment", headerName: "Code Payment", width: 300 },
    { field: "user_id", headerName: "User Id", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
          <Typography variant='h5' fontWeight={"bold"}>
            Thanh toán
          </Typography>
        </Stack>
        <DataGrid
          rows={payment}
          columns={columns2}
          getRowId={(row: any) => row.code_payment}
          pageSizeOptions={[10, 20, 50]} // Các tùy chọn số dòng trên mỗi trang
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }, // Giá trị mặc định là 10
            },
          }}
          filterMode='client'
          filterModel={filterModel2}
          onFilterModelChange={(model: any) => setFilterModel2(model)}
          localeText={{
            // Dịch menu cột
            columnMenuSortAsc: "Sắp xếp tăng dần",
            columnMenuSortDesc: "Sắp xếp giảm dần",
            columnMenuFilter: "Bộ lọc",
            columnMenuHideColumn: "Ẩn cột",
            columnMenuManageColumns: "Quản lý cột",

            // Dịch popup bộ lọc
            filterPanelColumns: "Cột",
            filterPanelOperator: "Toán tử",
            filterPanelInputLabel: "Giá trị",
            filterPanelInputPlaceholder: "Nhập giá trị...",
            filterValueAny: "Nhập giá trị lọc",

            // Dịch toán tử lọc
            filterOperatorContains: "Chứa",
            filterOperatorDoesNotContain: "Không chứa",
            filterOperatorEquals: "Bằng",
            filterOperatorDoesNotEqual: "Không bằng",
            filterOperatorStartsWith: "Bắt đầu với",
            filterOperatorEndsWith: "Kết thúc với",
            filterOperatorIsEmpty: "Rỗng",
            filterOperatorIsNotEmpty: "Không rỗng",
            filterOperatorIsAnyOf: "Là một trong số",
          }}
        />
      </Box>
    </Box>
  );
};

export default Payment;
