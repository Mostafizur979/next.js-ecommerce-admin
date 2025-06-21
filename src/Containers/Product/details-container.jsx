'use client'
import SideBar from "@/components/SideBar";
import Footer from "@/components/footer";
import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { imagePath } from "@/assets";
import Image from "next/image";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import getProductDetails from "@/lib/getProductDetails";
import {  useSearchParams } from 'next/navigation';
export default function ProductDetails() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    useEffect(() => {
        async function fetchData() {
            const productData = await getProductDetails(id);
            console.log(productData)
            setProduct(productData);

        }
        fetchData();
    }, []);

    const toggleSidebar = (val) => {
        setIsSidebarOpen(val === "open");
    };

    return (
        <div className="w-full flex gap-[20px] bg-[#F7F7F7]">
            <SideBar sidebarOpen={isSidebarOpen} />
            <div className="w-full bg-[#F7F7F7] ml-[0px] md:ml-[252px]">
                {/* Mobile header */}
                <div className="md:hidden bg-white my-0 px-4 shadow-sm grid grid-cols-2 items-center sticky top-0 z-40">
                    <button onClick={() => toggleSidebar("open")} className={`${isSidebarOpen ? "hidden" : "block"} text-[18px] text-[#FE9F43]`}>
                        <HiOutlineMenuAlt3 />
                    </button>
                    <button onClick={() => toggleSidebar("close")} className={`${isSidebarOpen ? "block" : "hidden"}`}>
                        <Image src={imagePath.close} height={18} width={18} alt="icon" />
                    </button>
                    <Image src={imagePath.logo} alt="logo" width={235} height={48} />
                </div>

                <div className="w-full p-[18px]">
                    <div className="grid grid-cols-2">
                        <div>
                            <h1 className="text-[18px] text-gray-800 font-semibold">Product Details</h1>
                            <p className="text-[14px] text-gray-600">Full details of product</p>
                        </div>
                        <div className="flex justify-end">
                            <Link href={{ pathname: "/product/edit/", query: { id: product[0]?.SKU } }}>
                                <div className="bg-[#FE9F43] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]">
                                    <FiPlusCircle size={12} />
                                    <p>Edit Product</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white w-full shadow mt-[10px]">
                        <div className="grid grid-cols-3">
                            <div className="p-[10px] col-span-3 order-2 lg:order-1 lg:col-span-2">
                                <table className="w-full">
                                    <tbody>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Product</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].Pname : "-----"}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Category</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].Category : "-----"}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Sub Category</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].SubCategory : "-----"}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Unit</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].Unit : "-----"}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Quantity Alert</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].QtyAlert : "-----"}</td>
                                        </tr>

                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Quantity</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].Qty : "-----"}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Price</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].Price : "-----"}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Discount Type</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].DiscountType : "-----"}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Discount Value</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].DiscountValue : "-----"}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Status</td>
                                            <td className="p-2 border border-gray-300">Active</td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 border border-gray-300 ">Description</td>
                                            <td className="p-2 border border-gray-300">{product[0] ? product[0].Description : "-----"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-span-3 order-1 lg:col-span-1 lg:order-2 flex justify-center items-center border border-gray-300 mr-[10px] my-[10px]">
                                <img src={`data:image/png;base64,${product[0] && product[0].Image }`} className="h-[300px] w-[300px] object-fit" alt="product" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
