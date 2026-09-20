"use client";
import React, { useContext } from 'react'
import { FaDownload, FaUserPlus } from 'react-icons/fa'
import { OwnerContext } from '../../../../../Providers/LawyerOwner/OwnerProvider.js'
import AddClient from './AddClient.jsx';


const Header = () => {
  const {openAddClient,setOpenAddClient}=useContext(OwnerContext)
  return <>
  {
    openAddClient && <AddClient/>
  }
  <header className='flex flex-col items-start justify-between pb-6 mb-6 md:items-center md:flex-row'>

          <div >
<div className='flex items-center gap-1'>
            <h1 className="text-[22px] font-bold text-[#111827]">
              سجل العملاء والمُوكلين
            </h1>
              <span className="bg-[#D5E0F8] px-2.5 py-0.5 rounded-full text-xs text-[#586377] font-bold">دليل الحسابات القضائية</span>
</div>
            <p className="mt-2 text-[10px] leading-5 text-[#8b95a6]">
              إدارة ومتابعة جميع العملاء والقضايا الخاصة بهم بسهولة
              من مكان واحد.
            </p>

          </div>

<div className="flex items-center gap-2">
    <button className="flex items-center text-xs gap-1 rounded-lg bg-white  px-4 py-2  font-bold text-[#0B1C30]">
        <FaDownload className='text-[#755B00] text-[16px]'/>
        تصدير الكشف
    </button>
  <button onClick={()=>{
    setOpenAddClient(true)
  }} className="flex  py-2 items-center gap-2 rounded-lg bg-[#111827] px-4 text-[9px] font-bold text-white">
            <FaUserPlus className='text-[16px]'/>
            إضافة عميل جديد
          </button>
</div>
        


        </header>
  
  </>
}

export default Header
