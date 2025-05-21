import { imagePath } from "../assets";
import Image from "next/image";
export default function OverAllInfo() {
  return (
    <>
      <div className="p-4 bg-white rounded-xl shadow">
        <div className="flex gap-[10px] pb-[15px] items-center border-b-[1px] border-gray-300">
          <div className="bg-[#E7F0FF] p-[5px] rounded-[5px]"> <Image src={imagePath.overallinfo} alt="icon" height={14} width={14} /></div>
          <h2 className="text-[18px] font-semibold text-gray-600 ']">Overall Information</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px]  py-[20px]">
          <div className="flex flex-col items-center justify-center p-[20px] bg-[#F9FAFB] border-[1px] border-gray-300 text-[14px] text-gray-600 '] rounded-[5px]">
            <Image src={imagePath.supplier} alt='icon' height={24} width={24} />
            <p className="py-[10px]">Suppliers</p>
            <p className="text-[16px] pb-[10px] font-semibold">6987</p>
          </div>
          <div className="flex flex-col items-center justify-center p-[20px] bg-[#F9FAFB] border-[1px] border-gray-300 text-[14px] text-gray-600 '] rounded-[5px]">
            <Image src={imagePath.customer} alt='icon' height={24} width={24} />
            <p className="py-[10px]">Customers</p>
            <p className="text-[16px] pb-[10px] font-semibold">69870</p>
          </div>
          <div className="flex flex-col items-center justify-center p-[20px] bg-[#F9FAFB] border-[1px] border-gray-300 text-[14px] text-gray-600 '] rounded-[5px]">
            <Image src={imagePath.order} alt='icon' height={24} width={24} />
            <p className="py-[10px]">Orders</p>
            <p className="text-[16px] pb-[10px] font-semibold">700010</p>
          </div>
          <div className="col-span-3"></div>
          <div className="col-span-3 grid grid-cols-2 gap-[10px] border-t-[1px] border-gray-300 pt-[15px]">
            <h1 className="col-span-3 text-gray-600 text-[15px] font-semibold">Customers Overview</h1>
            <div className="flex flex-col items-center justify-center p-[20px] bg-[#F9FAFB] border-[1px] border-gray-300 text-[14px] text-gray-600 '] rounded-[5px]">
              <p className="py-[12px] text-gray-800 text-[20px] font-semibold">5.5K</p>
              <p className="text-[14px] pb-[10px] text-green-500">First Time</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-[20px] bg-[#F9FAFB] border-[1px] border-gray-300 text-[14px] text-gray-600 '] rounded-[5px]">
              <p className="py-[12px] text-gray-800 text-[20px] font-semibold">2.5K</p>
              <p className="text-[14px] pb-[10px] text-red-500">Return</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}