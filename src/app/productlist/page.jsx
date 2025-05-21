'use client'
import SideBar from "../components/SideBar";
import Footer from "../components/footer";
import { useState, useRef, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { imagePath } from "../assets";
import Image from "next/image";
import getCategories from "../lib/getCategories";
import getTopProducts from "../lib/getProducts";
import { PiLessThanThin, PiGreaterThanThin } from "react-icons/pi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
export default function ProductList() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await getCategories();
            const productData = await getTopProducts();
            setProduct(productData);
            setCategories(data);
        }

        fetchData();
    }, []);

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
                <div className="w-full bg-[#F7F7F7] ml-[0px] md:ml-[252px]">
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
                    <div className=" w-full p-[18px]">
                        <h1 className="text-[18px] text-gray-800 font-semibold">Product List</h1>
                        <p className="text-[14px] text-gray-600">Manage your products</p>
                        <div className="bg-white w-full shadow mt-[10px]">
                            <div className="grid grid-cols-2 p-[10px]">
                                <div>
                                    <input type="search"
                                        placeholder="Search"
                                        name="search"
                                        className="p-[10px] max-w-[250px] lg:w-[300px] border-[1px] border-gray-300 text-gray-500 text-[12px] rounded-[10px] outline-0 bg-white"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <select className="bg-white p-[10px] text-[12px] rounded-[10px] border-[1px] border-gray-300 outline-0 hover:border-orange-400 hover:bg-orange-50 transition">
                                        <option value="">Category</option>
                                        {categories.map((data, index) => (
                                            <option key={index} value={data}>
                                                {data}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="overflow-x-scroll lg:overflow-hidden">
                                <table className="w-[800px] lg:w-full text-[14px]">
                                    <thead>
                                        <tr className="font-semibold text-gray-800 border-t border-b border-gray-300">
                                            <td className="p-2 pl-6">#</td>
                                            <td className="p-2">SKU</td>
                                            <td className="p-2">Product Name</td>
                                            <td className="p-2">Category</td>
                                            <td className="p-2">Price</td>
                                            <td className="p-2">Unit</td>
                                            <td className="p-2">Qty</td>
                                            <td className="p-2">Created By</td>
                                            <td className="p-2">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.slice(0, 10).map((data, index) => (
                                            <tr className="border-b-[1px] border-gray-300 ">
                                                <td className="p-2 py-4 pl-6">{index + 1}</td>
                                                <td className="p-2">{data.id}</td>
                                                <td className="flex items-center gap-[5px] p-2">
                                                    <div className="p-[5px] bg-[#F2F2F2] rounded-[5px] "><img src={data.image} className="h-[20px] w-[20px]" alt="product" /></div>
                                                    {data.title.length > 15 ? data.title.slice(0, 15) : data.title}
                                                </td>
                                                <td className="p-2">{data.category}</td>
                                                <td className="p-2">{data.price}</td>
                                                <td className="p-2">Pc</td>
                                                <td className="p-2">100</td>
                                                <td className="flex items-center gap-[5px] p-2"> <img src={imagePath.user} height={20} width={20} />John doe</td>
                                                <td className="">
                                                    <div className="flex gap-[10px] text-lg">
                                                        <MdOutlineRemoveRedEye /><FaRegEdit /><RiDeleteBin5Line />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-gray-800 text-[14px] flex gap-[10px] items-center justify-end p-[10px]">
                                <p className="flex items-center justify-center h-[30px] w-[30px] rounded-full bg-gray-400">
                                    <PiLessThanThin />
                                </p>
                                <p className="flex items-center justify-center h-[30px] w-[30px] rounded-full bg-gray-400">
                                    1
                                </p>
                                <p className="flex items-center justify-center h-[30px] w-[30px] rounded-full bg-gray-400">
                                    2
                                </p>
                                <p className="flex items-center justify-center h-[30px] w-[30px] rounded-full bg-gray-400">
                                    <PiGreaterThanThin />
                                </p>
                            </div>

                        </div>
                    </div>
                    <div> <Footer /></div>
                </div>


            </div>
        </>
    )
}