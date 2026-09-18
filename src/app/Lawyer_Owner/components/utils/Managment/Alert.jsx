import React from 'react'
import { GrHome, GrStatusWarning } from 'react-icons/gr'
import { MdNotificationImportant } from 'react-icons/md'
import { WiTime8 } from 'react-icons/wi'

const Alert = () => {
  return <>
  <section className="bg-[#FFFFFF] my-6 rounded-xl p-2 md:p-6">
    <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-2'>
            <div className='bg-[#FFDAD6] md:w-8 w-5 h-5 md:h-8 rounded-xl flex items-center justify-center'>
                <MdNotificationImportant className='text-[#93000A] text-sm md:text-lg ' />

            </div>
            <div>
    <h2 className='text-[#0B1C30] text-sm md:text-[16px] font-bold'>يحتاج إلى انتباهك</h2>
    <p className='md:text-[12px] text-[10px] text-[#45464D]'>بنود قانونية وإجرائية تتطلب قراراً تنفيذياً عاجلاً</p>
</div>
        </div>
        <div className='flex text-[#93000A] px-1 md:px-3 py-0.5 md:py-1 rounded-full items-center bg-[#FFDAD6] gap-0.5 md:gap-1.5'>
              <span className="w-2 h-2 rounded-full bg-[#93000A]"/>
            <h3 className='text-[10px] md:text-lg md:font-bold font-semibold'>4 عناصر تتطلب إجراء</h3>
          
        </div>
    </div>
<div className='space-y-[10px]'>
    <div className='md:p-4 p-2 flex items-center justify-between rounded-xl bg-[#EFF4FF]'>
        <div className='flex items-center gap-1 md:gap-3'>
            <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A]"/>
            <div className='px-1 md:px-2 py-0.5 rounded-md bg-[#BA1A1A] text-white font-bold text-[11px]'>جلسة تبدأ قريبًا</div>
            <h4 className="text-[#0B1C30] font-bold text-sm">قضية أحمد محمد #1089</h4>
            <span className='w-[2px] h-6 bg-[#C6C6CD]'/>
            <div className='flex text-[#45464D] items-center gap-1 '>
                <GrHome size={13} />
                <span className='text-[12px]'>محكمة بني سويف</span>

            </div>
                        <span className='w-[2px] h-6 bg-[#C6C6CD]'/>
<div className='flex text-[10px] md:text-[12px] items-center gap-0.5 md:gap-1 text-[#BA1A1A]'>
<WiTime8 />
<span>10:30 ص </span>

</div>
        </div>
         <button className='bg-[#213145] md:px-3.5 px-0.5 font-bold text-white text-xs py-1.5 rounded-lg'>
        عرض القضية
    </button>
    </div>
      <div className='md:p-4 p-2 flex items-center justify-between rounded-xl bg-[#EFF4FF]'>
        <div className='flex items-center gap-1 md:gap-3'>
            <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A]"/>
            <div className='px-1 md:px-2 py-0.5 rounded-md bg-[#BA1A1A] text-white font-bold text-[11px]'>جلسة تبدأ قريبًا</div>
            <h4 className="text-[#0B1C30] font-bold text-sm">قضية أحمد محمد #1089</h4>
            <span className='w-[2px] h-6 bg-[#C6C6CD]'/>
            <div className='flex text-[#45464D] items-center gap-1 '>
                <GrHome size={13} />
                <span className='text-[12px]'>محكمة بني سويف</span>

            </div>
                        <span className='w-[2px] h-6 bg-[#C6C6CD]'/>
<div className='flex text-[10px] md:text-[12px] items-center gap-0.5 md:gap-1 text-[#BA1A1A]'>
<WiTime8 />
<span>10:30 ص </span>

</div>
        </div>
         <button className='bg-[#213145] md:px-3.5 px-0.5 font-bold text-white text-xs py-1.5 rounded-lg'>
        عرض القضية
    </button>
    </div>
    <div className='md:p-4 p-2 flex items-center justify-between rounded-xl bg-[#EFF4FF]'>
        <div className='flex items-center gap-1 md:gap-3'>
            <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A]"/>
            <div className='px-1 md:px-2 py-0.5 rounded-md bg-[#BA1A1A] text-white font-bold text-[11px]'>جلسة تبدأ قريبًا</div>
            <h4 className="text-[#0B1C30] font-bold text-sm">قضية أحمد محمد #1089</h4>
            <span className='w-[2px] h-6 bg-[#C6C6CD]'/>
            <div className='flex text-[#45464D] items-center gap-1 '>
                <GrHome size={13} />
                <span className='text-[12px]'>محكمة بني سويف</span>

            </div>
                        <span className='w-[2px] h-6 bg-[#C6C6CD]'/>
<div className='flex text-[10px] md:text-[12px] items-center gap-0.5 md:gap-1 text-[#BA1A1A]'>
<WiTime8 />
<span>10:30 ص </span>

</div>
        </div>
         <button className='bg-[#213145] md:px-3.5 px-0.5 font-bold text-white text-xs py-1.5 rounded-lg'>
        عرض القضية
    </button>
    </div>
</div>
  </section>
  </>
}

export default Alert
