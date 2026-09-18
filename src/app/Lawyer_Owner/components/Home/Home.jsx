import React from 'react'
import Welcome from '../utils/Home/Welcome.jsx'
import Cards from '../utils/Home/Cards.jsx'
import Chart from '../utils/Home/Chart.jsx'
import AttentionAlerts from '../utils/Home/Alerts.jsx'
import AttorneyTeamPerformance from '../utils/Home/AttorneyTeamPerformance.jsx'
import CaseDistribution from '../utils/Home/CaseDistribution.jsx'
import UpcomingSessions from '../utils/Home/UpcomingSessions.jsx'
import CasePortfolio from '../utils/Home/CasePortfolio.jsx'
import QuickActions from '../utils/Home/QuickActions.jsx'
import OfficeActivity from '../utils/Home/OfficeActivity.jsx'
import OfficeStatistics from '../utils/Home/OfficeStatistics.jsx'

const Home = () => {
  return <>
  <Welcome/>
  <Cards/>
  <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
    <Chart/>
    <AttentionAlerts/>
    </div>
      <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-3 ">
        <AttorneyTeamPerformance/>
        <CaseDistribution/>
</div>
      <div className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-2 ">
        <UpcomingSessions/>
        <CasePortfolio/>
</div>
      <div className="grid grid-cols-1 gap-6 mt-10 mb-10 md:grid-cols-3 ">
        <QuickActions/>
        <OfficeActivity/>
</div>
<OfficeStatistics/>
  </>
}

export default Home
