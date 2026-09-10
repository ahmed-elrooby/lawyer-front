"use client";

import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const authContext = createContext();

const Auth = ({ children }) => {
  const router = useRouter();
  const [loadding, setLoadding] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API;
  const handleLogin = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/login`, values);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const handleLoginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogin,
    onSuccess: (data) => {
      toast.success("تم تسجيل الدخول بنجاح" || data?.message);
      Cookies.set("token", data?.token);
      if (data?.user?.role === "admin") {
        router.push("/Admin");
      } else if (data?.user?.role === "lawyer") {
        router.push("/");
      }
    },
  });
  const handleLoginFun = (values) => {
    handleLoginMutation.mutate(values);
  };
  return (
    <authContext.Provider value={{ handleLoginFun, loadding }}>
      {children}
    </authContext.Provider>
  );
};

export default Auth;
