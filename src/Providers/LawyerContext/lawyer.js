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
  // ===================== CASE TYPE ============
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
  // ===================================== ADD CASES TYPES ================================
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
      return data?.clients;
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

    const { data } = await axios.put(
      `${baseUrl}/clients/${id}`,
      values,
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
};
//  ===================== delete document ====================

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
      return data?.attachments;
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
  // ========================= NOTES ==========================
  // =================== CREATE NOTE ================================

  const handleAddNote = async (values) => {
    try {
      setLoadding(true);
      const { data } = await axios.post(`${baseUrl}/notes`, values, {
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
      toast.success(data?.message || "تم اضافة الملاحظه بنجاح");
      noteQuery.invalidateQueries(["notes"]);
      setOpenAddNote(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء اضافة الملاحظه",
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
      const { data } = await axios.get(`${baseUrl}/notes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return data?.notes;
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
      const { data } = await axios.put(`${baseUrl}/notes/${id}`, values, {
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
      toast.success(data?.message || "تم تعديل الملاحظه بنجاح");
      noteQuery.invalidateQueries(["notes"]);
      setOpenUpdateNote(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "حدث خطاء اثناء تعديل الملاحظه",
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
      const { data } = await axios.delete(`${baseUrl}/notes/${id}`, {
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
      toast.success(data?.message || "تم حذف الملاحظه بنجاح");
      noteQuery.invalidateQueries(["notes"]);
      setOpenDeleteNote(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "حدث خطاء اثناء حذف الملاحظه");
    },
  });
  const handleDeleteNoteFun = (id) => {
    handleDeleteNoteMutation.mutate(id);
  };
  // ================== TIMELINE ================================

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
}
  return (
    <LawyerContext.Provider
      value={{
        dashboardStatisics,
        // cases
        cases,
        handleAddCaseFun,
        openAddCase,
        setOpenAddCase,
        handleUpdateCaseFun,
        openUpdateCase,
        setOpenUpdateCase,
        handleDeleteCaseFun,
        openDeleteCase,
        setOpenDeleteCase,
        loadding,handleDeleteDocumentOfCaseFun,
        // casetype
        handleUpdateCaseTypeFun,openUpdateCaseType, setOpenUpdateCaseType,handleDeleteCaseTypeFun,openDeleteCaseType, setOpenDeleteCaseType,caseTypes,handleAddCaseTypeFun,openAddCaseType, setOpenAddCaseType,
        // sessions
        sessions,
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
        setOpenDeleteClient,handleDeleteClientDocumentFun,
        // categories
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
        getTimeline,

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
