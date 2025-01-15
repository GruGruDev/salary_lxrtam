import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios"; // Import axios
import React, { useEffect, useState } from "react";

// Responsive Table Component
function CustomTable({
  columnNames,
  rowData,
  columnColors,
  alternateRowColors,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer
      component={Paper}
      sx={{ border: "1px solid #C0C0C0", overflowX: "auto" }}
    >
      {!isMobile ? (
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: "collapse",
          }}
          aria-label="custom table"
        >
          <TableHead>
            <TableRow>
              {columnNames.map((column, index) => (
                <TableCell
                  key={index}
                  style={{
                    backgroundColor: columnColors[index] || "inherit",
                    border: "1px solid #C0C0C0",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor:
                    rowIndex % 2 === 0
                      ? alternateRowColors[0]
                      : alternateRowColors[1],
                }}
              >
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    sx={{
                      border: "1px solid #C0C0C0",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        // Mobile View: Display data as a vertical list
        <Box>
          {rowData.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                backgroundColor:
                  rowIndex % 2 === 0
                    ? alternateRowColors[0]
                    : alternateRowColors[1],
                border: "1px solid #C0C0C0",
                borderRadius: "8px",
                marginBottom: "8px",
                padding: "8px",
              }}
            >
              {row.map((cell, cellIndex) => (
                <Box
                  key={cellIndex}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 0",
                  }}
                >
                  <strong>{columnNames[cellIndex]}:</strong> <span>{cell}</span>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </TableContainer>
  );
}

// Employee Data Dialog Component
function EmployeeDataDialog({ open, handleClose }) {
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const employeeId = localStorage.getItem("employee_id");
    if (employeeId) {
      axios
        .get(`https://be.lxrtam.net/employees/${employeeId}`)
        .then((response) => {
          setEmployeeData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, []);

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  const columnNames1 = [
    "Mã NV",
    "Họ tên",
    "Phòng ban",
    "Chức vụ",
    "Cấp bậc",
    "Số điện thoại",
  ];
  const rowData1 = [
    [
      employeeData.employee_id,
      employeeData.full_name,
      employeeData.department,
      employeeData.position,
      employeeData.rank,
      employeeData.phone_number,
    ],
  ];
  const columnColors1 = [
    "#B2EBF2",
    "#87CEEB",
    "#B2EBF2",
    "#87CEEB",
    "#B2EBF2",
    "#87CEEB",
  ];
  const alternateRowColors1 = ["#E0F7FA", "#B2EBF2"];

  const columnNames2 = [
    "Giới tính",
    "Ngày sinh",
    "Số điện thoại",
    "Email",
    "Ngày vào làm",
    "Loại hợp đồng",
    "Thông tin liên hệ khẩn cấp",
  ];
  const rowData2 = [
    [
      employeeData.gender,
      employeeData.date_of_birth || "N/A",
      employeeData.phone_number,
      employeeData.email,
      employeeData.start_date || "N/A",
      employeeData.contract_type,
      employeeData.emergency_contact_info || "N/A",
    ],
  ];
  const columnColors2 = [
    "#B2EBF2",
    "#87CEEB",
    "#B2EBF2",
    "#87CEEB",
    "#B2EBF2",
    "#87CEEB",
    "#B2EBF2",
  ];
  const alternateRowColors2 = ["#E0F7FA", "#B2EBF2"];

  const columnNames3 = [
    "Địa chỉ hiện tại",
    "Trình độ",
    "Số tài khoản NH",
    "Ngân hàng",
    "Mã số thuế",
    "Số thẻ BHYT",
    "Số sổ BHXH",
  ];
  const rowData3 = [
    [
      employeeData.current_address,
      employeeData.education_level || "N/A",
      employeeData.bank_account_number,
      employeeData.bank_name,
      employeeData.tax_code || "N/A",
      employeeData.health_insurance_number,
      employeeData.social_insurance_number,
    ],
  ];
  const columnColors3 = [
    "#B2EBF2",
    "#87CEEB",
    "#B2EBF2",
    "#87CEEB",
    "#B2EBF2",
    "#87CEEB",
    "#B2EBF2",
  ];
  const alternateRowColors3 = ["#E0F7FA", "#B2EBF2"];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Chi Tiết Thông Tin Nhân Viên</DialogTitle>
      <DialogContent>
        <Box>
          <CustomTable
            columnNames={columnNames1}
            rowData={rowData1}
            columnColors={columnColors1}
            alternateRowColors={alternateRowColors1}
          />
          <CustomTable
            columnNames={columnNames2}
            rowData={rowData2}
            columnColors={columnColors2}
            alternateRowColors={alternateRowColors2}
          />
          <CustomTable
            columnNames={columnNames3}
            rowData={rowData3}
            columnColors={columnColors3}
            alternateRowColors={alternateRowColors3}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmployeeDataDialog;
