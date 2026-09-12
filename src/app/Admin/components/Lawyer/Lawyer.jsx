import React from "react";
import Header from "../Utils/Lawyers/Header";
import StatsCards from "../Utils/Lawyers/Cards";
import LawyerOverview from "../Utils/Lawyers/LawyerOverview.jsx";
import LawyersList from "../Utils/Lawyers/Table";

const Lawyer = () => {
  return (
    <>
      <Header />
      <StatsCards />
      <LawyerOverview />
      <LawyersList />
    </>
  );
};

export default Lawyer;
