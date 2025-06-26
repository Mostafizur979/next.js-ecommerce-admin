'use client'
import { useState} from 'react';
import { imagePath } from '../assets';
import Link from 'next/link';
import { sideBarIcon } from '../assets';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import Image from 'next/image';
import { FaAnglesLeft } from "react-icons/fa6";
import { PiInvoice } from "react-icons/pi";

export default function SideBar({sidebarOpen, sideBarHandle = () => {}}) {
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isSalesOpen, setIsSalesOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    if(sidebarOpen == true && collapsed == true) {
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
            <div className={`${sidebarOpen ? "block w-full md:w-[252px] mt-[35px]" : "hidden"
                } fixed z-50 md:block bg-white  h-screen border-r border-gray-300 ${collapsed ? 'w-[60px]' : 'w-[252px]'} transition-all duration-300 ease-in-out`}>
                {/* Logo */}
                <div className={`${sidebarOpen ? "hidden md:block" : "block"
                    } border-b-[1px] border-gray-300 py-4`}>
                   {collapsed ?  <Image src={sideBarIcon.smallLogo} alt="logo" width={25} height={25} className='ml-4' /> : <Image src={imagePath.logo} alt="logo" width={235} height={48} /> } 
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
                    <div className="text-[14px] text-gray-800">
                        <p>John Doe</p>
                        <p>Super Admin</p>
                    </div>
                </div>

                {/* Dashboard Link */}
                <div className="border-b-[1px] border-gray-300 text-gray-800">
                    <Link href="/" className="flex gap-[5px] px-4 py-2 items-center text-[14px] duration-300 hover:bg-gray-200 hover:text-green-700">
                        <Image src={sideBarIcon.dashboard} alt="icon" height={collapsed ? 25 : 16} width={ collapsed ? 25: 16} />
                        {collapsed ? '' : "Dashboard"}
                    </Link>
                </div>

                {/* Products Toggle */}
                <div className="border-b-[1px] border-gray-300 text-gray-800">
                    <div onClick={toggleProducts} className="grid grid-cols-2 items-center cursor-pointer hover:bg-gray-200 hover:text-orange-400">
                        <div className={`${collapsed ? 'col-span-2' : 'col-span-1'} " flex gap-[5px] px-4 py-2 items-center text-[14px] duration-300"`}>
                            <Image src={sideBarIcon.productmanage} alt="icon" height={collapsed ? 25 : 16} width={ collapsed ? 25: 16} />
                            {collapsed ? '' : "Inventory"}
                        </div>
                        <div className={collapsed ? "hidden" : "flex justify-end pr-[10px]"}>
                            {isProductsOpen ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                        </div>
                    </div>

                    {/* Toggle Submenu */}
                    <div
                    
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isProductsOpen ? "max-h-[1000px]" : "max-h-0"} `}
                    >
                        <Link href="/product/list" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.product} alt="icon" height={collapsed ? 25 : 16} width={ collapsed ? 25: 16} /> {collapsed ? '' : "Products"}</Link>
                        <Link href="/product/new" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.addproduct} alt="icon" height={collapsed ? 25 : 16} width={ collapsed ? 25: 16} /> {collapsed ? '' : "Create Product" }</Link>
                        <Link href="/product/category" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.category} alt="icon" height={collapsed ? 25 : 16} width={ collapsed ? 25: 16} /> {collapsed ? '' : "Categories"} </Link>
                        <Link href="/product/sub-category" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.subcategory} alt="icon" height={collapsed ? 25 : 16} width={ collapsed ? 25: 16} /> {collapsed ? '' : "Sub Categories"}</Link>
                        
                    </div>
                </div>


                <div className="border-b-[1px] border-gray-300 text-gray-800">
                    <div onClick={toggleSales} className="grid grid-cols-2 items-center cursor-pointer hover:bg-gray-200 hover:text-orange-400">
                        <div className={`${collapsed ? 'col-span-2' : 'col-span-1'} " flex gap-[5px] px-4 py-2 items-center text-[14px] duration-300"`}>
                            <Image src={sideBarIcon.sales} alt="icon" height={collapsed ? 25 : 16} width={ collapsed ? 25: 16} />
                            {collapsed ? '' : "Sales"}
                        </div>
                        <div className={collapsed ? "hidden" : "flex justify-end pr-[10px]"}>
                            {isProductsOpen ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                        </div>
                    </div>

                    {/* Toggle Submenu */}
                    <div
                    
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isSalesOpen ? "max-h-[1000px]" : "max-h-0"} `}
                    >
                        <Link href="/sales/pos/new" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.product} alt="icon" height={collapsed ? 25 : 16} width={ collapsed ? 25: 16} /> {collapsed ? '' : "New POS Sales"}</Link>
                    
                    </div>
                </div>

            </div>
        </>
    );
}
