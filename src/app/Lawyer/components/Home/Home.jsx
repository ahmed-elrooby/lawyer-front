import React from 'react'
import Cards from '../utils/Home/Cards'
import Sessions from '../utils/Home/Sessions'
import Tasks from '../utils/Home/Tasks'
import Calender from '../utils/Home/Calender'
import TodayTasks from '../utils/Home/TodyTasks'
import SearchFiles from '../utils/Home/SearchFiles'
import CaseIssues from '../utils/Home/CaseIssues'
import LastFiles from '../utils/Home/LastFiles'
import Discussions from '../utils/Home/Discussions'
import TasksChart from '../utils/Home/TasksChart'

const Home = () => {
  return <>
  <Cards/>
  <div className='grid grid-cols-1 gap-4 mt-6 md:grid-cols-2'>
    <Sessions/>
    <Tasks/>
  </div>
  <div className='grid grid-cols-1 gap-4 mt-6 md:grid-cols-3'>
    <Calender/>
    <TodayTasks/>
    <SearchFiles/>
  </div>
    <div className='grid grid-cols-1 gap-4 mt-6 md:grid-cols-3'>
      <CaseIssues/>
      <LastFiles/>
</div>
<div className='grid grid-cols-1 gap-4 mt-6 md:grid-cols-2'>
  <Discussions/>
  <TasksChart/>
</div>
  </>
}

export default Home
