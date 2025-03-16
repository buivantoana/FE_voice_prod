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

const User = ({ user }: any) => {
  const [filterModel1, setFilterModel1] = useState({
    items: [],
  });

  const columns1 = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "user_id", headerName: "User Id", flex: 1 },
    { field: "credits", headerName: "Credits", flex: 1 },
    { field: "limit_txt", headerName: "Limit TXT", flex: 1 },
    { field: "utm", headerName: "UTM", flex: 1 },
    { field: "token", headerName: "Token", flex: 1 },
    { field: "favorite_voice", headerName: "Favorite Voice", width: 400 },
  ];

  return (
    <Box>
      <div style={{ height: 400, width: "100%" }}>
        <Stack my={"20px"} direction={"row"} justifyContent={"space-between"}>
          <Typography variant='h5' fontWeight={"bold"}>
            Người dùng
          </Typography>
        </Stack>
        <DataGrid
          rows={user}
          columns={columns1}
          pageSizeOptions={[10, 20, 50]} // Các tùy chọn số dòng trên mỗi trang
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }, // Giá trị mặc định là 10
            },
          }}
          filterMode='client'
          filterModel={filterModel1}
          onFilterModelChange={(model: any) => setFilterModel1(model)}
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
      </div>
    </Box>
  );
};

export default User;
