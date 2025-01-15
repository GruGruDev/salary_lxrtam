import {
  Box,
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
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";

const weekDays = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: "#F8E5CB",
  border: "1px solid #D8B691",
  color: "#333",
  textAlign: "center",
  padding: "2px 4px",
  fontSize: "0.7rem",
}));

const StyledTableRow = styled(TableRow)(({ dayColor }) => ({
  backgroundColor: dayColor || "#FFF",
  height: "32px",
}));

const TimeSheetTable = () => {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [checkedValues, setCheckedValues] = useState({});

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = Array.from({ length: totalDaysInMonth }, (_, index) => {
      const dayOfWeek = new Date(year, month, index + 1).getDay();
      const date = new Date(year, month, index + 1);
      const dayName = weekDays[dayOfWeek];
      return {
        id: `day-${index}`,
        date: date.toISOString().split("T")[0],
        dayName,
        in: "8:00",
        out: "17:00",
        standard_hours: "9:00",
        actual_hours: 0,
        output: "100",
        time: "60",
      };
    });

    setDaysInMonth(daysArray);
  }, []);

  const handlePaste = (e, rowIndex, colIndex) => {
    e.preventDefault();

    const clipboardData = e.clipboardData.getData("Text");
    const rows = clipboardData.split("\n");
    const updatedDays = [...daysInMonth];

    rows.forEach((row, i) => {
      const columns = row.split("\t");
      const targetRow = rowIndex + i;

      if (updatedDays[targetRow]) {
        columns.forEach((col, j) => {
          const targetColumn = colIndex + j;

          if (targetColumn === 0) {
            updatedDays[targetRow].date = col;
          } else if (targetColumn === 1) {
            updatedDays[targetRow].dayName = col;
          } else if (targetColumn === 2) {
            updatedDays[targetRow].in = col;
          } else if (targetColumn === 3) {
            updatedDays[targetRow].out = col;
          } else if (targetColumn === 4) {
            updatedDays[targetRow].standard_hours = col;
          }
        });
      }
    });

    setDaysInMonth(updatedDays);
  };

  const handleCheckboxChange = (dayIndex) => {
    setCheckedValues((prev) => ({
      ...prev,
      [dayIndex]: !prev[dayIndex],
    }));
  };

  const handleTextChange = (dayIndex, column, value) => {
    setDaysInMonth((prev) =>
      prev.map((day, i) => {
        if (i === dayIndex) {
          return { ...day, [column]: value };
        }
        return day;
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        maxHeight: "700px",
        overflowY: "hidden",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "100%",
          opacity: 0.95,
          maxHeight: "700px",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <Table sx={{ width: "100%", tableLayout: "fixed" }}>
          {" "}
          {/* Changed table layout to 'auto' */}
          <TableHead>
            <TableRow>
              <StyledTableCell>KPI</StyledTableCell>
              <StyledTableCell>Ngô văn A</StyledTableCell>
              <StyledTableCell colSpan={5}>Chuyên cần</StyledTableCell>
              <StyledTableCell colSpan={2}>Năng suất</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={2}>Ngày</StyledTableCell>
              <StyledTableCell>Vào</StyledTableCell>
              <StyledTableCell>Ra</StyledTableCell>
              <StyledTableCell>Giờ công chuẩn + nghĩ trưa</StyledTableCell>
              <StyledTableCell>Giờ công</StyledTableCell>
              <StyledTableCell>Check tăng ca hợp lệ</StyledTableCell>
              <StyledTableCell>Sản Lượng</StyledTableCell>
              <StyledTableCell>Thời Gian</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {daysInMonth.map((day, index) => (
              <StyledTableRow key={day.id}>
                <StyledTableCell>{day.date}</StyledTableCell>
                <StyledTableCell>{day.dayName}</StyledTableCell>
                <StyledTableCell>
                  <TextField
                    id={`in-${day.id}`}
                    variant="standard"
                    value={day.in}
                    onChange={(e) =>
                      handleTextChange(index, "in", e.target.value)
                    }
                    onPaste={(e) => handlePaste(e, index, 2)}
                    inputProps={{
                      style: { fontSize: "0.7rem", padding: "2px" },
                    }}
                    type="text"
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextField
                    id={`out-${day.id}`}
                    variant="standard"
                    value={day.out}
                    onChange={(e) =>
                      handleTextChange(index, "out", e.target.value)
                    }
                    inputProps={{
                      style: { fontSize: "0.7rem", padding: "2px" },
                    }}
                    type="text"
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <TextField
                    id={`standard_hours-${day.id}`}
                    variant="standard"
                    value={day.standard_hours}
                    onChange={(e) =>
                      handleTextChange(index, "standard_hours", e.target.value)
                    }
                    inputProps={{
                      style: { fontSize: "0.7rem", padding: "2px" },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: "bold", color: "blue" }}>
                  {/* Hiển thị giờ công */}
                  {Number(day.actual_hours).toFixed(2)}
                </StyledTableCell>
                <StyledTableCell
                  sx={{ textAlign: "center", padding: "2px 4px" }}
                >
                  <Checkbox
                    id={`checkbox-${day.id}`}
                    checked={checkedValues[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                    sx={{ padding: "0" }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    variant="standard"
                    value={day.output}
                    onChange={(e) =>
                      handleTextChange(index, "output", e.target.value)
                    }
                    inputProps={{
                      style: { fontSize: "0.7rem", padding: "2px" },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    id={`time-${day.id}`}
                    variant="standard"
                    value={day.time}
                    onChange={(e) =>
                      handleTextChange(index, "time", e.target.value)
                    }
                    inputProps={{
                      style: { fontSize: "0.7rem", padding: "2px" },
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow>
              <StyledTableCell
                colSpan={9}
                sx={{ fontWeight: "bold", textAlign: "center", color: "green" }}
              >
                Tổng giờ tăng ca x1,5:
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell
                colSpan={9}
                sx={{ fontWeight: "bold", textAlign: "center", color: "red" }}
              >
                Tổng giờ phải trả lại cho công ty:
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimeSheetTable;
