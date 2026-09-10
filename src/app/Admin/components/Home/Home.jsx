import React from 'react'
import Welcome from '../Utils/Home/Welcome'
import Cards from '../Utils/Home/Cards'
import WeeklyCharts from '../Utils/Home/WeeklyCharts'
import RecentLawyers from '../Utils/Home/RecentLawyers'
import Notifications from '../Utils/Home/Notifications'
import Activities from '../Utils/Home/Activities'

const Home = () => {
  return <>
  <Welcome/>
  <Cards/>
  <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
    <WeeklyCharts/>
    <RecentLawyers/>
    </div>
    <div className='grid grid-cols-1 gap-4 mt-6 md:grid-cols-2'>
<Notifications/>
<Activities/>
    </div>
  </>
}

export default Home
