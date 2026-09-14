"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
export const LawyerContext = createContext();

const LawyerProvider = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API;
  const [loadding, setLoadding] = useState(false);
  // ===================== DASHBOARD STATISITICS =================================
  const getDashboardStatisics = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/dashboard/statistics`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

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
  // ======================== CASES ================================
  // =============== GET CASES =================
  const getCases = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/case`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };
  const { data: cases } = useQuery({
    queryKey: ["cases"],
    queryFn: getCases,
  });
  // =============== POST CASES =================
  const handleAddCases = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/case`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddCase, setOpenAddCase] = useState(false);
  const caseQuery = useQueryClient();
  const handleAddCaseMutation = useMutation({
    mutationKey: ["addcase"],
    mutationFn: handleAddCases,
    onSuccess: (data) => {
      toast.success(data?.message || "تم اضافة القضيه بنجاح");
      caseQuery.invalidateQueries(["cases"]);
      setOpenAddCase(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ اثناء اضافة القضيه");
    },
  });
  const handleAddCaseFun = (values) => {
    handleAddCaseMutation.mutate(values);
  };
  // =============== UPDATE CASES =================
  const handleUpdateCases = async ({ values, id }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/case/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openUpdateCase, setOpenUpdateCase] = useState(false);
  const handleUpdateCaseMutation = useMutation({
    mutationKey: ["updatecase"],
    mutationFn: handleUpdateCases,
    onSuccess: (data) => {
      toast.success(data?.message || "تم تعديل القضيه بنجاح");
      caseQuery.invalidateQueries(["cases"]);
      setOpenUpdateCase(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ اثناء تعديل القضيه");
    },
  });
  const handleUpdateCaseFun = ({ values, id }) => {
    handleUpdateCaseMutation.mutate({ values, id });
  };

  // =============== DELETE CASES =================
  const handleDeleteCase = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/case/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openDeleteCase, setOpenDeleteCase] = useState(false);
  const handleDeleteCaseMutation = useMutation({
    mutationKey: ["deletecase"],
    mutationFn: handleDeleteCase,
    onSuccess: (data) => {
      toast.success(data?.message || "تم حذف القضيه بنجاح");
      caseQuery.invalidateQueries(["cases"]);
      setOpenDeleteCase(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ اثناء حذف القضيه");
    },
  });
  const handleDeleteCaseFun = (id) => {
    handleDeleteCaseMutation.mutate(id);
  };
  // =============== GET SESSIONS =================
  const getSessions = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/session`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };
  const { data: sessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: getSessions,
  });
  // =============== ADD CASES =================
  const handleAddSession = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/session`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const sessionQuery = useQueryClient();
  const [openAddSession, setOpenAddSession] = useState(false);
  const handleAddSessionMutation = useMutation({
    mutationKey: ["addsession"],
    mutationFn: handleAddSession,
    onSuccess: (data) => {
      toast.success(data?.message || "تم اضافة الجلسه بنجاح");
      sessionQuery.invalidateQueries(["sessions"]);
      setOpenAddSession(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ اثناء اضافة الجلسه");
    },
  });
  const handleAddSessionFun = (values) => {
    handleAddSessionMutation.mutate(values);
  };
  // =============== UPDATE CASES =================
  const handleUpdateSession = async ({ values, id }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/session/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openUpdateSession, setOpenUpdateSession] = useState(false);
  const handleUpdateSessionMutation = useMutation({
    mutationKey: ["updatesession"],
    mutationFn: handleUpdateSession,
    onSuccess: (data) => {
      toast.success(data?.message || "تم تعديل الجلسه بنجاح");
      sessionQuery.invalidateQueries(["sessions"]);
      setOpenUpdateSession(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ اثناء تعديل الجلسه");
    },
  });
  const handleUpdateSessionFun = ({ values, id }) => {
    handleUpdateSessionMutation.mutate({ values, id });
  };
  // =============== DELETE CASES =================
  const handleDeleteSession = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/session/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openDeleteSession, setOpenDeleteSession] = useState(false);
  const handleDeleteSessionMutation = useMutation({
    mutationKey: ["deletesession"],
    mutationFn: handleDeleteSession,
    onSuccess: (data) => {
      toast.success(data?.message || "تم حذف الجلسه بنجاح");
      sessionQuery.invalidateQueries(["sessions"]);
      setOpenDeleteSession(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطأ اثناء حذف الجلسه");
    },
  });
  const handleDeleteSessionFun = (id) => {
    handleDeleteSessionMutation.mutate(id);
  };
  // ===================== CASE TYPE ============
  const getCaseTypes = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/caseType`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.caseType;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const { data: caseType } = useQuery({
    queryKey: ["caseType"],
    queryFn: getCaseTypes,
  });
  // =======================  CLIENTS ====================
  // ===================== GET CLIENTS =================
  const getClients = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/clients`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });
  // ====================== CREATE CLIENTS ====================
  const handleAddClient = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/clients`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const clientQuery = useQueryClient();
  const [openAddClient, setOpenAddClient] = useState(false);
  const handleAddClientMutation = useMutation({
    mutationKey: ["addclient"],
    mutationFn: handleAddClient,
    onSuccess: (data) => {
      toast.success(data?.message || "تم اضافة العميل بنجاح");
      clientQuery.invalidateQueries(["clients"]);
      setOpenAddClient(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء اضافة العميل",
      );
    },
  });
  const handleAddClientFun = (values) => {
    handleAddClientMutation.mutate(values);
  };
  // ===================== UPDATE CLIENTS ====================
  const handleUpdateClient = async ({ values, id }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/clients/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openUpdateClient, setOpenUpdateClient] = useState(false);
  const handleUpdateClientMutation = useMutation({
    mutationKey: ["updateclient"],
    mutationFn: handleUpdateClient,
    onSuccess: (data) => {
      toast.success(data?.message || "تم تعديل العميل بنجاح");
      clientQuery.invalidateQueries(["clients"]);
      setOpenUpdateClient(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء تعديل العميل",
      );
    },
  });
  const handleUpdateClientFun = ({ values, id }) => {
    handleUpdateClientMutation.mutate({ values, id });
  };
  // ===================== DELETE CLIENTS ====================
  const handleDeleteClient = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/clients/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openDeleteClient, setOpenDeleteClient] = useState(false);
  const handleDeleteClientMutation = useMutation({
    mutationKey: ["deleteclient"],
    mutationFn: handleDeleteClient,
    onSuccess: (data) => {
      toast.success(data?.message || "تم حذف العميل بنجاح");
      clientQuery.invalidateQueries(["clients"]);
      setOpenDeleteClient(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطاء اثناء حذف العميل");
    },
  });
  const handleDeleteClientFun = (id) => {
    handleDeleteClientMutation.mutate(id);
  };
  // ===================== CATEGORIES ====================
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/category`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.categories;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  // ==================== DOCUMENT  ====================
  // ==================== GET DOCUMENT CATEGORIES ================================
  const getDocument = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/document`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data: documents } = useQuery({
    queryKey: ["documents"],
    queryFn: getDocument,
  });
  // ==================== CREATE DOCUMENT CATEGORIES ================================
  const handleAddDocument = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/document`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };

  const [openAddDocument, setOpenAddDocument] = useState(false);
  const documentQuery = useQueryClient();
  const handleAddDocumentMutation = useMutation({
    mutationKey: ["adddocument"],
    mutationFn: handleAddDocument,
    onSuccess: (data) => {
      toast.success(data?.message || "تم اضافة المستند بنجاح");
      documentQuery.invalidateQueries(["documents"]);
      setOpenAddDocument(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء اضافة المستند",
      );
    },
  });
  const handleAddDocumentFun = (values) => {
    handleAddDocumentMutation.mutate(values);
  };
  //  ==================== UPDATE DOCUMENT CATEGORIES ================================
  const handleUpdateDocument = async ({ id, values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/document/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };

  const [openUpdateDocument, setOpenUpdateDocument] = useState(false);
  const handleUpdateDocumentMutation = useMutation({
    mutationKey: ["updatedocument"],
    mutationFn: handleUpdateDocument,
    onSuccess: (data) => {
      toast.success(data?.message || "تم تعديل المستند بنجاح");
      documentQuery.invalidateQueries(["documents"]);
      setOpenUpdateDocument(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء تعديل المستند",
      );
    },
  });
  const handleUpdateDocumentFun = ({ id, values }) => {
    handleUpdateDocumentMutation.mutate({ id, values });
  };
  // ==================== DELETE DOCUMENT CATEGORIES ================================
  const handleDeleteDocument = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/document/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };

  const [openDeleteDocument, setOpenDeleteDocument] = useState(false);
  const handleDeleteDocumentMutation = useMutation({
    mutationKey: ["deletedocument"],
    mutationFn: handleDeleteDocument,
    onSuccess: (data) => {
      toast.success(data?.message || "تم حذف المستند بنجاح");
      documentQuery.invalidateQueries(["documents"]);
      setOpenDeleteDocument(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطاء اثناء حذف المستند");
    },
  });
  const handleDeleteDocumentFun = (id) => {
    handleDeleteDocumentMutation.mutate(id);
  };
  // ========================= NOTES ==========================
  // =================== CREATE NOTE ================================

  const handleAddNote = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/note`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddNote, setOpenAddNote] = useState(false);
  const noteQuery = useQueryClient();
  const handleAddNoteMutation = useMutation({
    mutationKey: ["addnote"],
    mutationFn: handleAddNote,
    onSuccess: (data) => {
      toast.success(data?.message || "تم اضافة الاشعار بنجاح");
      noteQuery.invalidateQueries(["notes"]);
      setOpenAddNote(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء اضافة الاشعار",
      );
    },
  });
  const handleAddNoteFun = (values) => {
    handleAddNoteMutation.mutate(values);
  };
  // ================== GET NOTE ================================

  const handleGetNote = async () => {
    try {
      setLoadding(true);
      const { data } = await axios.get(`${baseUrl}/note`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: handleGetNote,
  });
  // ================== UPDATE NOTE ================================
  const handleUpdateNote = async ({ values, id }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/note/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openUpdateNote, setOpenUpdateNote] = useState(false);
  const handleUpdateNoteMutation = useMutation({
    mutationKey: ["updatenote"],
    mutationFn: handleUpdateNote,
    onSuccess: (data) => {
      toast.success(data?.message || "تم تعديل الاشعار بنجاح");
      noteQuery.invalidateQueries(["notes"]);
      setOpenUpdateNote(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء تعديل الاشعار",
      );
    },
  });
  const handleUpdateNoteFun = ({ id, values }) => {
    handleUpdateNoteMutation.mutate({ id, values });
  };
  // ================== DELETE NOTE ================================

  const handleDeleteNote = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/note/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoadding(false);
    }
  };
  const [openDeleteNote, setOpenDeleteNote] = useState(false);
  const handleDeleteNoteMutation = useMutation({
    mutationKey: ["deletenote"],
    mutationFn: handleDeleteNote,
    onSuccess: (data) => {
      toast.success(data?.message || "تم حذف الاشعار بنجاح");
      noteQuery.invalidateQueries(["notes"]);
      setOpenDeleteNote(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطاء اثناء حذف الاشعار");
    },
  });
  const handleDeleteNoteFun = (id) => {
    handleDeleteNoteMutation.mutate(id);
  };
  // ================== TIMELINE ================================
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

  const { data: timeline } = useQuery({
    queryKey: ["timeline"],
    queryFn: getTimeline,
  });
  // ================== GET NOTIFICATIONS ==================
  const getNotifications = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/notifications`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data?.notifications;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
  // ================================== unread count ==================================

  const getUnreadNotifications = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/notifications/unread-count`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data: unreadNotifications } = useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: getUnreadNotifications,
  });
  // =============================== READ NOTIFICATION ====================
  const readNotification = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.patch(
        `${baseUrl}/notifications/${id}/read`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const notificationQuery = useQueryClient();
  const readNotificationMutation = useMutation({
    mutationKey: ["readnotification"],
    mutationFn: readNotification,
    onSuccess: (data) => {
      toast.success(data?.message || "تم قراءة الاشعار بنجاح");
      notificationQuery.invalidateQueries(["notifications"]);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء قراءة الاشعار",
      );
    },
  });
  const handleReadNotificationFun = (id) => {
    readNotificationMutation.mutate(id);
  };
  // ============================== READ ALL NOTIFICATION ====================
  const readNote = async () => {
    try {
      setLoadding(true);
      const { data } = await axios.patch(
        `${baseUrl}/notifications/read-all`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const readNoteMutation = useMutation({
    mutationKey: ["readnote"],
    mutationFn: readNote,
    onSuccess: (data) => {
      toast.success(data?.message || "تم قراءة الاشعارات بنجاح");
      noteQuery.invalidateQueries(["notifications"]);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء قراءة الاشعارات",
      );
    },
  });
  const handleReadNoteFun = () => {
    readNoteMutation.mutate();
  };
  return (
    <LawyerContext.Provider
      value={{
        dashboardStatisics,
        // cases
        cases,
        caseType,
        handleAddCaseFun,
        openAddCase,
        setOpenAddCase,
        handleUpdateCaseFun,
        openUpdateCase,
        setOpenUpdateCase,
        handleDeleteCaseFun,
        openDeleteCase,
        setOpenDeleteCase,
        loadding,
        // sessions
        handleAddSessionFun,
        openAddSession,
        setOpenAddSession,
        handleUpdateSessionFun,
        openUpdateSession,
        setOpenUpdateSession,
        handleDeleteSessionFun,
        openDeleteSession,
        setOpenDeleteSession,
        // clients
        clients,
        handleAddClientFun,
        openAddClient,
        setOpenAddClient,
        handleUpdateClientFun,
        openUpdateClient,
        setOpenUpdateClient,
        handleDeleteClientFun,
        openDeleteClient,
        setOpenDeleteClient,
        categories,
        // documents
        documents,
        handleAddDocumentFun,
        openAddDocument,
        setOpenAddDocument,
        handleUpdateDocumentFun,
        openUpdateDocument,
        setOpenUpdateDocument,
        handleDeleteDocumentFun,
        openDeleteDocument,
        setOpenDeleteDocument,
        // notes
        notes,
        handleAddNoteFun,
        openAddNote,
        setOpenAddNote,
        handleUpdateNoteFun,
        openUpdateNote,
        setOpenUpdateNote,
        handleDeleteNoteFun,
        openDeleteNote,
        setOpenDeleteNote,
        // timeline
        timeline,

        // notifications
        notifications,
        unreadNotifications,

        handleReadNotificationFun,
        handleReadNoteFun,
      }}
    >
      {children}
    </LawyerContext.Provider>
  );
};

export default LawyerProvider;
