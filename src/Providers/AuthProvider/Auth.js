"use client";

import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const authContext = createContext();

const Auth = ({ children }) => {
  const router = useRouter();
  const [loadding, setLoadding] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_API;
  // ==================== LOGIN ================================
  const handleLogin = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/login`, values);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const profileQuery =useQueryClient()
  const handleLoginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: handleLogin,
    onSuccess: (data) => {
      toast.success("تم تسجيل الدخول بنجاح" || data?.message);
      profileQuery.invalidateQueries(["profile"]);
      Cookies.set("token", data?.token);
      if (data?.user?.role === "admin") {
        router.push("/Admin");
      } else if (data?.user?.role === "lawyer") {
        router.push("/Lawyer");
      }
    },onError:(err)=>{
      toast.error(err?.response?.data?.message)
    }
  });
  const handleLoginFun = (values) => {
    handleLoginMutation.mutate(values);
  };
  // ==================== GET PROFILE ================================
  const getProfile = async()=>{
    try {
      const { data } = await axios.get(`${baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    } 
  }
  const {data:profile}=useQuery({
    queryKey:["profile"],
    queryFn:getProfile
  })
  // ==================== UPDATE PROFILE ================================
 const handleUpdateProfile = async (values) => {
  try {
    setLoadding(true);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("phone", values.phone);

    if (values.profileImage instanceof File) {
      formData.append("profileImage", values.profileImage);
    }

    const { data } = await axios.put(
      `${baseUrl}/profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoadding(false);
  }
};
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const handleUpdateProfileMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: handleUpdateProfile,
    onSuccess: (data) => {
      toast.success(data?.message);
      profileQuery.invalidateQueries(["profile"]);
      setOpenUpdateProfile(false);

    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  })

  const handleUpdateProfileFun = (values) => {
    handleUpdateProfileMutation.mutate(values);
  }
  // ==================== LOGOUT ================================
 const handleLogout = async () => {
  try {
    setLoadding(true);

    const { data } = await axios.post(
      `${baseUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoadding(false);
  }
};

const handleLogoutMutation = useMutation({
  mutationKey: ["logout"],
  mutationFn: handleLogout,

  onSuccess: (data) => {
    toast.success(data?.message || "تم تسجيل الخروج بنجاح");

    Cookies.remove("token");

    router.push("/");
  },

  onError: (error) => {
    toast.error(
      error?.response?.data?.message || "حدث خطأ أثناء تسجيل الخروج"
    );
  },
});

const handleLogoutFun = () => {
  handleLogoutMutation.mutate();
};
// ==================== FORGET PASSWORD ================================
const handleForgetPassword = async (values) => {
  try {
    setLoadding(true);

    const { data } = await axios.post(`${baseUrl}/forgot-password`, values,{
      headers: {
Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    setLoadding(false);
  }
}
const handleForgetPasswordMutation = useMutation({
  mutationKey: ["forgetPassword"],
  mutationFn: handleForgetPassword,
  onSuccess: (data) => {
    toast.success(data?.message);
  },
  onError: (error) => {
    toast.error(error?.response?.data?.message);
  },
})
const handleForgetPasswordFun = (values) => {
  handleForgetPasswordMutation.mutate(values);
}
// ==================== RESET PASSWORD ================================

const handleResetPassword = async ({token, values}) => {
  try {
    setLoadding(true);

    const { data } = await axios.post(
      `${baseUrl}/reset-password/${token}`,
      values
    );

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoadding(false);
  }
};

const handleResetPasswordMutation = useMutation({
  mutationKey: ["resetPassword"],
  mutationFn: handleResetPassword,

  onSuccess: (data) => {
    toast.success(data?.message || "تم تغيير كلمة المرور بنجاح");
    router.push("/");
  },

  onError: (error) => {
    toast.error(
      error?.response?.data?.message ||
        "حدث خطأ أثناء إعادة تعيين كلمة المرور"
    );
  },
});

const handleResetPasswordFun = ({token, values}) => {
  handleResetPasswordMutation.mutate({
    token,
    values,
  });
};


  return (
    <authContext.Provider value={{ handleLoginFun, loadding ,profile,setOpenUpdateProfile,openUpdateProfile,handleUpdateProfileFun,handleLogoutFun,handleForgetPasswordFun,handleResetPasswordFun}}>
      {children}
    </authContext.Provider>
  );
};

export default Auth;
