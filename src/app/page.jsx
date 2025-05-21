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
import TopCategories from "./components/TopCategories";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
export default function Home() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const productsRef = useRef(null);

  const toggleProducts = () => {
    setIsProductsOpen(prev => !prev);
  };
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
        <div className={`${isSidebarOpen ? "block w-full mt-[35px]" : "hidden"
          } fixed z-50 md:block bg-white w-[252px] h-screen border-r border-gray-300`}>

          {/* Logo */}
          <div className={`${isSidebarOpen ? "hidden" : "block"
            } border-b-[1px] border-gray-300 py-4`}>
            <Image src={imagePath.logo} alt="logo" width={235} height={48} />
          </div>

          {/* User Info */}
          <div className="flex gap-[5px] p-4 border-b-[1px] border-gray-300">
            <Image src={imagePath.user} alt="user" height={50} width={50} className="rounded-[50%]" />
            <div className="text-[14px] text-gray-800">
              <p>John Doe</p>
              <p>Super Admin</p>
            </div>
          </div>

          {/* Dashboard Link */}
          <div className="border-b-[1px] border-gray-300 text-gray-800">
            <Link href="/" className="flex gap-[5px] px-4 py-2 items-center text-[14px] duration-300 hover:bg-gray-200 hover:text-green-700">
              <Image src={sideBarIcon.dashboard} alt="icon" height={16} width={16} />
              Dashboard
            </Link>
          </div>

          {/* Products Toggle */}
          <div className="border-b-[1px] border-gray-300 text-gray-800">
            <div onClick={toggleProducts} className="grid grid-cols-2 items-center cursor-pointer hover:bg-gray-200 hover:text-orange-400">
              <div className="flex gap-[5px] px-4 py-2 items-center text-[14px] duration-300">
                <Image src={sideBarIcon.productmanage} alt="icon" height={16} width={16} />
                Products
              </div>
              <div className="flex justify-end pr-[10px]">
                {isProductsOpen ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
              </div>
            </div>

            {/* Toggle Submenu */}
            <div
              ref={productsRef}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isProductsOpen ? "max-h-[1000px]" : "max-h-0"} `}
            >
              <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.product} alt="icon" height={16} width={16} /> Products</Link>
              <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.addproduct} alt="icon" height={16} width={16} /> Create Product</Link>
              <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.category} alt="icon" height={16} width={16} /> Categories</Link>
              <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.subcategory} alt="icon" height={16} width={16} /> Sub Categories</Link>
              <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.addcategory} alt="icon" height={16} width={16} /> Create Categories</Link>
              <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.addsubcategory} alt="icon" height={16} width={16} /> Create SubCategories</Link>
            </div>
          </div>
        </div>

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
                <Image src={imagePath.sales} height={24} width={24} alt="icon"/>
              </div>
              <div>
                <p className="text-[14px]   text-white">Total Sales</p>
                <p className="text-[18px] font-semibold   text-white flex items-center"><TbCurrencyTaka /> 48,988,078</p>
              </div>
            </div>
            <div className="flex gap-[10px] bg-[#092C4C] py-5 px-4 rounded-[5px]">
              <div className="bg-white p-[10px] rounded-[5px] ">
                <Image src={imagePath.salesreturn} height={24} width={24} alt="icon"/>
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
                <Image src={imagePath.purchasereturn} height={24} width={24} alt="icon"/>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 mx-[18px] gap-[20px]">
            <TopProducts />
            <TopCategories />
          </div>


        </div>

      </div>
    </>
  );
}
