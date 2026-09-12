import React from "react";
import Header from "../Utils/Offices/Header.jsx";
import Card from "../Utils/Offices/Card.jsx";
import Charts from "../Utils/Offices/Chart.jsx";
import OfficesData from "../Utils/Offices/Table.jsx";

const Offices = () => {
  return (
    <>
      <Header />
      <Card />
      <Charts />
      <OfficesData />
    </>
  );
};

export default Offices;
