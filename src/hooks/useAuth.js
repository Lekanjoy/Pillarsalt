import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (token && tokenExpiry) {
        const now = new Date();
        const expiryDate = new Date(tokenExpiry);

        if (expiryDate > now) {
          setIsAuthenticated(true);
        } else {
          // Token has expired
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const loginUser = (response) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("tokenExpiry", response.tokenExpiry);
    setIsAuthenticated(true);
    navigate("/");

  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return { isLoading, isAuthenticated, loginUser, logoutUser };
}
