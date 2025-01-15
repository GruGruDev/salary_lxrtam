import React, { useEffect, useState } from "react";
import Desktop from "./pages/desktop";
import Login from "./pages/login";
import Mobile from "./pages/mobile";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    handleMediaQueryChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const employeeId = localStorage.getItem("employee_id");
      if (employeeId) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();

    window.addEventListener("beforeunload", () => {
      localStorage.removeItem("employee_id");
      setIsLoggedIn(false);
    });

    return () => window.removeEventListener("beforeunload", () => {});
  }, [isLoggedIn]);

  const handleLoginSuccess = (employeeId) => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <div>{isMobile ? <Mobile /> : <Desktop />}</div>;
}

export default App;
