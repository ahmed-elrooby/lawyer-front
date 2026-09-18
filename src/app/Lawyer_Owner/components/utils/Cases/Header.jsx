import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { LuDownload } from 'react-icons/lu'

const Header = () => {
  return <>
  <header className='flex flex-col items-start justify-between pb-6 mb-6 md:items-center md:flex-row'>
    <div className='space-y-1'>
        <div className='flex items-center gap-1 md:gap-2'>
            <h1 className='md:text-3xl text-lg font-bold text-[#0B1C30]'>إدارة القضايا والدعاوى</h1>
            <span className='px-2.5 py-0.5 bg-[#DCE9FF] rounded-full text-xs text-[#0B1C30]'>سجل التقاضي المباشر</span>
        </div>
        <p className='text-sm text-[#45464D]'>متابعة وإدارة كافة ملفات التقاضي، الدعاوى المقيدة، والمرافعات الميدانية للمكتب بتوثيق عدلي معتمد.</p>
    </div>
    <div className='flex items-center gap-2'>
        <button className='flex px-3 py-2.5 text-sm text-[#0B1C30] rounded-xl items-center gap-2 bg-white' > <LuDownload className='text-[#755B00]' />
تصدير السجل</button>
  <button className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white bg-[#000000]' > <FiPlusCircle />قيد قضية جديدة</button>
    </div>
  </header>
  </>
}

export default Header
