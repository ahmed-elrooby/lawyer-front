import React from 'react'
import Header from '../Utils/Reports/Header.jsx'
import Cards from '../Utils/Reports/Cards.jsx'
import CasesChart from '../Utils/Reports/CasesChart.jsx'
import SessionsChart from '../Utils/Reports/SessionsChart.jsx'
import PerformanceIndicators from '../Utils/Reports/PerformanceIndicators.jsx'

const Reports = () => {
  return <>
  <Header/>
  <Cards/>
  <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <CasesChart />
  <SessionsChart />
</div>
<PerformanceIndicators/>
  </>
}

export default Reports
