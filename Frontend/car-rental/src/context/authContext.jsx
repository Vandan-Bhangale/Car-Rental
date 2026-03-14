import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserType(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_GENERAL_API}/api/status`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        setUser(data.user); //This is for user information if we want user specific info like name
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };
    checkAuthStatus();
  }, []);

  const Logout = async () => {
    try {
      const response = axios.get(
        `${import.meta.env.VITE_GENERAL_API}/api/logout`,
        { withCredentials: true },
      );
      setUser(null);
    } catch (err) {
      console.log("Error while logging out the user: ", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setUser, Logout, userType, setUserType,setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
