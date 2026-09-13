"use client";
import React, { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation.js";
export const AdminContext = createContext();
const Admin = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API;
  const [loadding, setLoadding] = useState(false);

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
  // ===================== EXPORT DASHBOARD STATISITICS =================================
const handleExportDashboardStatisics = async () => {
  const { data } = await axios.get(
    `${baseUrl}/dashboard/statistics/export`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      responseType: "blob",
    }
  );

  return data;
};
const {
  mutate: exportDashboardStatisics,
  isPending: isExportingDashboardStatisics,
} = useMutation({
  mutationFn: handleExportDashboardStatisics,
});
  // ===================== LAWYERS =================================
  // ============================== GET KAWYERS ========================
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
  // ======================================= CREATE LAWYERS ================
  const handleAddLawyers = async (values) => {
    try {
      setLoadding(true);

      const formdata = new FormData();

      formdata.append("name", values.name);
      formdata.append("email", values.email);
      formdata.append("password", values.password);
      formdata.append("phone", values.phone);

      if (values.profileImage) {
        formdata.append("profileImage", values.profileImage);
      }

      const { data } = await axios.post(`${baseUrl}/lawyer`, formdata, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddLawyer, setOpenAddLawyer] = useState(false);
  const lawyerQuery = useQueryClient();
  const handleAddLawyerMutation = useMutation({
    mutationKey: ["addlawyer"],
    mutationFn: handleAddLawyers,
    onSuccess: (data) => {
      toast.success(data?.message || "تم اضافة المحامي بنجاح");
      lawyerQuery.invalidateQueries(["lawyers"]);
      setOpenAddLawyer(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message | "حدث خطأ اثناء اضافة المحامي ",
      );
    },
  });
  const handleAddLawyerFun = (values) => {
    handleAddLawyerMutation.mutate(values);
  };
  // ====================================== DELETE LAWYER =======================
  const handleDeleteLawyer = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/lawyer/${id}`, {
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
    } finally {
      setLoadding(false);
    }
  };
  const [openDeleteLawyer, setOpenDeleteLawyer] = useState(false);
  const handleDeleteLawyerMutation = useMutation({
    mutationKey: ["deleteLawyer"],
    mutationFn: handleDeleteLawyer,
    onSuccess: (data) => {
      toast.success(data?.message || "تم حذف المحامي بنجاح");
      lawyerQuery.invalidateQueries(["lawyers"]);
      setOpenDeleteLawyer(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حصل خطا اثناء حذف المحامي");
    },
  });
  const handleDeleteLawyerFun = (id) => {
    handleDeleteLawyerMutation.mutate(id);
  };
  // ======================================== UPDATE LAWYER =============================

  const handleUpdateLawyer = async ({ values, id }) => {
    try {
      setLoadding(true);

      const formdata = new FormData();

      formdata.append("name", values.name);
      formdata.append("email", values.email);
      formdata.append("phone", values.phone);

      if (values.profileImage) {
        formdata.append("profileImage", values.profileImage);
      }

      const { data } = await axios.put(`${baseUrl}/lawyer/${id}`, formdata, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoadding(false);
    }
  };

  const [openUpdateLawyer, setOpenUpdateLawyer] = useState(false);
  const handleUpdateLawyerMutation = useMutation({
    mutationKey: ["updatelawyer"],
    mutationFn: handleUpdateLawyer,
    onSuccess: (data) => {
      toast.success(data?.message || "تم تعديل بيانات المحامي بنجاح");
      lawyerQuery.invalidateQueries(["lawyers"]);
      setOpenUpdateLawyer(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدثخطأ اثناء التعديل ");
    },
  });
  const handleUpdateLawyerFun = ({ values, id }) => {
    handleUpdateLawyerMutation.mutate({ values, id });
  };
  // ====================================== USERS ====================================
  // ============================== GET USERS ====================
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
  // =============================== CREATE USER =================
  const createUser = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/users`, values, {
        headers: {
          "Content-Type": "mutipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddUser, setOpenAddUser] = useState(false);
  const userQuery = useQueryClient();
  const handleAddUserMutation = useMutation({
    mutationKey: ["addUser"],
    mutationFn: createUser,
    onSuccess: (data) => {
      toast.success("تم اضافة المستخدم بنجاح" || data?.message);
      userQuery.invalidateQueries(["users"]);
      setOpenAddUser(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleAddUserFun = (values) => {
    handleAddUserMutation.mutate(values);
  };
  // ================================= DELETE USER ================================
  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`${baseUrl}/users/${id}`, {
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
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const handleDeleteUserMutation = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: handleDeleteUser,
    onSuccess: (data) => {
      toast.success("تم حذف المستخدم بنجاح" || data?.message);
      userQuery.invalidateQueries(["users"]);
      setOpenDeleteUser(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleDeleteUserFun = (id) => {
    handleDeleteUserMutation.mutate(id);
  };
  // ================================== UPDATE USER ================================
  const updateUser = async ({ id, values }) => {
    try {
      const formdata = new FormData();

      formdata.append("name", values.name);
      formdata.append("email", values.email);
      formdata.append("phone", values.phone);

      // الصورة الجديدة
      if (values.profileImage) {
        formdata.append("profileImage", values.profileImage);
      }

      setLoadding(true);

      const { data } = await axios.put(`${baseUrl}/users/${id}`, formdata, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const handleUpdateUserMutation = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success("تم تعديل المستخدم بنجاح" || data?.message);
      userQuery.invalidateQueries(["users"]);
      setOpenUpdateUser(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleUpdateUserFun = ({ id, values }) => {
    handleUpdateUserMutation.mutate({ id, values });
  };
  // ================================= OFFICES ================================
  // =============================== GET OFFICES ================================
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
  // =============================== CREATE OFFICE ================================
  const handleAddOffice = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/offices`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddOffice, setOpenAddOffice] = useState(false);
  const officeQuery = useQueryClient();
  const handleAddOfficeMutation = useMutation({
    mutationKey: ["addOffice"],
    mutationFn: handleAddOffice,
    onSuccess: (data) => {
      toast.success("تم اضافة المكتب بنجاح" || data?.message);
      officeQuery.invalidateQueries(["office"]);
      setOpenAddOffice(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleAddOfficeFun = (values) => {
    handleAddOfficeMutation.mutate(values);
  };
  // ================================== DELETE OFFICE ================================
  const handleDeleteOffice = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/offices/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openDeleteOffice, setOpenDeleteOffice] = useState(false);
  const handleDeleteOfficeMutation = useMutation({
    mutationKey: ["deleteOffice"],
    mutationFn: handleDeleteOffice,
    onSuccess: (data) => {
      toast.success("تم حذف المكتب بنجاح" || data?.message);
      officeQuery.invalidateQueries(["office"]);
      setOpenDeleteOffice(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleDeleteOfficeFun = (id) => {
    handleDeleteOfficeMutation.mutate(id);
  };
  // ================================= UPDATE OFFICE ================================
  const handleUpdateOffice = async ({ id, values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/offices/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openUpdateOffice, setOpenUpdateOffice] = useState(false);
  const handleUpdateOfficeMutation = useMutation({
    mutationKey: ["updateOffice"],
    mutationFn: handleUpdateOffice,
    onSuccess: (data) => {
      toast.success("تم تعديل المكتب بنجاح" || data?.message);
      officeQuery.invalidateQueries(["office"]);
      setOpenUpdateOffice(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleUpdateOfficeFun = ({ id, values }) => {
    handleUpdateOfficeMutation.mutate({ id, values });
  };
  // ===================================== CASES TYPES ================================
  // =============================== ADD CASES TYPES ================================
  const handleAddCaseType = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/caseType`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddCaseType, setOpenAddCaseType] = useState(false);
  const caseTypeQuery = useQueryClient();
  const handleAddCaseTypeMutation = useMutation({
    mutationKey: ["addCaseType"],
    mutationFn: handleAddCaseType,
    onSuccess: (data) => {
      toast.success("تم اضافة نوع الحالة بنجاح" || data?.message);
      caseTypeQuery.invalidateQueries(["caseType"]);
      setOpenAddCaseType(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleAddCaseTypeFun = (values) => {
    handleAddCaseTypeMutation.mutate(values);
  };
  // ===================================== GET CASES TYPES ================
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
  const { data: caseTypes } = useQuery({
    queryKey: ["caseTypes"],
    queryFn: getCaseTypes,
  });
  // ===================================== DELETE CASES TYPES ================================
  const handleDeleteCaseType = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/caseType/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openDeleteCaseType, setOpenDeleteCaseType] = useState(false);

  const handleDeleteCaseTypeMutation = useMutation({
    mutationKey: ["deleteCaseType"],
    mutationFn: handleDeleteCaseType,
    onSuccess: (data) => {
      toast.success("تم حذف نوع الحالة بنجاح" || data?.message);
      caseTypeQuery.invalidateQueries(["caseType"]);
      setOpenDeleteCaseType(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleDeleteCaseTypeFun = (id) => {
    handleDeleteCaseTypeMutation.mutate(id);
  };
  // ===================================== UPDATE CASES TYPES ================================
  const handleUpdateCaseType = async ({ id, values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/caseType/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openUpdateCaseType, setOpenUpdateCaseType] = useState(false);

  const handleUpdateCaseTypeMutation = useMutation({
    mutationKey: ["updateCaseType"],
    mutationFn: handleUpdateCaseType,
    onSuccess: (data) => {
      toast.success("تم تعديل نوع الحالة بنجاح" || data?.message);
      caseTypeQuery.invalidateQueries(["caseType"]);
      setOpenUpdateCaseType(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleUpdateCaseTypeFun = ({ id, values }) => {
    handleUpdateCaseTypeMutation.mutate({ id, values });
  };
  // ==================================== DOCUMENT CATEGORIES ====================
  // ===================================== ADD DOCUMENT CATEGORIES ================================
  const handleAddDocumentCategory = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/category`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const categoryQuery = useQueryClient();

  const handleAddCategoryMutation = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: handleAddDocumentCategory,
    onSuccess: (data) => {
      toast.success("تم اضافة فئة المستند بنجاح" || data?.message);
      categoryQuery.invalidateQueries(["category"]);
      setOpenAddCategory(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleAddCategoryFun = (values) => {
    handleAddCategoryMutation.mutate(values);
  };
  // ===================================== GET DOCUMENT CATEGORIES ================================
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
    queryKey: ["category"],
    queryFn: getCategories,
  });
  // ===================================== DELETE DOCUMENT CATEGORIES ================================
  const handleDeleteCategory = async (id) => {
    try {
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/category/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };

  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);

  const handleDeleteCategoryMutation = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: handleDeleteCategory,
    onSuccess: (data) => {
      toast.success("تم حذف فئة المستند بنجاح" || data?.message);
      categoryQuery.invalidateQueries(["category"]);
      setOpenDeleteCategory(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });

  const handleDeleteCategoryFun = (id) => {
    handleDeleteCategoryMutation.mutate(id);
  };
  // ===================================== UPDATE DOCUMENT CATEGORIES ================================
  const handleUpdateCategory = async ({ id, values }) => {
    try {
      setLoadding(true);
      const { data } = await axios.put(`${baseUrl}/category/${id}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoadding(false);
    }
  };

  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);

  const handleUpdateCategoryMutation = useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: handleUpdateCategory,
    onSuccess: (data) => {
      toast.success("تم تعديل فئة المستند بنجاح" || data?.message);
      categoryQuery.invalidateQueries(["category"]);
      setOpenUpdateCategory(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });

  const handleUpdateCategoryFun = ({ id, values }) => {
    handleUpdateCategoryMutation.mutate({ id, values });
  };
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
  // =================================== NOTIFICATIONS ================================
  const getNotifications = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/notifications`, {
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
  // =================================== GET UNREAD NOTIFICATIONS ================================
  const getUnreadNotifications = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/notifications/unread-count`, {
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
  }
  const { data: unreadNotifications } = useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: getUnreadNotifications,
  });
  // =================================== markAsRead ================================
const handleMarkAsRead = async (id) => {
  try {
    setLoadding(true);
    const { data } = await axios.patch(`${baseUrl}/admin/notifications/${id}/read`, {
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
  }finally{
    setLoadding(false);
  }
}
const notificationsQuery=useQueryClient()
const handleMarkAsReadFunMutation = useMutation({
  mutationKey: ["markAsRead"],
  mutationFn: handleMarkAsRead,
  onSuccess: (data) => {
    notificationsQuery.invalidateQueries(["notifications"]);
    toast.success("تم قراءة الاشعار بنجاح" || data?.message);
  },
  onError: (error) => {
    console.log(error);
    toast.error(error?.response?.data?.message);
  },
})
const handleMarkAsReadFun=(id)=>{
  handleMarkAsReadFunMutation.mutate(id)
}
// ================================= HANDLE READ ALL NOTIFICATIONS ================================
const handleReadAllNotifications = async () => {
  try {
    setLoadding(true);
    const { data } = await axios.patch(`${baseUrl}/admin/notifications/read-all`, {
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
  }finally{
    setLoadding(false);
  }
};
const handleReadAllNotificationsFunMutation = useMutation({
  mutationKey: ["readAllNotifications"],
  mutationFn: handleReadAllNotifications,
  onSuccess: (data) => {
    notificationsQuery.invalidateQueries(["notifications"]);
    toast.success("تم قراءة جميع الاشعارات بنجاح" || data?.message);
  },
  onError: (error) => {
    console.log(error);
    toast.error(error?.response?.data?.message);
  },
})
const handleReadAllNotificationsFun=()=>{
  handleReadAllNotificationsFunMutation.mutate()
}
  return (
    <AdminContext.Provider
      value={{
        dashboardStatisics,exportDashboardStatisics,
isExportingDashboardStatisics,
        // users
        users,
        loadding,
        openAddUser,
        setOpenAddUser,
        handleAddUserFun,
        openDeleteUser,
        setOpenDeleteUser,
        handleDeleteUserFun,
        handleUpdateUserFun,
        openUpdateUser,
        setOpenUpdateUser,
        // Offices
        openAddOffice,
        setOpenAddOffice,
        handleAddOfficeFun,
        offices,
        openDeleteOffice,
        setOpenDeleteOffice,
        handleDeleteOfficeFun,
        openUpdateOffice,
        setOpenUpdateOffice,
        handleUpdateOfficeFun,
        //     lawyers

        lawyers,
        handleAddLawyerFun,
        openAddLawyer,
        setOpenAddLawyer,
        openDeleteLawyer,
        setOpenDeleteLawyer,
        handleDeleteLawyerFun,
        handleUpdateLawyerFun,
        openUpdateLawyer,
        setOpenUpdateLawyer,
        timeLine,
        // cases type

        handleUpdateCaseTypeFun,
        openUpdateCaseType,
        setOpenUpdateCaseType,
        caseTypes,
        openDeleteCaseType,
        setOpenDeleteCaseType,
        handleDeleteCaseTypeFun,
        openAddCaseType,
        setOpenAddCaseType,
        handleAddCaseTypeFun,
        // categorie
        openAddCategory,
        setOpenAddCategory,
        handleAddCategoryFun,
        categories,
        openDeleteCategory,
        setOpenDeleteCategory,
        handleDeleteCategoryFun,
        openUpdateCategory,
        setOpenUpdateCategory,
        handleUpdateCategoryFun,
        // notifications
        notifications,unreadNotifications,
        handleMarkAsReadFun,handleReadAllNotificationsFun
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default Admin;
