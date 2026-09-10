import React from 'react'
import SubHeader from '../utils/Files/SubHeader'
import Cards from '../utils/Files/Cards'
import FilesChart from '../utils/Files/FilesChart'
import FileUpload from '../utils/Files/FileUpload'
import Table from '../utils/Files/Table'

const Files = () => {
  return <>
  <SubHeader/>
  <Cards/>
  <div className='grid grid-cols-1 gap-4 mt-6 md:grid-cols-3'>
    <FilesChart/>
    <FileUpload/>
  </div>
  <Table/>
  </>
}

export default Files
