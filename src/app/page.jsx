'use client'
import Image from "next/image";
import { imagePath } from "./assets";
import { sideBarIcon } from "./assets";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { TbCurrencyTaka } from "react-icons/tb";
import { useState, useRef } from 'react';
import Link from "next/link";
import { MdOutlineDateRange } from "react-icons/md";
import SalesPurchaseBar from "./components/sales&purchase";
import OverAllInfo from "./components/OverAllInfo";
import TopProducts from "./components/TopProducts";
import LowStockProducts from "./components/Lowstock";
import RecentSales from "./components/RecentSales";
import SalesStatistics from "./components/SalesStatistics";
import RecentTransaction from "./components/RecentTransaction";
import TopCustomers from "./components/TopCustomers";
import TopCategories from "./components/TopCategories";
import OrderStatistics from "./components/OrderStatistics";
import SideBar from "./components/SideBar";
import Footer from "./components/footer";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = (val) => {
    if (val == "open") {
      setIsSidebarOpen(true);
    }
    else {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <div className="w-full flex gap-[20px] bg-[#F7F7F7]">

        <SideBar sidebarOpen={isSidebarOpen} />

        {/* Dashboard Body */}
        <div className="w-full ml-[0px] md:ml-[252px]">
          <div className="md:hidden bg-white my-0 px-4 shadow-sm grid grid-cols-2 items-center sticky top-0 bottom-2  z-40">
            <button onClick={() => {
              toggleSidebar("open");
            }} className={`${isSidebarOpen ? "hidden" : "block"}  text-[18px] text-[#FE9F43]`}>
              <HiOutlineMenuAlt3 />
            </button>
            <button onClick={() => {
              toggleSidebar("close");
            }} className={`${isSidebarOpen ? "block" : "hidden"}`}>
              <Image src={imagePath.close} height={18} width={18} alt="icon" />
            </button>
            <Image src={imagePath.logo} alt="logo" width={235} height={48} />
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="p-2">
              <h1 className="text-[22px] font-bold text-black p-[10px]  " id="head">Welcome, Admin</h1>
              <p className="text-[14px] px-[10px]">You have <span className="text-[#FE9F43]">200+</span> Orders, Today</p>
            </div>
            <div className="flex justify-end px-[18px]">
              <div className="flex  items-center bg-white p-2 border border-gray-300 rounded-[5px] gap-[5px]">
                <MdOutlineDateRange />
                <p>05/14/2025 - 05/20/2025</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] p-[18px]">
            <div className="flex gap-[10px] bg-[#FE9F43] py-5 px-4 rounded-[5px]">
              <div className="bg-white p-[10px] rounded-[5px] ">
                <Image src={imagePath.sales} height={24} width={24} alt="icon" />
              </div>
              <div>
                <p className="text-[14px]   text-white">Total Sales</p>
                <p className="text-[18px] font-semibold   text-white flex items-center"><TbCurrencyTaka /> 48,988,078</p>
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#092C4C] py-5 px-4 rounded-[5px]">
              <div className="bg-white p-[10px] rounded-[5px] ">
                <Image src={imagePath.salesreturn} height={24} width={24} alt="icon" />
              </div>
              <div>
                <p className="text-[14px]   text-white">Total Sales Return</p>
                <p className="text-[18px] font-semibold   text-white flex items-center"><TbCurrencyTaka />16,478,145</p>
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#0E9384] py-5 px-4 rounded-[5px]">
              <div className="bg-white p-[10px] rounded-[5px] ">
                <Image src={imagePath.purchase} height={24} width={24} alt="icon" />
              </div>
              <div>
                <p className="text-[14px]   text-white">Total Purchase</p>
                <p className="text-[18px] font-semibold   text-white flex items-center"><TbCurrencyTaka />26,478,145</p>
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#155EEF] py-5 px-4 rounded-[5px]">
              <div className="bg-white p-[10px] rounded-[5px] ">
                <Image src={imagePath.purchasereturn} height={24} width={24} alt="icon" />
              </div>
              <div>
                <p className="text-[14px]   text-white">Total Purchase Return</p>
                <p className="text-[18px] font-semibold   text-white flex items-center"><TbCurrencyTaka />18,478,145</p>
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#3A59D1] py-5 px-4 rounded-[5px]">
              <div className="bg-white p-[10px] rounded-[5px] ">
                <Image src={imagePath.invoices} height={24} width={24} alt="icon" />
              </div>
              <div>
                <p className="text-[14px]   text-white">Total Invoices</p>
                <p className="text-[18px] font-semibold   text-white">11000</p>
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#3D90D7] py-5 px-4 rounded-[5px]">
              <div className="bg-white p-[10px] rounded-[5px] ">
                <Image src={imagePath.canceled} height={24} width={24} alt="icon" />
              </div>
              <div>
                <p className="text-[14px]   text-white">Canceled Invoices</p>
                <p className="text-[18px] font-semibold   text-white">100</p>
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#7AC6D2] py-5 px-4 rounded-[5px]">
              <div className="bg-white p-[10px] rounded-[5px] ">
                <Image src={imagePath.due} height={24} width={24} alt="icon" />
              </div>
              <div>
                <p className="text-[14px]   text-white">Pending Invoices</p>
                <p className="text-[18px] font-semibold   text-white">800</p>
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#1DCD9F] py-5 px-4 rounded-[5px]">
              <div className="bg-white p-[10px] rounded-[5px] ">
                <Image src={imagePath.delivered} height={24} width={24} alt="icon" />
              </div>
              <div>
                <p className="text-[14px]   text-white">Delivered Invoices</p>
                <p className="text-[18px] font-semibold   text-white">10000</p>
              </div>
            </div>
          </div>

          <div className="p-[18px] grid grid-cols-3 gap-[20px]">
            <div className="col-span-3  lg:col-span-2  border-box"> <SalesPurchaseBar /></div>
            <div className="col-span-3 lg:col-span-1"><OverAllInfo /></div>
          </div>
          <div className=" grid grid-cols-1 lg:grid-cols-3 mx-[18px] gap-[20px]">
            <div className="col-span-3 lg:col-span-1 ">
              <TopProducts />
            </div>
            <div className="col-span-3 lg:col-span-1 ">
              <LowStockProducts />
            </div>
            <div className="col-span-3 lg:col-span-1 ">
              <RecentSales />
            </div>

            <div className="col-span-3 grid grid-cols-2 gap-[20px]">
              <div className="col-span-2 lg:col-span-1">
                <SalesStatistics />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <RecentTransaction />
              </div>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-[20px]">
              <div className="col-span-3 lg:col-span-1">
                <TopCustomers />
              </div>
              <div className="col-span-3 lg:col-span-1">
                <TopCategories />
              </div>
              <div className="col-span-3 lg:col-span-1">
                <OrderStatistics />
              </div>
            </div>
          </div>

          <div> <Footer /></div>
        </div>


      </div>
    </>
  );
}
