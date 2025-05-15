import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import api, { setAuth, clearAuth } from "../utils/api.js";
import { jwtDecode } from "jwt-decode";
import { ApiError } from "@/utils/apiError.js";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [account, setAccount] = useState(() => {
    const maybeJwt = localStorage.getItem("jwt");

    if (maybeJwt) {
      const decodedJwt = jwtDecode(maybeJwt);
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwt");
        return null;
      }
      return decodedJwt;
    }
    return null;
  });


    console.log(account);

  const login = async (data) => {
    try {
      const response = await api.post("/auth/token", data);
      const jwt = response.data.data;
      localStorage.setItem("jwt", jwt);
      setAccount(jwtDecode(jwt));
      setAuth(jwt);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ?? error?.message ?? "Unknown error";
        const errorStatus = error?.response?.status
      throw new ApiError(errorMessage, errorStatus);
    }
  };

  const register = async ({ username, password }) => {
    return await api.post("/auth/register", {
      username,
      password,
    });
  };

  const logout = () => {
    setAccount(null);
    clearAuth();
    localStorage.removeItem("jwt");
    navigate("/home");
  };

  return (
    <AuthContext.Provider value={{ account, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
