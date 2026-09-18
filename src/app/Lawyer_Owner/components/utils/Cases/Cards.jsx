import React from 'react'
import { BsPatchCheck, BsPatchCheckFill } from 'react-icons/bs'
import { HiOutlineTrendingUp } from 'react-icons/hi'
import { LuFiles } from 'react-icons/lu'
import { MdGavel } from 'react-icons/md'
import { TbFileDescriptionFilled } from 'react-icons/tb'

const Cards = () => {
  return <>
  <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
  <div className='
  p-4 relative bg-[#FFFFFF] shadow-sm overflow-hidden rounded-xl
  transition-all duration-300 ease-in-out
  hover:-translate-y-1 hover:shadow-md
'>
    <div className='w-20 h-20 rounded-full bg-[#EFF4FF] absolute -bottom-6 -left-5' />

    <div className='flex items-center justify-between mb-2'>
        <h3 className='text-[#45464D] text-sm'>
            إجمالي القضايا المسجلة
        </h3>

        <div className='w-8 h-8 bg-[#E5EEFF] flex items-center justify-center rounded-lg'>
            <LuFiles />
        </div>
    </div>

    <div className='flex items-center gap-2 mb-1'>
        <h2 className='text-[#0B1C30] font-bold text-4xl'>128</h2>
        <span className='text-[#45464D] text-xs'>قضية مسجلة</span>
    </div>

    <div className='flex items-center gap-1.5'>
        <div className='flex w-fit text-xs font-medium text-[#586377] gap-0.5 bg-[#D5E0F8] px-2 py-0.5 rounded-md items-center'>
            <HiOutlineTrendingUp />
            <p>8.2%+</p>
        </div>

        <p className='text-xs text-[#45464D]'>
            مقارنة بالربع الفائت
        </p>
    </div>
</div>
{/* 2 */}
  <div className='
  p-4 relative bg-[#FFFFFF] shadow-sm overflow-hidden rounded-xl
  transition-all duration-300 ease-in-out
  hover:-translate-y-1 hover:shadow-md
'>
    <div className='w-20 h-20 rounded-full bg-[#EFF4FF] absolute -bottom-6 -left-5' />

    <div className='flex items-center justify-between mb-2'>
        <h3 className='text-[#45464D] text-sm'>
           القضايا النشطة المتداولة
        </h3>

        <div className='w-8 h-8 bg-[#E5EEFF] flex items-center justify-center rounded-lg'>
            <MdGavel />

        </div>
    </div>

    <div className='flex items-center gap-2 mb-1'>
        <h2 className='text-[#0B1C30] font-bold text-4xl'>76</h2>
        <span className='text-[#45464D] text-xs'>مرافعة قائمة</span>
    </div>

    <div className='flex items-center gap-1.5'>
        <div className=' w-fit text-xs font-medium text-[#586377] bg-[#D5E0F8] px-2 py-0.5 rounded-md '>
        59% من المحفظة
        </div>

        <p className='text-xs z-10 text-[#45464D]'>
           تحت ولاية المحاكم
        </p>
    </div>
</div>
{/* 3 */}
  <div className='
  p-4 relative bg-[#FFFFFF] shadow-sm overflow-hidden rounded-xl
  transition-all duration-300 ease-in-out
  hover:-translate-y-1 hover:shadow-md
'>
    <div className='w-20 h-20 rounded-full bg-[#FFE08E] absolute -bottom-6 -left-5' />

    <div className='flex items-center justify-between mb-2'>
        <h3 className='text-[#45464D] text-sm'>
          القضايا المقيدة هذا الشهر
        </h3>

        <div className='w-8 h-8 bg-[#E5EEFF] flex items-center justify-center rounded-lg'>
            <TbFileDescriptionFilled className='text-[#755B00]' />

        </div>
    </div>

    <div className='flex items-center gap-2 mb-1'>
        <h2 className='text-[#0B1C30] font-bold text-4xl'>18</h2>
        <span className='text-[#45464D] text-xs'>قيد جديد</span>
    </div>

    <div className='flex items-center gap-1.5'>
        <div className=' w-fit text-xs font-medium text-[#584400] bg-[#FFE08E] px-2 py-0.5 rounded-md '>
مستوفاة الوكالات        </div>

        <p className='text-xs z-10 text-[#45464D]'>
         100% عقود سارية
        </p>
    </div>
</div>
{/* 4 */}
  <div className='
  p-4 relative bg-[#FFFFFF] shadow-sm overflow-hidden rounded-xl
  transition-all duration-300 ease-in-out
  hover:-translate-y-1 hover:shadow-md
'>
    <div className='w-20 h-20 rounded-full bg-[#D5E0F8] absolute -bottom-6 -left-5' />

    <div className='flex items-center justify-between mb-2'>
        <h3 className='text-[#45464D] text-sm'>
أحكام مكتسبة ومغلقة        </h3>

        <div className='w-8 h-8 bg-[#D5E0F8] flex items-center justify-center rounded-lg'>
            <BsPatchCheck className='text-[#586377]' />

        </div>
    </div>

    <div className='flex items-center gap-2 mb-1'>
        <h2 className='text-[#0B1C30] font-bold text-4xl'>18</h2>
        <span className='text-[#45464D] text-xs'>حكم نهائي</span>
    </div>

    <div className='flex items-center gap-1.5'>
        <div className=' w-fit text-xs font-medium text-[#586377] bg-[#D5E0F8] px-2 py-0.5 rounded-md '>
81% كسب دعوى       </div>

        <p className='text-xs z-10 text-[#45464D]'>
        تنفيذ صكوك مكتمل
        </p>
    </div>
</div>
  </div>
  </>
}

export default Cards
