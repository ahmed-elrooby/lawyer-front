import React from 'react'
import { TbZoomReplace } from 'react-icons/tb'

const OfficeEfficency = () => {
  return <>
        <section className='p-3 bg-white md:p-6 rounded-xl'>
            <div className='flex items-center justify-between mb-4 '>
                <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-lg flex items-center justify-center bg-[#E5EEFF]'>
                        <TbZoomReplace />

                    </div>
                    <div>
                        <h3 className='text-[#0B1C30] text-[16px] font-bold'>مؤشرات المكتب</h3>
                        <p className='text-xs text-[#45464D]'>معدلات الكفاءة الإجرائية ومقاييس النشاط الشهري</p>
                    </div>
                </div>
                <p className='text-[#45464D] text-xs'>تحديث فوري</p>
            </div>
            <div className='grid items-start grid-cols-2 gap-4 md:grid-cols-5'>
                <div className='space-y-2 rounded-xl bg-[#EFF4FF] p-3'>
                    <div className='flex items-center justify-between'>
                    <h3 className='text-[#45464D] text-xs'>معدل إغلاق القضايا</h3>
                    <h2 className='text-[#0B1C30] font-bold'>72%</h2>
                </div>
                <div className='h-2 rounded-lg bg-[#D3E4FE] '>
                    <p className='h-full bg-black rounded-lg ' style={{width:"80%"}}/>
                </div>
                <p className='text-[#545F73] text-xs'>تسوية وأحكام قطعية</p>
                </div>
                <div className='space-y-2 rounded-xl bg-[#EFF4FF] p-3'>
                    <div className='flex items-center justify-between'>
                    <h3 className='text-[#45464D] text-xs'>معدل حضور الجلسات</h3>
                    <h2 className='text-[#0B1C30] font-bold'>72%</h2>
                </div>
                <div className='h-2 rounded-lg bg-[#D3E4FE] '>
                    <p className='h-full bg-black rounded-lg ' style={{width:"72%"}}/>
                </div>
                <p className='text-[#755B00] text-xs'>الالتزام بالمواعيد القضائية</p>
                </div>
                  <div className='space-y-2 rounded-xl bg-[#EFF4FF] p-3'>
                    <div className='flex items-center justify-between'>
                    <h3 className='text-[#45464D] text-xs'>القضايا الجديدة</h3>
                    <h2 className='text-[#0B1C30] font-bold'>8</h2>
                </div>
                <div className='px-1.5 w-fit text-[#0B1C30] font-bold text-xs py-0.5 rounded-[4px] bg-[#E5EEFF] '>
                    +3 هذا الأسبوع
                </div>
                <p className='text-[#45464D] text-xs'>خلال الشهر الجاري</p>
                </div>

                    <div className='space-y-2 rounded-xl bg-[#EFF4FF] p-3'>
                    <div className='flex items-center justify-between'>
                    <h3 className='text-[#45464D] text-xs'>العملاء الجدد</h3>
                    <h2 className='text-[#0B1C30] font-bold'>8</h2>
                </div>
                <div className='px-1.5 w-fit text-[#586377] font-bold text-xs py-0.5 rounded-[4px] bg-[#D5E0F8] '>
                    +2 عقود شركات
                </div>
                <p className='text-[#45464D] text-xs'>عقود توكيل رسمية</p>
                </div>
                   <div className='space-y-2 rounded-xl bg-[#EFF4FF] p-3'>
                    <div className='flex items-center justify-between'>
                    <h3 className='text-[#45464D] text-xs'>نشاط الفريق</h3>
                    <h2 className='text-[#0B1C30] font-bold'>89%</h2>
                </div>
                <div className='h-2 rounded-lg bg-[#D3E4FE] '>
                    <p className='h-full bg-[#545F73] rounded-lg ' style={{width:"89%"}}/>
                </div>
                <p className='text-[#545F73] text-xs'>معدل النشاط الحالي</p>
                </div>
            </div>
</section>
  </>
}

export default OfficeEfficency
