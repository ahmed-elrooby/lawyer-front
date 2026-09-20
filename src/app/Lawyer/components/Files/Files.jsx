"use client";

import React, { useContext } from "react";

import SubHeader from "../utils/Files/SubHeader";
import Cards from "../utils/Files/Cards";
import FilesChart from "../utils/Files/FilesChart";
import FileUpload from "../utils/Files/FileUpload";
import Table from "../utils/Files/Table";
import { authContext } from "../../../../Providers/AuthProvider/Auth.js";


const Files = () => {
  const { isIndependentLawyer } =
    useContext(authContext);

  return (
    <>
      <SubHeader />

      <Cards />

<div
  className={`grid grid-cols-1 gap-4 mt-6 ${
    isIndependentLawyer ? "lg:grid-cols-3" : "lg:grid-cols-1"
  }`}
>        <FilesChart />

        {isIndependentLawyer && <FileUpload />}
      </div>

      <Table />
    </>
  );
};

export default Files;