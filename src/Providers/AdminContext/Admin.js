"use client";
import React, { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation.js";
export const AdminContext = createContext();
const Admin = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API;

  const router = useRouter();
  // ===================== DASHBOARD STATISITICS =================================
  const getDashboardStatisics = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/dashboard/statistics`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.statistics;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: dashboardStatisics } = useQuery({
    queryKey: ["dashboardStatisics"],
    queryFn: getDashboardStatisics,
  });
  // ===================== LAWYERS =================================
  const [loadding, setLoadding] = useState(false);
  const getLawyers = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/lawyer`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.lawyers;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: lawyers } = useQuery({
    queryKey: ["lawyers"],
    queryFn: getLawyers,
  });
  // =================== OFFICES ==========
  const handleGetOffices = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/offices`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.office;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: offices } = useQuery({
    queryKey: ["office"],
    queryFn: handleGetOffices,
  });
  // ====================================== USERS ====================================
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  // ===================================== CASES ================================
  const getCases = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/case`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.cases;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: cases } = useQuery({
    queryKey: ["cases"],
    queryFn: getCases,
  });

  // ==================================== timeline ================================
  const getTimeline = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/timeline`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.timeLine;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: timeLine } = useQuery({
    queryKey: ["timeLine"],
    queryFn: getTimeline,
  });

  return (
    <AdminContext.Provider
      value={{ lawyers, offices, dashboardStatisics, users, cases, timeLine }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default Admin;
