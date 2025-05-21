"use client";
import { useEffect, useState } from "react";
import getTopProducts from "../lib/getProducts";
import { imagePath } from "../assets";
import Link from "next/link";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuDot } from "react-icons/lu";
export default function TopCustomers() {
 
    return (
        <>
            <div className="bg-white rounded-xl shadow p-4">
                <div className="flex relative gap-[10px] items-center border-b border-gray-300 pb-[10px]">
                    <div className="bg-[#FFDBEC] p-[5px] rounded-[5px]"><img src={imagePath.warning} className="h-[20px] w-[20px]" /> </div>
                    <p className="text-[18px] font-semibold text-gray-600   ">Low Stock Products</p>
                    <Link className="text-right absolute right-0 text-[12px] underline duration-300 hover:text-[#FE9F43]" href="">View All</Link>
                </div>
                {[1,2,3,4,5].map((data) => (
                    <div key={data} className="flex relative gap-[10px] my-[10px] py-[10px] items-center border-b-[1px] border-gray-300">
                         <div className="h-[48px] w-[48px]  rounded"><img src={imagePath.user} alt='user' className="h-full w-full " /></div>
                        <div>
                              <p className="text-[14px]  text-gray-700">Carlos Curran</p>
                              <p className="text-[13px] text-gray-600 flex items-center "><MdOutlineLocationOn /> USA  <span className="text-red-700 "><LuDot /></span> 22 orders</p>
                        </div>
                        <div className="absolute right-0 text-right">
                            <p className="text-[12px] text-gray-700 font-semibold">$8,9645</p>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}
