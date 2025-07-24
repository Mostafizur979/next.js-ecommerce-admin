'use client'
import { useState, useEffect, useRef } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { imagePath } from "@/assets";
import Image from "next/image";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import { FaArrowLeftLong, FaChevronDown, FaStarOfLife } from "react-icons/fa6";
import SideBar from "@/components/SideBar";
import Footer from '@/components/footer';
import { ToastContainer, toast } from 'react-toastify';
import CustomReactSelect from '@/components/UI/CustomReactSelect';
import getProducts from '@/lib/getProductList';
import React from 'react';
import Barcode from 'react-barcode';
export default function SalesUpdate() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [products, setProducts] = useState([]);
    const [productOptions, setProductsOption] = useState([]);
    const [sync, setSync] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedSKU, setSelectedSKU] = useState(null);

    const generateBarCode = (sku) => {
        setSelectedSKU(sku);
    };
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
        }
        getProductList();
    }, [])




    const handleProductChange = (productId) => {
        const product = products.find(prod => prod.SKU == productId);
        const isExist = items.find(data => data.id == productId);
        if (isExist?.id == productId) {
            toast.warn('Already added this product', { autoClose: 1500 })
            return
        }
        setItems(prev =>
        ([...prev,
        {
            id: product.SKU,
            name: product.Pname,
            unit: product.Unit,
            qty: '1',
            stock: product.QtyAlert,
            price: product.Price,
            discount: product.Price * product.DiscountValue / 100,
            vat: '0',
            total: product.Price - product.Price * product.DiscountValue / 100,
            image: product.Image
        }]))
    }

    const barcodeRef = useRef(null);

    const handlePrint = () => {
        const printContents = barcodeRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // reload to restore state
    };





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
                            <h1 className="text-[18px] text-gray-800 font-semibold">Label Print</h1>
                            <p className="text-[14px] text-gray-600">Print Product Label</p>
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
                        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 bg-white p-5 rounded-[10px] shadow-lg'>
                            <div>
                                <CustomReactSelect
                                    label="Product Name"
                                    isRequired={true}
                                    options={productOptions}
                                    handleSelected={(data) => { handleProductChange(data.value) }} />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='mt-4 overflow-auto p-5 rounded-[10px] shadow-lg'>
                                <h1 >Product List</h1>
                                {
                                    products.map((product, index) => (
                                        <div key={index} className='p-2 flex items-center justify-between gap-4 bg-white m-2 shadow-lg rounded-[10px] duration-300 border-[1px] border-white hover:border-orange-400'>
                                            <div className='flex gap-4 items-center'>
                                                <div className='flex justify-center'>
                                                    <img src={product.Image == "no-image" ? imagePath.noImage : `data:image/png;base64,${product.Image}`} className="h-[60px] w-[60px] object-contain" alt="product" />
                                                </div>
                                                <div>
                                                    <p className='text-gray-700 '>{product.Pname}</p>
                                                    <p className='text-[12px] text-gray-600 '>{product.SKU}</p>
                                                </div>
                                            </div>
                                            <div className='bg-green-600 p-2 text-white text-[12px] rounded-[5px] shadow-xl cursor-pointer' onClick={() => { generateBarCode(product.SKU) }}>Show Barcode</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className=' mt-4 bg-white overflow-auto p-5 rounded-[10px] shadow-lg'>
                                <p className="mb-2 font-semibold"></p>
                                {selectedSKU && (
                                    <>
                                        <div ref={barcodeRef} className='flex justify-center items-center'>
                                            <Barcode value={selectedSKU} />
                                        </div>

                                        <div className='flex justify-center mt-4'>
                                            <button
                                                onClick={handlePrint}
                                                className="bg-[#FE9F43] text-white px-4 py-2 rounded-md border-[1px] border-[#FE9F43] hover:bg-white hover:border-[#FE9F43] hover:text-[#FE9F43] shadow-md"
                                            >
                                                Print Barcode
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}
