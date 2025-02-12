"use client";

import { createContext, useState, useEffect, useContext } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { BaseUrlApi, ErrorMessage } from "../lib/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = Cookie.get("token");
    if (userToken) {
      const getProfile = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`${BaseUrlApi}/me`);
          setUser(data);
        } catch (error) {
          Cookie.remove("token");
          setUser(null);
          router.replace("/login");
        } finally {
          setLoading(false);
        }
      };
      getProfile();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      Cookie.set("token", urlToken, { expires: 1 });
    }
  }, []);

  // Logout function
  const logout = () => {
    setUser(null);
    Cookie.remove("token");
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
