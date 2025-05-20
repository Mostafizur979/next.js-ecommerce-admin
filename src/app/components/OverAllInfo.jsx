import { imagePath } from "../assets";
import Image from "next/image";
export default function OverAllInfo() {
  return (
    <>
      <div className="p-4 bg-white rounded-xl shadow">
        <div className="flex gap-[10px] pb-[15px] items-center border-b-[1px] border-gray-300">
          <div className="bg-[#E7F0FF] p-[5px] rounded-[5px]"> <Image src={imagePath.overallinfo} alt="icon" height={14} width={14} /></div>
          <h2 className="text-[18px] font-semibold text-gray-600 font-['Poppins']">Overall Information</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px]  py-[20px]">
          <div className="flex flex-col items-center justify-center p-[20px] bg-[#F9FAFB] border-[1px] border-gray-300 text-[14px] text-gray-600 font-['Poppins'] rounded-[5px]">
            <Image src={imagePath.supplier} alt='icon' height={24} width={24} />
            <p className="py-[10px]">Suppliers</p>
            <p className="text-[16px] pb-[10px] font-semibold">6987</p>
          </div>
          <div className="flex flex-col items-center justify-center p-[20px] bg-[#F9FAFB] border-[1px] border-gray-300 text-[14px] text-gray-600 font-['Poppins'] rounded-[5px]">
            <Image src={imagePath.customer} alt='icon' height={24} width={24} />
            <p className="py-[10px]">Customers</p>
            <p className="text-[16px] pb-[10px] font-semibold">69870</p>
          </div>
          <div className="flex flex-col items-center justify-center p-[20px] bg-[#F9FAFB] border-[1px] border-gray-300 text-[14px] text-gray-600 font-['Poppins'] rounded-[5px]">
            <Image src={imagePath.order} alt='icon' height={24} width={24} />
            <p className="py-[10px]">Orders</p>
            <p className="text-[16px] pb-[10px] font-semibold">700010</p>
          </div>
        </div>
      </div>
    </>
  )
}