import React from 'react'
import { MdOutlineShowChart } from 'react-icons/md'

const Operation = () => {

  return <>
      <section className='p-6 bg-white border border-blue-100 rounded-xl'>
        <div className='flex items-center justify-between'>
            <div className="flex items-center gap-2">
                <div className="flex items-center h-8 w-8 justify-center rounded-lg bg-[#E5EEFF]">
<MdOutlineShowChart />
                </div>
                <div>
                    <h2 className="md:font-bold text-sm md:text-lg font-semibold text-[#0B1C30]">اليوم في المكتب</h2>
                    <p className="text-[#45464D] text-xs">السجل المباشر للأنشطة القانونية</p>
                </div>
            </div>
                    <span className="md:px-2 px-1 py-0.5  bg-[#DCE9FF] text-[#0B1C30] rounded-full text-xs">5 أحداث مسجلة</span>

        </div>
       <div className='relative w-full mt-4 space-y-4'>
        <span className='absolute top-0 -right-[2px]  h-full bg-[#DCE9FF] w-0.5'/>
        <div className='flex items-start w-full gap-3'>
            <span  className='w-4 h-4 bg-transparent border-4 border-black rounded-full'></span>
            <div className='bg-[#EFF4FF] w-full p-2.5 rounded-xl flex items-start justify-between'>
                <div className=''>

                
                <h3 className="text-[#0B1C30] mb-0.5 font-bold text-xs">سارة محمود بدأت العمل</h3>
                <p className='text-[#45464D] text-xs '>تسجيل حضور ومتابعة جدول جلسات اليوم والمذكرات</p>
                </div>
                        <span className='text-[#45464D] font-semibold text-xs'>08:30</span>

            </div>
        </div>
          <div className='flex items-start gap-3'>
            <span  className='w-4 h-4 bg-transparent border-4 border-[#755B00] rounded-full'></span>
            <div className='bg-[#EFF4FF] w-full p-2.5 rounded-xl flex items-start justify-between'>
                <div className=''>

                
                <h3 className="text-[#0B1C30] mb-0.5 font-bold text-xs">سارة محمود بدأت العمل</h3>
                <p className='text-[#45464D] text-xs '>تسجيل حضور ومتابعة جدول جلسات اليوم والمذكرات</p>
                </div>
                        <span className='text-[#45464D] font-semibold text-xs'>08:30</span>

            </div>
        </div>
          <div className='flex items-start gap-3'>
            <span  className='w-4 h-4 bg-transparent border-4 border-red-700 rounded-full'></span>
            <div className='bg-[#EFF4FF] w-full p-2.5 rounded-xl flex items-start justify-between'>
                <div className=''>

                
                <h3 className="text-[#0B1C30] mb-0.5 font-bold text-xs">سارة محمود بدأت العمل</h3>
                <p className='text-[#45464D] text-xs '>تسجيل حضور ومتابعة جدول جلسات اليوم والمذكرات</p>
                </div>
                        <span className='text-[#45464D] font-semibold text-xs'>08:30</span>

            </div>
        </div>
       </div>
</section>
  </>
}

export default Operation

