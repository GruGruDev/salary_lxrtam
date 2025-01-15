import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function InfoBox() {
  return (
    <Box
      sx={{
        maxWidth: "600px",
        maxHeight: "300px",
        backgroundColor: "rgba(3, 3, 3, 0.7)",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #FFD700",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: "0.9rem",
          fontWeight: 500,
          lineHeight: 1.6,
          color: "#FFFFFF",
          marginBottom: "15px",
        }}
      >
        NHÂN VIÊN VUI LÒNG{" "}
        <span
          style={{
            fontWeight: 600,
            color: "#FFD700",
            textDecoration: "underline",
          }}
        >
          KIỂM TRA LƯƠNG TRƯỚC 18H00 NGÀY 03 HÀNG THÁNG, NẾU CÓ THẮC MẮC GÌ VUI
          LÒNG LIÊN HỆ BỘ PHẬN HỖ TRỢ.
        </span>
        .
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          lineHeight: 1.6,
          color: "#FFFFFF",
          marginBottom: "15px",
        }}
      >
        SAU KHI{" "}
        <span style={{ fontWeight: 600, color: "#FFD700" }}>
          CHỌN XÁC NHẬN LƯƠNG
        </span>
        , HOẶC SAU THỜI GIAN NÀY,{" "}
        <span style={{ fontWeight: 600, color: "#FFD700" }}>
          MỌI ĐIỀU CHỈNH SẼ KHÔNG ĐƯỢC HỖ TRỢ
        </span>
        .
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: "0.9rem",
          fontWeight: 500,
          color: "#FFFFFF",
        }}
      >
        XIN CẢM ƠN.
      </Typography>
    </Box>
  );
}
