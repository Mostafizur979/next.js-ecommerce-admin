'use client'
import { useState} from 'react';
import { imagePath } from '../assets';
import Link from 'next/link';
import { sideBarIcon } from '../assets';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Image from 'next/image';

export default function SideBar({sidebarOpen}) {
 
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    console.log("Side: "+sidebarOpen)
    const toggleProducts = () => {
        setIsProductsOpen(prev => !prev);
    };


    return (
        <>
            <div className={`${sidebarOpen ? "block w-full md:w-[252px] mt-[35px]" : "hidden"
                } fixed z-50 md:block bg-white w-[252px] h-screen border-r border-gray-300`}>
                {/* Logo */}
                <div className={`${sidebarOpen ? "hidden md:block" : "block"
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
                    
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isProductsOpen ? "max-h-[1000px]" : "max-h-0"} `}
                    >
                        <Link href="/productlist" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.product} alt="icon" height={16} width={16} /> Products</Link>
                        <Link href="/createproduct" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.addproduct} alt="icon" height={16} width={16} /> Create Product</Link>
                        <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.category} alt="icon" height={16} width={16} /> Categories</Link>
                        <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.subcategory} alt="icon" height={16} width={16} /> Sub Categories</Link>
                        <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.addcategory} alt="icon" height={16} width={16} /> Create Categories</Link>
                        <Link href="/" className="px-4 py-2 text-[14px] text-gray-800 hover:bg-gray-200 hover:text-orange-400 flex gap-[5px] items-center"><Image src={sideBarIcon.addsubcategory} alt="icon" height={16} width={16} /> Create SubCategories</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
