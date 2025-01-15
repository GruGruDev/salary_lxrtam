import { Button as MUIButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import SalaryTable from "../common/salaryTable";
import AttendanceTable from "../common/timekeeping";
import EmployeeDataDialog from "../components/dialogDetailEmployee";
import InfoBox from "../components/dialongWarning";
import "../styles/App.css";
import "../styles/desktop.css";
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
      <div className="bg-custom px-4">
        <div className="header flex justify-between items-center p-4">
          <div className="header-left relative">
            <div className="relative">
              <img
                src="/src1/name-date.png"
                alt="Name and Date"
                className="max-w-[550px] h-auto"
              />
              <div className="name-staff absolute text-white top-6 text-lg left-8 ml-40 mt-4">
                {employeeData?.full_name || "Tên Nhân Viên"}
              </div>
            </div>
            <div className="date-work absolute text-white text-sm top-14 ml-60 ml-5 mt-7">
              {employeeData?.position || "Chức vụ"}
            </div>
          </div>
        </div>
        <div className="body flex justify-between">
          {/* Giữ layout flex cho desktop */}
          <div className="body-left w-1/4 flex flex-col gap-4">
            <div className="list-item">
              <div className=" box-item">
                <div className="bg-red-500 text-white font-bold rounded-lg w-96 rounded-bl-lg relative h-20 px-8 py-4">
                  <span className=" absolute bottom-3 left-3 text-xl">01</span>{" "}
                  <div className="bg-white flex-grow rounded-lg shadow-lg h-24 text-black text-center w-96 h-24 left-10 rounded-bl-3xl absolute">
                    {" "}
                    Ngày Công: 26 Ngày
                  </div>
                </div>
              </div>
              <div className=" box-item">
                <div className="bg-yellow-500 text-white font-bold rounded-lg w-96 rounded-bl-lg relative h-20 px-8 py-4">
                  <span className=" absolute bottom-3 left-3 text-xl">02</span>{" "}
                  <div className="bg-white flex-grow rounded-lg shadow-lg h-24 text-black text-center w-96 h-24 left-10 rounded-bl-3xl absolute">
                    {" "}
                    Lương Giờ : 53.000
                  </div>
                </div>
              </div>
              <div className=" box-item">
                <div className="bg-pink-500 text-white font-bold rounded-lg w-96 rounded-bl-lg relative h-20 px-8 py-4">
                  <span className=" absolute bottom-3 left-3 text-xl">03</span>{" "}
                  <div className="bg-white flex-grow rounded-lg shadow-lg h-24 text-black text-center w-96 h-24 left-10 rounded-bl-3xl absolute">
                    {" "}
                    abcc
                  </div>
                </div>
              </div>

              <div className=" box-item">
                <div className="bg-green-500 text-white font-bold rounded-lg w-96 rounded-bl-lg relative h-20 px-8 py-4">
                  <span className=" absolute bottom-3 left-3 text-xl">04</span>{" "}
                  <div className="bg-white flex-grow rounded-lg shadow-lg h-24 text-black text-center w-96 h-24 left-10 rounded-bl-3xl absolute">
                    {" "}
                    abcc
                  </div>
                </div>
              </div>
              <div className=" box-item">
                <div className="bg-blue-500 text-white font-bold rounded-lg w-96 rounded-bl-lg relative h-20 px-8 py-4">
                  <span className=" absolute bottom-3 left-3 text-xl">05</span>{" "}
                  <div className="bg-white flex-grow rounded-lg shadow-lg h-24 text-black text-center w-96 h-24 left-10 rounded-bl-3xl absolute">
                    {" "}
                    abcc
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "50px", marginTop: "60px" }}></div>

          {/* Điều chỉnh chiều rộng cho phù hợp */}
          <div 
            className="relative btn-salary-container"
            style={{ position: "relative" }}
          >
           
            {/* Nút btn-salary */}
            <div className="relative btn-salary">
              <img
                src="/src1/count-salary.png"
                style={{ width: "400px", height: "auto" }}
                className="-mt-20"
              />
              <span className="text-2xl absolute -top-10 left_10pt ml-10 mt-20 text-black-600 font-bold">
                {localStorage.getItem("total_salary") || "15.000.000"} đ
              </span>
              <InfoBox className="mt-25" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <MUIButton variant="contained" color="primary">
            Xác nhận lương đã đúng
          </MUIButton>
          <MUIButton
            variant="contained"
            color="secondary"
            onClick={handleViewEmployeeInfo}
          >
            {" "}
            {/* Thêm onClick */}
            Thông tin nhân viên
          </MUIButton>
        </div>
        <div className="tables-container flex justify-between gap-4 mt-8 px-4">
          <div className="flex-1">
            <SalaryTable />
          </div>
          <div className="flex-1">
            <AttendanceTable />
          </div>
        </div>
        {/* Thêm Dialog */}
        <EmployeeDataDialog open={dialogOpen} handleClose={handleCloseDialog} />
      </div>
    </ThemeProvider>
  );
}

export default App;
