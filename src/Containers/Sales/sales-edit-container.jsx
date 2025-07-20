'use client'
import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { imagePath } from "@/assets";
import Image from "next/image";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import { FaArrowLeftLong, FaChevronDown, FaStarOfLife } from "react-icons/fa6";
import SideBar from "@/components/SideBar";
import Footer from '@/components/footer';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CustomReactSelect from '@/components/UI/CustomReactSelect';
import getProducts from '@/lib/getProductList';
import getCustomer from '@/lib/getCustomer';
import AddCustomerModal from '@/Modal/crm/add-customer-modal';
export default function SalesUpdate() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [products, setProducts] = useState([]);
    const [productOptions, setProductsOption] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [customerOptions, setCustomerOptions] = useState([]);
    const [isAddCustomer, setIsAddCustomer] = useState(false);
    const toggleSidebar = (val) => {
        if (val == "open") {
            setIsSidebarOpen(true);
        }
        else {
            setIsSidebarOpen(false);
        }
    };

    const sideBarHandle = () => {
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        async function getProductList() {
            const productList = await getProducts();
            setProducts(productList);
            let options = [];
            console.log(productList)
            productList.map((data, index) => {
                options.push({ value: data.SKU, label: data.Pname });
            });
            setProductsOption(options);

            const customerList = await getCustomer();
            options = [];
            customerList.map((data, index) => {
                options.push({ value: data.id, label: data.phone + ' - ' + data.name });
            })
            setCustomerOptions(options);
        }
        getProductList();
    }, [])



    return (
        <div className="w-full flex gap-[20px] bg-[#F7F7F7]">
            <SideBar sidebarOpen={isSidebarOpen} sideBarHandle={sideBarHandle} />
            <div className={`${collapsed ? "w-full ml-[0px] md:ml-[57px]" : "w-full ml-[0px] md:ml-[252px]"} duration-300 ease-in-out`}>
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

                <div className="w-full p-[18px]">
                    {/* Header */}
                    <div className="grid grid-cols-2 pb-[10px]">
                        <div>
                            <h1 className="text-[18px] text-gray-800 font-semibold">Edit Sales</h1>
                            <p className="text-[14px] text-gray-600">Update sales information</p>
                        </div>
                        <div className="flex gap-[10px] justify-end">
                            <Link href="/sales/pos/new">
                                <div className="bg-[#FE9F43] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]">
                                    <FiPlusCircle size={12} />
                                    <p>New Sales</p>
                                </div>
                            </Link>
                            <Link href="/sales">
                                <div className="bg-[#051A2D] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]">
                                    <FaArrowLeftLong size={12} />
                                    <p>Order List</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-5'>
                            <div>
                                <CustomReactSelect label="Product Name" isRequired={true} options={productOptions} handleSelected={(value) => { setSelectedProduct(value) }} />
                            </div>
                            <div className='flex gap-2 justify-between items-center'>
                                <div className='w-full'>
                                    <CustomReactSelect label="Customer Name/Phone" isRequired={true} options={customerOptions} handleSelected={(value) => { setSelectedProduct(value) }} />
                                </div>
                                <div>
                                    <FiPlus size={32} className='text-gray-500 mt-[10px]'
                                      onClick={()=>{setIsAddCustomer(true)}}
                                    />
                                </div>
                            </div>
                            <div>
                                <CustomReactSelect options={productOptions} handleSelected={(value) => { setSelectedProduct(value) }} />
                            </div>
                        </div>
                    </div>


                    {isAddCustomer && (
                        <div className="w-[93%] lg:w-[600px] z-10 absolute lg:right-[35%] top-[40%] md:top-[15%] bg-white p-4 rounded-[5px] shadow-lg border-1 border-gray-300 animate-zoomIn">
                            <AddCustomerModal
                                selected={1}
                                handle={() => {setIsAddCustomer(false)}}
                                callback={() => {
                                    toast.success("Payment Successfully completed", {
                                        autoClose: 1500
                                    });
                                    setSync(!sync)
                                }}
                            />
                        </div>
                    )}



                </div>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}
