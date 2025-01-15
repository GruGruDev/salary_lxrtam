import { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [route, setRoute] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`https://be.lxrtam.net/router/${route}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || "Mã không hợp lệ";
        throw new Error(errorMessage);
      }

      localStorage.setItem("employee_id", data.employee_id);
      localStorage.setItem("isLoggedIn", "true"); // Thêm "dấu ấn" đăng nhập
      onLoginSuccess(data.employee_id); 
    } catch (err) {
      if (err.message === "Response is not JSON") {
        setError("Lỗi server: Response không hợp lệ.");
      } else {
        setError(err.message || "Đã có lỗi xảy ra. Vui lòng thử lại");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url(/src1/bglogin.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-8">
        <img src="/src1/logoTM.png" alt="Logo" className="w-60 h-60" />
      </div>

      <h2 className="text-3xl font-bold text-yellow-400 mb-8">
        Thông Tin Lương Nhân Viên
      </h2>

      <div className="w-full max-w-md px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 text-yellow-400 rounded-full border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-400/50"
              placeholder="Mã Xem Lương"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={handleTogglePasswordVisibility}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-full hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a
            href="https://zalo.me/0703049170"
            target="_blank"
            className="text-yellow-400 text-sm hover:underline"
          >
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;