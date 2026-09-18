import React from 'react'
import Header from '../utils/PerformanceOffice/Header.jsx'
import StatsCards from '../utils/PerformanceOffice/Cards.jsx'
import CasePerformance from '../utils/PerformanceOffice/CasePerformance.jsx'
import LawyersPerformance from '../utils/PerformanceOffice/Table.jsx'

const PerformanceOffice = () => {
  return<>
  <Header/>
  <StatsCards/>
  <CasePerformance/>
  <LawyersPerformance/>
  </>
}

export default PerformanceOffice
