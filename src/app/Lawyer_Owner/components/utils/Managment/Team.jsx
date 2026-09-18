import Image from 'next/image.js'
import React from 'react'
import { PiDotsThreeCircle } from 'react-icons/pi'
import logo from '../../../../../Images/قضاء.jpg'
const Team = () => {
  return <>
      <section className='p-6 bg-white rounded-xl'>
<div className='flex items-center justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <div className='flex items-center h-8 w-8 justify-center rounded-lg bg-[#E5EEFF]'>
                <PiDotsThreeCircle />
              </div>

              <div>
                <h3 className='font-bold text-[#0B1C30]'>حالة فريق المحامين</h3>
                <p className='text-[12px] text-[#45464D]'>النشاط اللحظي وتوزيع القضايا</p>
              </div>
            </div>
          </div>
          <button className='px-2 py-0.5 text-xs bg-[#D5E0F8] text-[#586377] rounded-full'>
      4 مستشارين
          </button>
        </div>   
        <div className='space-y-2.5'> 
        <div className='p-4 mt-4 flex justify-between items-center bg-[#EFF4FF] rounded-xl'>
            <div className='flex items-center gap-3'>
                <div className='relative'>
                    <Image src={logo} alt={''} className='object-cover w-10 h-10 rounded-full'/>
                    <span className='absolute w-3 h-3 rounded-full bg-[#D5E0F8] left-0 -bottom-0.5 border-2 border-white'/>
                </div>
                <div>
                    <div className='flex items-center gap-2'><h2 className='text-[#0B1C30] text-sm'>أحمد علي</h2><span className='bg-[#E5EEFF] text-[10px] px-2 rounded-full text-[#0B1C30]'>متصل</span></div>
                    <p className='text-[#45464D] text-xs'>جلسة 10:30 ص (بني سويف)</p>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <h2 className='text-sm font-bold text-[#0B1C30]'>12</h2>
                <p className='text-[#45464D] text-xs'>قضية نشطة</p>
            </div>
        </div><div className='p-4 mt-4 flex justify-between items-center bg-[#EFF4FF] rounded-xl'>
            <div className='flex items-center gap-3'>
                <div className='relative'>
                    <Image src={logo} alt={''} className='object-cover w-10 h-10 rounded-full'/>
                    <span className='absolute w-3 h-3 rounded-full bg-[#D5E0F8] left-0 -bottom-0.5 border-2 border-white'/>
                </div>
                <div>
                    <div className='flex items-center gap-2'><h2 className='text-[#0B1C30] text-sm'>أحمد علي</h2><span className='bg-[#E5EEFF] text-[10px] px-2 rounded-full text-[#0B1C30]'>متصل</span></div>
                    <p className='text-[#45464D] text-xs'>جلسة 10:30 ص (بني سويف)</p>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <h2 className='text-sm font-bold text-[#0B1C30]'>12</h2>
                <p className='text-[#45464D] text-xs'>قضية نشطة</p>
            </div>
        </div><div className='p-4 mt-4 flex justify-between items-center bg-[#EFF4FF] rounded-xl'>
            <div className='flex items-center gap-3'>
                <div className='relative'>
                    <Image src={logo} alt={''} className='object-cover w-10 h-10 rounded-full'/>
                    <span className='absolute w-3 h-3 rounded-full bg-[#D5E0F8] left-0 -bottom-0.5 border-2 border-white'/>
                </div>
                <div>
                    <div className='flex items-center gap-2'><h2 className='text-[#0B1C30] text-sm'>أحمد علي</h2><span className='bg-[#E5EEFF] text-[10px] px-2 rounded-full text-[#0B1C30]'>متصل</span></div>
                    <p className='text-[#45464D] text-xs'>جلسة 10:30 ص (بني سويف)</p>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <h2 className='text-sm font-bold text-[#0B1C30]'>12</h2>
                <p className='text-[#45464D] text-xs'>قضية نشطة</p>
            </div>
        </div><div className='p-4 mt-4 flex justify-between items-center bg-[#EFF4FF] rounded-xl'>
            <div className='flex items-center gap-3'>
                <div className='relative'>
                    <Image src={logo} alt={''} className='object-cover w-10 h-10 rounded-full'/>
                    <span className='absolute w-3 h-3 rounded-full bg-[#D5E0F8] left-0 -bottom-0.5 border-2 border-white'/>
                </div>
                <div>
                    <div className='flex items-center gap-2'><h2 className='text-[#0B1C30] text-sm'>أحمد علي</h2><span className='bg-[#E5EEFF] text-[10px] px-2 rounded-full text-[#0B1C30]'>متصل</span></div>
                    <p className='text-[#45464D] text-xs'>جلسة 10:30 ص (بني سويف)</p>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <h2 className='text-sm font-bold text-[#0B1C30]'>12</h2>
                <p className='text-[#45464D] text-xs'>قضية نشطة</p>
            </div>
        </div>
        </div>
  </section>
  </>
}

export default Team
