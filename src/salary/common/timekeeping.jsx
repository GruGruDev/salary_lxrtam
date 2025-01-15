import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const initialSalaryData = [
  {
    name: "Lương cơ bản",
    value: "10,000,000",
    note: "26",
    checked: false,
    allowInput: true,
  },
  {
    name: "Lương Thực Tế",
    value: "12,000,000",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Ngày Công thực tế",
    value: "24",
    note: "",
    checked: "24",
    inputCheck: true,
    allowInput: true,
  },
  {
    name: "PC cơm + xe",
    value: "600,000",
    note: "",
    checked: "30,000",
    inputCheck: true,
    allowInput: true,
  },
  {
    name: "Tổng lương tăng ca",
    value: "1,000,000",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Cơm Tăng Ca",
    value: "200,000",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Thưởng Khác",
    value: "500,000",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Tổng giờ tăng ca x1,5",
    value: "10",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Tổng giờ tăng ca x2",
    value: "5",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Tổng giờ tăng ca x3",
    value: "2",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Tổng giờ trả lại công ty",
    value: "0",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Ngày phép năm",
    value: "1",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Thưởng KPI",
    value: "1,000,000",
    note: "",
    checked: false,
    allowInput: true,
  },
  { name: "Phạt KPI", value: "0", note: "", checked: false, allowInput: true },
  { name: "Ứng Lương", value: "0", note: "", checked: false, allowInput: true },
  {
    name: "Thanh toán Khoản Vay cho Cty",
    value: "0",
    note: "",
    checked: false,
    allowInput: true,
  },
  {
    name: "Lương giờ",
    value: "52,083",
    note: "",
    checked: false,
    allowInput: true,
  },
];

const SalaryTable = () => {
  const [totalSalary, setTotalSalary] = useState(0);
  const [salaryData, setSalaryData] = useState(initialSalaryData);

  const handleChange = (index, field, value) => {
    const updatedData = [...salaryData];
    updatedData[index][field] = value;
    setSalaryData(updatedData);
  };

  return (
    <TableContainer component={Paper} sx={{ height: "auto" }}>
      <Table
        sx={{ border: "2px solid #ccc", width: "100%" }}
        aria-label="salary table"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "rgba(255, 215, 0, 0.5)" }}>
            <TableCell
              sx={{
                border: "1px solid #ccc",
                fontWeight: "bold",
                fontSize: "14px",
                padding: "4px",
              }}
            >
              Hạng Mục
            </TableCell>
            <TableCell
              sx={{
                border: "1px solid #ccc",
                fontSize: "14px",
                padding: "4px",
              }}
              align="center"
            >
              Check
            </TableCell>
            <TableCell
              align="right"
              sx={{
                border: "1px solid #ccc",
                fontWeight: "bold",
                fontSize: "14px",
                padding: "4px",
              }}
            >
              Giá trị
            </TableCell>
            <TableCell
              align="right"
              sx={{
                border: "1px solid #ccc",
                fontWeight: "bold",
                fontSize: "14px",
                padding: "4px",
              }}
            >
              Ghi chú
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salaryData.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                height: "38px",
                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "inherit",
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  border: "1px solid #aaa",
                  fontSize: row.name.includes("Tổng giờ") ? "11px" : "13px",
                  fontWeight: "bold",
                  padding: "4px",
                }}
              >
                {row.name}
              </TableCell>
              <TableCell
                align="center"
                sx={{ border: "1px solid #aaa", padding: "4px" }}
              >
                {row.inputCheck ? (
                  <TextField
                    variant="standard"
                    value={row.checked}
                    onChange={(e) =>
                      handleChange(index, "checked", e.target.value)
                    }
                    sx={{ width: "60px" }}
                  />
                ) : !row.name.includes("Tổng giờ") ? (
                  <Checkbox
                    checked={row.checked}
                    onChange={(e) =>
                      handleChange(index, "checked", e.target.checked)
                    }
                    sx={{
                      borderRadius: "50%",
                      padding: "2px",
                      color: "gray",
                      "&.MuiCheckbox-root": { color: "gray" },
                      "& .MuiSvgIcon-root": { fill: "gray" },
                    }}
                  />
                ) : null}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  border: "1px solid #aaa",
                  fontSize: "14px",
                  padding: "4px",
                }}
              >
                <TextField
                  variant="standard"
                  value={row.value}
                  onChange={(e) => handleChange(index, "value", e.target.value)}
                  sx={{ width: "100px" }}
                />
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  border: "1px solid #aaa",
                  fontSize: "14px",
                  padding: "4px",
                }}
              >
                <TextField
                  variant="standard"
                  value={row.note}
                  onChange={(e) => handleChange(index, "note", e.target.value)}
                  sx={{ width: "100px" }}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell
              colSpan={4}
              align="left"
              sx={{
                padding: "8px",
                fontWeight: "bold",
                backgroundColor: "rgba(255, 215, 0, 0.5)",
                borderTop: "1px solid #ccc",
                borderBottom: "1px solid #ccc",
                fontSize: "15px",
              }}
            >
              Tổng lương : {totalSalary} VND
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalaryTable;
