'use client'
import { useState } from 'react';
import { imagePath } from '../assets';
import Link from 'next/link';
import { sideBarIcon } from '../assets';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import Image from 'next/image';
import { FaAnglesLeft } from "react-icons/fa6";
import { PiInvoice } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdInventory } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbBox } from "react-icons/tb";
import { FaBoxOpen, FaPlusCircle } from 'react-icons/fa';
import { BiCategory } from "react-icons/bi";
import { FaSitemap } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { MdPointOfSale } from "react-icons/md";
import { BiReceipt } from "react-icons/bi";
import { CiBarcode } from "react-icons/ci";
export default function SideBar({ sidebarOpen, defaultCollapsed = false, sideBarHandle = () => { } }) {
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isSalesOpen, setIsSalesOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [baseFontColor, setBaseFontColor] = useState("#1F2937")
    const [baseColor, setBaseColor] = useState("white")
    if (sidebarOpen == true && collapsed == true) {
        setCollapsed(false);
    }
    const toggleProducts = () => {
        setIsProductsOpen(!isProductsOpen);
    };
    const toggleSales = () => {
        setIsSalesOpen(!isSalesOpen);
    };


    return (
        <>
            <div
                className={`${sidebarOpen ? "block w-full md:w-[252px] mt-[35px]" : "hidden"
                    } fixed z-50 md:block  h-screen border-r border-gray-300 ${collapsed ? 'w-[60px]' : 'w-[252px]'} transition-all duration-300 ease-in-out`}
                style={{ backgroundColor: baseColor }}
            >
                {/* Logo */}
                <div className={`${sidebarOpen ? "hidden md:block" : "block"
                    } border-b-[1px] border-gray-300 py-4`}>
                    {collapsed ? <Image src={sideBarIcon.smallLogo} alt="logo" width={25} height={25} className='ml-4' /> : <Image src={imagePath.logo} alt="logo" width={235} height={48} />}
                </div>

                <div>
                    <FaAnglesLeft className={`${sidebarOpen ? 'hidden md:block' : 'block'} ${collapsed ? "left-[50px] rotate-180" : "left-[240px] rotate-0"} text-[20px] text-white p-[5px] bg-[#FE9F43] rounded-[10px] absolute top-[25px] duration-300 ease-in-out cursor-pointer z-50`}
                        onClick={() => {
                            setCollapsed(!collapsed);
                            sideBarHandle();
                        }}
                    />
                </div>

                {/* User Info */}
                <div className={`${collapsed ? "hidden" : "flex gap-[5px] p-4 border-b-[1px] border-gray-300"}`}>
                    <Image src={imagePath.user} alt="user" height={50} width={50} className="rounded-[50%]" />
                    <div className="text-[14px" style={{ color: baseFontColor }}>
                        <p>Mostafizur Rahman</p>
                        <p>Super Admin</p>
                    </div>
                </div>

                {/* Dashboard Link */}
                <div className="border-b-[1px] border-gray-300" style={{ color: baseFontColor }}>
                    <Link
                        href="/"
                        className="flex gap-[5px] px-4 py-2 items-center text-[14px] duration-300 hover:bg-gray-200 hover:text-orange-400">
                        <LuLayoutDashboard size={collapsed ? 25 : 20} /> {collapsed ? '' : "Dashboard"}
                    </Link>
                </div>

                {/* Products Toggle */}
                <div className="border-b-[1px] border-gray-300" style={{ color: baseFontColor }}>
                    <div onClick={toggleProducts} className="grid grid-cols-2 items-center cursor-pointer hover:bg-gray-200 hover:text-orange-400">
                        <div className={`${collapsed ? 'col-span-2' : 'col-span-1'} " flex gap-[5px] px-4 py-2 items-center text-[14px] duration-300"`}>
                            <MdInventory size={collapsed ? 25 : 20} />
                            {collapsed ? '' : "Inventory"}
                        </div>
                        <div className={collapsed ? "hidden" : "flex justify-end pr-[10px]"}>
                            {isProductsOpen ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                        </div>
                    </div>

                    {/* Toggle Submenu */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isProductsOpen ? "max-h-[1000px]" : "max-h-0"} `}
                    >
                        <Link
                            href="/product/list"
                            className="px-4 py-2 text-[14px]  hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"
                            style={{ color: baseFontColor }}
                        >
                            <TbBox size={collapsed ? 25 : 20} />
                            {collapsed ? '' : "Products"}
                        </Link>
                        <Link
                            href="/product/new"
                            className="px-4 py-2 text-[14px] hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"
                            style={{ color: baseFontColor }}
                        >
                            <>
                                <TbBox size={collapsed ? 25 : 20} />
                                <FaPlusCircle size={10} className='ml-[-15px] mt-[-10px] bg-white' />
                            </>
                            {collapsed ? '' : "Create Product"}
                        </Link>
                        <Link
                            href="/product/category"
                            className="px-4 py-2 text-[14px hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"
                            style={{ color: baseFontColor }}
                        >
                            <BiCategory size={collapsed ? 25 : 20} />
                            {collapsed ? '' : "Categories"}
                        </Link>
                        <Link
                            href="/product/sub-category"
                            className="px-4 py-2 text-[14px] hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"
                            style={{ color: baseFontColor }}
                        >
                            <FaSitemap size={collapsed ? 25 : 20} />
                            {collapsed ? '' : "Sub Categories"}
                        </Link>
                        <Link
                            href="/product/label-print"
                            className="px-4 py-2 text-[14px hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"
                            style={{ color: baseFontColor }}
                        >
                            <CiBarcode size={collapsed ? 25 : 20} />
                            {collapsed ? '' : "Label Print"}
                        </Link>

                    </div>
                </div>


                <div className="border-b-[1px] border-gray-300" style={{ color: baseFontColor }}>
                    <div onClick={toggleSales} className="grid grid-cols-2 items-center cursor-pointer hover:bg-gray-200 hover:text-orange-400">
                        <div className={`${collapsed ? 'col-span-2' : 'col-span-1'} " flex gap-[5px] px-4 py-2 items-center text-[14px] duration-300"`}>
                            <FaChartLine size={collapsed ? 25 : 20} />
                            {collapsed ? '' : "Sales"}
                        </div>
                        <div className={collapsed ? "hidden" : "flex justify-end pr-[10px]"}>
                            {isSalesOpen ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                        </div>
                    </div>

                    {/* Toggle Submenu */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isSalesOpen ? "max-h-[1000px]" : "max-h-0"} `}>
                        <Link
                            href="/sales/pos/new"
                            className="px-4 py-2 text-[14px] hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"
                            style={{ color: baseFontColor }}
                        >
                            <MdPointOfSale size={collapsed ? 25 : 20} />
                            {collapsed ? '' : "New POS Sales"}
                        </Link>
                        <Link
                            href="/sales/new"
                            className="px-4 py-2 text-[14px] hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"
                            style={{ color: baseFontColor }}
                        >
                            <FaCartPlus size={collapsed ? 25 : 20} />
                            {collapsed ? '' : "Create Order"}
                        </Link>
                        <Link
                            href="/sales"
                            className="px-4 py-2 text-[14px] hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"
                            style={{ color: baseFontColor }}
                        >
                            <BiReceipt size={collapsed ? 25 : 20} />
                            {collapsed ? '' : "Invoice List"}
                        </Link>

                    </div>
                </div>

            </div>
        </>
    );
}
