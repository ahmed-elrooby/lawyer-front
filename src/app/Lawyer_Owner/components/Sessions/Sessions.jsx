import React from 'react'
import Header from '../utils/Sessions/Header.jsx'
import Cards from '../utils/Sessions/Cards.jsx'
import CalendarAndTodaySessions from '../utils/Sessions/Calender.jsx'
import AllSessions from '../utils/Sessions/Table.jsx'
import SessionAnalytics from '../utils/Sessions/SessionAnalytics.jsx'
import UpcomingImportantAlerts from '../utils/Sessions/Alert.jsx'

const Sessions = () => {
  return <>
  <Header/>
  <Cards/>
  <CalendarAndTodaySessions/>
  <AllSessions/>
  <SessionAnalytics/>
  <UpcomingImportantAlerts/>
  </>
}

export default Sessions
