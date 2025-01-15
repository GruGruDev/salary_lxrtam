import { Button as MUIButton, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import SalaryTable from "../common/salaryTable";
import AttendanceTable from "../common/timekeeping";
import EmployeeDataDialog from "../components/dialogDetailEmployee";
import InfoBox from "../components/dialongWarning";
import "../styles/App.css";
import "../styles/mobile.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D4AF37",
    },
    secondary: {
      main: "#D4AF37",
    },
  },
});

function App() {
  const [employeeData, setEmployeeData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeeId = localStorage.getItem("employee_id");
        if (!employeeId) {
          console.error("Employee ID not found in localStorage");
          return;
        }
        const response = await fetch(
          `https://be.lxrtam.net/employees/${employeeId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);
  const handleViewEmployeeInfo = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-custom px-10">
        <div className="header flex flex-col items-center p-4">
          <div className="header-left relative w-full">
            <div className="relative">
              <img
                src="/src1/name-date.png"
                alt="Name and Date"
                className="w-full max-w-screen-md h-auto min-w-[420px] -ml-20"
              />
              <div className="name-staff absolute text-white text-lg md:text-xl lg:text-2xl text-center right-2">
                {employeeData?.full_name || "Tên Nhân Viên"}
              </div>
              <div className="date-work absolute text-white text-base md:text-lg lg:text-xl text-center -right-10">
                {employeeData?.rank || "Nhân Viên"}
              </div>
            </div>
          </div>
        </div>
        <div className="body flex flex-col gap-4">
          <div className="body-left w-full">
            <div className="relative">
              <img src="/src1/count-salary.png" className="w-full h-auto" />
              <span className=" text-2xl absolute top-1/3 left_10pt ml-18">
                {localStorage.getItem("total_salary") || "15.000.000"} đ
              </span>
            </div>
          </div>
          <div className="list-item-mb mt-4">
            <div className="flex justify-between items-center gap-2 mt-2">
              <div className="flex items-center">
                <div className=" relative left-8 px-4 py-2 h-10 rounded-full w-32 bg-teal-500 text-white">
                  abc
                </div>
                <div className=" z-50 border border-cyan-50 px-4 py-2 h-12 rounded-full w-12 bg-teal-500 text-white ">
                  1
                </div>
              </div>
              <div className="flex items-center">
                <div className=" z-50 border border-cyan-5 px-4 py-2 h-12 rounded-full w-12 bg-violet-500 text-white ">
                  6
                </div>
                <div className="relative right-8 px-4 py-2 h-10 rounded-full w-32 bg-violet-500 text-white">
                  abc
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-2">
              <div className="flex items-center">
                <div className="px-4 py-2 h-10 rounded-full w-32 bg-amber-300 text-white">
                  abc
                </div>
                <div className="z-50 relative right-8 border border-cyan-50 px-4 py-2 h-12 rounded-full w-12 bg-amber-300 text-white ">
                  2
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative left-8 z-50 border border-cyan-5 px-4 py-2 h-12 rounded-full w-12 bg-amber-600 text-white ">
                  5
                </div>
                <div className=" px-4 py-2 h-10 rounded-full w-32 bg-amber-600 text-white">
                  abc
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-2">
              <div className="flex items-center">
                <div className="relative left-8 px-4 py-2 h-10 rounded-full w-32 bg-slate-400 text-white">
                  abc
                </div>
                <div className="z-50 border border-cyan-50 px-4 py-2 h-12 rounded-full w-12 bg-slate-400 text-white ">
                  3
                </div>
              </div>
              <div className="flex items-center">
                <div className="z-50 border border-cyan-5 px-4 py-2 h-12 rounded-full w-12 bg-orange-600 text-white ">
                  4
                </div>
                <div className="relative right-8 px-4 py-2 h-10 rounded-full w-32 bg-orange-600 text-white">
                  abc
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <InfoBox />
          <div className="flex gap-4 justify-center">
            <MUIButton variant="contained" color="primary">
              Xác nhận lương đã đúng
            </MUIButton>
            <MUIButton
              variant="outlined"
              color="secondary"
              onClick={handleViewEmployeeInfo}
            >
              Thông tin nhân viên
            </MUIButton>
          </div>
        </div>
        <EmployeeDataDialog open={dialogOpen} handleClose={handleCloseDialog} />
        <div className="tables-container flex flex-col gap-4 mt-8 px-4">
          {/* Thay đổi layout thành column */}
          <div className="w-full">
            <AttendanceTable />
          </div>
          <div className="w-full">
            <SalaryTable component={Paper} sx={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
