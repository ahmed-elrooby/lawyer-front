import React from 'react'
import Header from '../Utils/Lawyers/Header'
import LawyersCharts from '../Utils/Lawyers/LawyerChart'
import LawyersTable from '../Utils/Lawyers/Table'
import StatsCards from '../Utils/Lawyers/Cards'

const Lawyer = () => {
  return <>
  <Header/>
  <StatsCards/>
  <LawyersCharts/>
  <LawyersTable/>
  </>
}

export default Lawyer
