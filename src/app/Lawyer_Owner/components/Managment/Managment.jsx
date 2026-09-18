import React from 'react'
import Header from '../utils/Managment/Header.jsx'
import Alert from '../utils/Managment/Alert.jsx'
import TimeLine from '../utils/Managment/TimeLine.jsx'
import Team from '../utils/Managment/Team.jsx'
import OfficeEfficency from '../utils/Managment/OfficeEfficency.jsx'
import Operation from '../utils/Managment/Operation.jsx'
import UpcomingSessions from '../utils/Managment/Upcomming.jsx'

const Managment = () => {
  return<>
  <Header/>
  <Alert/>
  <div className='grid grid-cols-1 gap-6 mb-6 md:grid-cols-2'>
<Operation/>    
<UpcomingSessions/>
  </div>
  <div className='grid grid-cols-1 gap-6 mb-6 md:grid-cols-2'>
    <TimeLine/>
    <Team/>
  </div>
  <OfficeEfficency/>
  </>
}

export default Managment
