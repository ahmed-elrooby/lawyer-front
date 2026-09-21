"use client"
import axios from 'axios'
import React, { createContext,useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
export const OwnerContext =createContext()
const OwnerProvider = ({children}) => {
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
      
      throw error;
    }
  };
  const { data: dashboardStatisics } = useQuery({
    queryKey: ["dashboardStatisics"],
    queryFn: getDashboardStatisics,
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
     
      return data?.lawyers;
    } catch (error) {
      
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

     

      return data;
    } catch (err) {
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
     

      return data;
    } catch (error) {
      
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
   // =============== GET SESSIONS =================
  const getSessions = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/session`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data?.sessions;
    } catch (error) {
      throw error;
    }
  };
  const { data: sessions } = useQuery({
    queryKey: ["sessions"],
    queryFn: getSessions,
  });
  // =============== ADD SESSIONS =================
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
  // =============== UPDATE SESSIONS =================
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
  // =============== DELETE SESSIONS =================
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
      return data?.cases;
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

    const formData = new FormData();

    // ==============================
    // Case Data
    // ==============================

    formData.append("clientId", values.clientId || "");
    formData.append("caseNumber", values.caseNumber || "");
    formData.append("court", values.court || "");
    formData.append("status", values.status || "");
    formData.append("filingDate", values.filingDate || "");
    formData.append(
      "nextHearingDate",
      values.nextHearingDate || ""
    );
    formData.append(
      "description",
      values.description || ""
    );
    formData.append("notes", values.notes || "");

    // ==============================
    // Lawyers
    // ==============================

    if (values.lawyers?.length) {
      values.lawyers.forEach((lawyerId) => {
        formData.append("lawyers", lawyerId);
      });
    }

    // ==============================
    // Documents
    // ==============================

    if (values.documents?.length) {
      values.documents.forEach((document) => {
        formData.append("documents", document.file);

        formData.append(
          "documentNames",
          document.name || ""
        );
      });
    }

    // ==============================
    // API Request
    // ==============================

    const { data } = await axios.post(
      `${baseUrl}/case`,
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
  // ======================== delete document of case ================================
  const handleDeleteDocumentOfCase = async ({caseId, documentId}) => {
    try{
      setLoadding(true);
      const { data } = await axios.delete(`${baseUrl}/case/${caseId}/document/${documentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data;
    }catch(error){
      throw error;
    }finally{
      setLoadding(false);
    }
  }
  const handleDeleteDcomentOfCaseMutation = useMutation({
    mutationKey: ["deletedocumentofcase"],
    mutationFn: handleDeleteDocumentOfCase,
    onSuccess: (data) => {
      toast.success(data?.message || "تم حذف المستند بنجاح");
      caseQuery.invalidateQueries(["cases"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطاء اثناء حذف المستند");
    },
  })
  const handleDeleteDocumentOfCaseFun = ({caseId, documentId}) => {
    handleDeleteDcomentOfCaseMutation.mutate({caseId, documentId});
  }
  // =============== UPDATE CASES =================
const handleUpdateCases = async ({ values, id }) => {
  try {
    setLoadding(true);

    const formData = new FormData();

    formData.append("clientId", values.clientId);
    formData.append("caseNumber", values.caseNumber);
    formData.append("court", values.court || "");
    formData.append("status", values.status);
    formData.append("filingDate", values.filingDate);
    formData.append(
      "nextHearingDate",
      values.nextHearingDate || "",
    );
    formData.append(
      "description",
      values.description || "",
    );
    formData.append(
      "notes",
      values.notes || "",
    );

    formData.append(
      "lawyers",
      JSON.stringify(values.lawyers || []),
    );

    // =====================================
    // المستندات الجديدة
    // =====================================

    const newDocuments = values.documents?.filter(
      (document) => document.file instanceof File,
    ) || [];

    newDocuments.forEach((document) => {
      formData.append(
        "documents",
        document.file,
      );
    });

    // =====================================
    // أسماء المستندات الجديدة
    // =====================================

    const documentNames = newDocuments.map(
      (document) => document.name || "",
    );

    formData.append(
      "documentNames",
      JSON.stringify(documentNames),
    );

    // =====================================
    // المستندات القديمة المراد حذفها
    // =====================================

    formData.append(
      "deleteDocumentIds",
      JSON.stringify(
        values.deleteDocumentIds || [],
      ),
    );

    const { data } = await axios.put(
      `${baseUrl}/case/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoadding(false);
  }
};

const [openUpdateCase, setOpenUpdateCase] =
  useState(false);

const handleUpdateCaseMutation = useMutation({
  mutationKey: ["updatecase"],
  mutationFn: handleUpdateCases,

  onSuccess: (data) => {
    toast.success(
      data?.message || "تم تعديل القضيه بنجاح",
    );

    caseQuery.invalidateQueries(["cases"]);
    setOpenUpdateCase(false);
  },

  onError: (err) => {
    toast.error(
      err?.response?.data?.message ||
        "حدث خطأ اثناء تعديل القضيه",
    );
  },
});

const handleUpdateCaseFun = ({ values, id }) => {
  handleUpdateCaseMutation.mutate({
    values,
    id,
  });
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
  const getClients = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/clients`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
     
      return data?.clients;
    } catch (error) {
      
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

    const formData = new FormData();

    // ==============================
    // Client Data
    // ==============================

    formData.append("name", values.name);

    formData.append(
      "email",
      values.email || "",
    );

    formData.append(
      "phone",
      values.phone || "",
    );

    formData.append(
      "address",
      values.address || "",
    );

    formData.append(
      "city",
      values.city || "",
    );

    formData.append(
      "country",
      values.country || "",
    );

    formData.append(
      "nationalId",
      values.nationalId || "",
    );

    formData.append(
      "notes",
      values.notes || "",
    );

    // ==============================
    // Profile Image
    // ==============================

    if (values.profileImage) {
      formData.append(
        "profileImage",
        values.profileImage,
      );
    }

    // ==============================
    // Client Documents
    // ==============================

    if (
      values.documents &&
      values.documents.length > 0
    ) {
      values.documents.forEach((document) => {
        if (document.file) {
          formData.append(
            "documents",
            document.file,
          );
        }

        formData.append(
          "documentNames",
          document.name || "",
        );
      });
    }

    // ==============================
    // API Request
    // ==============================

    const { data } = await axios.post(
      `${baseUrl}/clients`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get(
            "token",
          )}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoadding(false);
  }
};


// ==========================================
// React Query
// ==========================================

const clientQuery = useQueryClient();

const [openAddClient, setOpenAddClient] =
  useState(false);

const handleAddClientMutation = useMutation({
  mutationKey: ["addclient"],

  mutationFn: handleAddClient,

  onSuccess: (data) => {
    toast.success(
      data?.message ||
        "تم إضافة العميل بنجاح",
    );

    clientQuery.invalidateQueries({
      queryKey: ["clients"],
    });

    setOpenAddClient(false);
  },

  onError: (err) => {
    toast.error(
      err?.response?.data?.message ||
        "حدث خطأ أثناء إضافة العميل",
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

    const formData = new FormData();

    // ==============================
    // Client Data
    // ==============================

    formData.append("name", values.name);

    formData.append(
      "email",
      values.email || "",
    );

    formData.append(
      "phone",
      values.phone || "",
    );

    formData.append(
      "address",
      values.address || "",
    );

    formData.append(
      "city",
      values.city || "",
    );

    formData.append(
      "country",
      values.country || "",
    );

    formData.append(
      "nationalId",
      values.nationalId || "",
    );

    formData.append(
      "notes",
      values.notes || "",
    );

    formData.append(
      "isActive",
      values.isActive ? "true" : "false",
    );

    // ==============================
    // Profile Image
    // ==============================

    if (values.profileImage) {
      formData.append(
        "profileImage",
        values.profileImage,
      );
    }

    // ==============================
    // New Client Documents
    // ==============================

    if (
      values.documents &&
      values.documents.length > 0
    ) {
      values.documents.forEach((document) => {
        if (document.file) {
          formData.append(
            "documents",
            document.file,
          );

          formData.append(
            "documentNames",
            document.name || "",
          );
        }
      });
    }

    // ==============================
    // API Request
    // ==============================

    const { data } = await axios.put(
      `${baseUrl}/clients/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get(
            "token",
          )}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoadding(false);
  }
};
// ==========================================
// React Query
// ==========================================

const [openUpdateClient, setOpenUpdateClient] =
  useState(false);

const handleUpdateClientMutation = useMutation({
  mutationKey: ["updateclient"],

  mutationFn: handleUpdateClient,

  onSuccess: (data) => {
    toast.success(
      data?.message ||
        "تم تعديل العميل بنجاح",
    );

    clientQuery.invalidateQueries({
      queryKey: ["clients"],
    });

    setOpenUpdateClient(false);
  },

  onError: (err) => {
    toast.error(
      err?.response?.data?.message ||
        "حدث خطأ أثناء تعديل العميل",
    );
  },
});

const handleUpdateClientFun = ({ values, id }) => {
  handleUpdateClientMutation.mutate({
    values,
    id,
  });
};//  ===================== delete document ====================

const handleDeleteClientDocument = async ({
  clientId,
  documentId,
}) => {
  try {
    setLoadding(true);

    const { data } = await axios.delete(
      `${baseUrl}/clients/${clientId}/document/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw error;
  } finally {
    setLoadding(false);
  }
};
const handleDeleteClientDocumentMutation = useMutation({
  mutationKey: ["deleteclientdocument"],
  mutationFn: handleDeleteClientDocument,
  onSuccess: (data) => {
    toast.success(
      data?.message ||
        "تم حذف المستند بنجاح",
    );
    clientQuery.invalidateQueries(["clients"]);
  },
  onError: (err) => {
    toast.error(
      err?.response?.data?.message ||
        "حدث خطاء اثناء حذف المستند",
    );
  },
})
const handleDeleteClientDocumentFun = ({
  clientId,
  documentId,
}) => {
  handleDeleteClientDocumentMutation.mutate({
    clientId,
    documentId,
  });
};
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

// ===================== TIMELINE ====================
const getTimeline = async (caseId = null) => {
  try {
    const query = caseId ? `?caseId=${caseId}` : "";

    const { data } = await axios.get(
      `${baseUrl}/timeline${query}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    return data?.timeLine || [];
  } catch (error) {
    return [];
  }
};

  // ================== GET NOTIFICATIONS ==================
  const getNotifications = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/notifications`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
     
      return data?.notifications;
    } catch (error) {
      
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
     
      return data;
    } catch (error) {
      
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
     
      return data;
    } catch (error) {
      
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
     
      return data;
    } catch (error) {
      
      throw error;
    }
  };
  const readNoteMutation = useMutation({
    mutationKey: ["readnote"],
    mutationFn: readNote,
    onSuccess: (data) => {
      toast.success(data?.message || "تم قراءة الاشعارات بنجاح");
      notificationQuery.invalidateQueries(["notifications"]);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء قراءة الاشعارات",
      );
    },
  });
const handleReadNoteFun = () => {
  readNoteMutation.mutate();
}
const getDocument = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/document`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
     
      return data?.attachments;
    } catch (error) {
      
      throw error;
    }
  };

const { data: documents = [] } = useQuery({
  queryKey: ["documents"],
  queryFn: getDocument,
});
  // ==================== CREATE DOCUMENT CATEGORIES ================================
const handleAddDocument = async (values) => {
  try {
    setLoadding(true);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description || "");
    formData.append("file", values.file);

    const { data } = await axios.post(
      `${baseUrl}/document`,
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

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append(
      "description",
      values.description || ""
    );

    if (values.file) {
      formData.append("file", values.file);
    }

    const { data } = await axios.put(
      `${baseUrl}/document/${id}`,
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
  // ================================ TASKS ======================
  const getTasks = async()=>{
    try{
      const {data}= await axios.get(`${baseUrl}/tasks`,{
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${Cookies.get("token")}`
        }
      })
      return data?.tasks
    }catch(err){
      throw err
    }
  }
  const {data:tasks}=useQuery({
    queryKey:["tasks"],
    queryFn:getTasks
  })
// ===================== ADD TASKS ============
const handleAddTask = async(values)=>{
  try{
    setLoadding(true)
    const {data}= await axios.post(`${baseUrl}/tasks`,values,{
      headers:{
  "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,      }
    })
    return data
  }catch(err){
    throw err
  }finally{
    setLoadding(false)
  }
}
const [openAddTask,setOpenAddTask]=useState(false)
const taskQuery = useQueryClient()
const handleAddTaskMutation=useMutation({
  mutationKey:["addtask"],
  mutationFn:handleAddTask,
  onSuccess:(data)=>{
    toast.success(data?.message || "تم اضافة المهمه بنجاح")
    taskQuery.invalidateQueries(["tasks"])
    setOpenAddTask(false)
  },
  onError:(err)=>{
    toast.error(err?.response?.data?.message || "حدث خطأ ")
  }
})
const handleAddTaskFunc = (values)=>{
  handleAddTaskMutation.mutate(values)
}
// =================== DELETE TASK =====================
const handleDeleteTask =async(id)=>{
  try{
    setLoadding(true)
    const {data}= await axios.delete(`${baseUrl}/tasks/${id}`,{
      headers:{
  "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,      }
    })
    return data
  }catch(err){
    throw err
  }finally{
    setLoadding(false)
  }
}
const [openDeleteTask,setOpenDeleteTask]=useState(false)
const handleDeleteTaskMutation=useMutation({
  mutationKey:["deletetask"],
  mutationFn:handleDeleteTask,
  onSuccess:(data)=>{
    toast.success(data?.message || "تم حذف المهمه بنجاح")
    taskQuery.invalidateQueries(["tasks"])
    setOpenDeleteTask(false)
  },
  onError:(err)=>{
    toast.error(err?.response?.data?.message || "حدث خطاء ")
  }
})
const handleDeleteTaskFun = (id)=>{
  handleDeleteTaskMutation.mutate(id)
}
// ========================= UPDATE TASK ====================
const handleUpdateTask = async({id,values})=>{
  try{
    setLoadding(true)
    const {data}= await axios.put(`${baseUrl}/tasks/${id}`,values,{
      headers:{
  "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,      }
    })
    return data
  }catch(err){
    throw err
  }finally{
    setLoadding(false)
  }
}
const [openUpdateTask,setOpenUpdateTask]=useState(false)
const handleUpdateTaskMutation=useMutation({
  mutationKey:["updatetask"],
  mutationFn:handleUpdateTask,
  onSuccess:(data)=>{
    toast.success(data?.message || "تم تعديل المهمه بنجاح")
    taskQuery.invalidateQueries(["tasks"])
    setOpenUpdateTask(false)
  },
  onError:(err)=>{
    toast.error(err?.response?.data?.message || "حدث خطاء ")
  }
})
const handleUpdateTaskFun = ({id,values})=>{
  handleUpdateTaskMutation.mutate({id,values})
}

  return <OwnerContext.Provider value={{lawyers,handleDeleteLawyerFun,openDeleteLawyer
    ,sessions,openAddSession, setOpenAddSession,handleAddSessionFun,setOpenUpdateSession,openUpdateSession,handleUpdateSessionFun,openDeleteSession,handleDeleteSessionFun,setOpenDeleteSession,
  setOpenDeleteLawyer,handleAddLawyerFun,openAddLawyer,clients,handleAddClientFun,openAddClient,handleUpdateClientFun,openUpdateClient,setOpenUpdateClient,setOpenAddClient,
  setOpenAddLawyer,handleUpdateLawyerFun,openUpdateLawyer,loadding,getTimeline,handleDeleteClientDocumentFun,handleDeleteClientFun,openDeleteClient, setOpenDeleteClient,
  setOpenUpdateLawyer,dashboardStatisics,openUpdateCase,setOpenUpdateCase,handleUpdateCaseFun,cases,handleAddCaseFun,handleDeleteDocumentOfCaseFun,handleDeleteCaseFun,setOpenAddCase,openAddCase,setOpenDeleteCase,openDeleteCase
  ,handleReadNoteFun,handleReadNotificationFun,unreadNotifications,notifications,
  handleDeleteDocumentFun,openDeleteDocument, setOpenDeleteDocument,handleUpdateDocumentFun,
  openUpdateDocument, setOpenUpdateDocument,openAddDocument, setOpenAddDocument,handleAddDocumentFun,documents,
  tasks,handleAddTaskFunc,openAddTask,setOpenAddTask,handleDeleteTaskFun,openDeleteTask,setOpenDeleteTask,
  openUpdateTask,setOpenUpdateTask,handleUpdateTaskFun
  
  }}>
  {children}
  </OwnerContext.Provider>
}

export default OwnerProvider
