'use client'
import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
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
import CustomInput from '@/components/CustomInput';
import getProducts from '@/lib/getProductList';
import getCustomer from '@/lib/getCustomer';
import AddCustomerModal from '@/Modal/crm/add-customer-modal';

function formatDateToDDMMYYYY(dateObj) {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}

export default function SalesUpdate() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [products, setProducts] = useState([]);
    const [productOptions, setProductsOption] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [customerOptions, setCustomerOptions] = useState([]);
    const [isAddCustomer, setIsAddCustomer] = useState(false);
    const [sync, setSync] = useState(false);
    const [date, setDate] = useState(formatDateToDDMMYYYY(new Date()));
    const [items, setItems] = useState([])

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

    useEffect(() => {
        async function getCustomerList() {
            const customerList = await getCustomer();
            let options = [];
            customerList.map((data, index) => {
                options.push({ value: data.id, label: data.phone + ' - ' + data.name });
            })
            setCustomerOptions(options);
        }
        getCustomerList()
    }, [sync])

    const handleProductChange = (productId) => {
        debugger
        const product = products.find(prod => prod.SKU == productId);
        setItems(prev =>
             ([...prev, 
                { id: product.SKU,
                  name: product.Pname,
                  unit: product.Unit, 
                  qty: '0', 
                  stock: product.QtyAlert, 
                  price: product.Price, 
                  discount: product.Price * product.DiscountValue / 100, 
                  vat: '0',
                  total: 0, 
                  image: product.Image }]))
    }
    const removeItem = (pId) => {
        const newItems = items.filter(prod => prod.id != pId);
        console.log("NewItems: " + newItems)
        setItems(newItems);
    }
    const handleChange = (value, index, name) => {
        const tempProduct = [...items];
        if (name == 'qty' && value > tempProduct[index].stock) {
            toast.warn("Sales quantity should be less than or equal to stock quantity", {
                autoClose: 1500
            })
        }
        tempProduct[index][name] = value;
        tempProduct[index].total = (parseFloat(tempProduct[index].price) + parseFloat(tempProduct[index].vat) - parseFloat(tempProduct[index].discount)) * parseInt(tempProduct[index].qty);
        setItems(tempProduct);
    }


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
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-5 rounded-[10px] shadow-lg'>
                            <div>
                                <CustomReactSelect label="Product Name" isRequired={true} options={productOptions} handleSelected={(data) => { handleProductChange(data.value) }} />
                            </div>
                            <div className='flex gap-2 justify-between items-center'>
                                <div className='w-full'>
                                    <CustomReactSelect label="Customer Name/Phone" isRequired={true} options={customerOptions} handleSelected={(value) => { setSelectedProduct(value) }} />
                                </div>
                                <div>
                                    <FiPlus size={32} className='text-gray-500 mt-[10px]'
                                        onClick={() => { setIsAddCustomer(true) }}
                                    />
                                </div>
                            </div>
                            <div>
                                <CustomInput
                                    width="full"
                                    label="Date"
                                    name="Date"
                                    type="text"
                                    value={date}
                                    placeholder=""
                                    onChange={(e) => { }}
                                />
                            </div>
                        </div>
                        <div className='mt-4 bg-white p-5 rounded-[10px] shadow-lg'>
                            <div className='grid grid-cols-8 text-gray-500 text-[14px]'>
                                <div className='col-span-3 font-semibold'><span className='pr-5'>#</span> Item</div>
                                <div className='font-semibold'>Quantity<span className='text-red-600'>*</span></div>
                                <div className='font-semibold'>Sales Price<span className='text-red-600'>*</span></div>
                                <div className='font-semibold'>Vat</div>
                                <div className='font-semibold'>Discount</div>
                                <div className='font-semibold text-right'>Item Total</div>
                                <div className='col-span-8 pt-2 border-b-2'></div>
                            </div>
                            {
                                items?.map((data, index) => (
                                    <div key={index} className='grid grid-cols-8 items-center text-gray-600 text-[14px] '>
                                        <div className='col-span-3 flex gap-1 items-center'>
                                            <span className='pr-5'>{index + 1}</span>
                                            <img src={data.image == "no-image" ? imagePath.noImage : `data:image/png;base64,${data.image}`} className="h-[30px] w-[30px] object-fit" alt="product" />
                                            <p className='pl-5'>{data.name}</p>
                                        </div>
                                        <div className='pr-12'>
                                            <CustomInput
                                                width="full"
                                                label={<p>Avail. <span className='text-green-700'>{'(' + data.stock + ' ' + data.unit + ')'}</span></p>}
                                                name="qty"
                                                type="number"
                                                value={data.qty}
                                                placeholder=""
                                                onChange={(e) => { handleChange(e.target.value, index, 'qty') }}
                                            /></div>
                                        <div className='pr-12'>
                                            <CustomInput
                                                width="full"
                                                label=''
                                                name="price"
                                                type="number"
                                                value={data.price}
                                                placeholder=""
                                                onChange={(e) => { handleChange(e.target.value, index, 'price') }}
                                            /></div>
                                        <div className='pr-12'>
                                            <CustomInput
                                                width="full"
                                                label=''
                                                name="vat"
                                                type="number"
                                                value={data.vat}
                                                placeholder=""
                                                onChange={(e) => { handleChange(e.target.value, index, 'vat') }}
                                            /></div>
                                        <div className='pr-12'>
                                            <CustomInput
                                                width="full"
                                                label=''
                                                name="discount"
                                                type="number"
                                                value={data.discount}
                                                placeholder=""
                                                onChange={(e) => { handleChange(e.target.value, index, 'discount') }}
                                            /></div>
                                        <div className='flex items-center gap-3 justify-end'>
                                            {!Number.isNaN(data.total) ? data.total : 0}
                                            <MdOutlineRemoveCircleOutline size={20} className='text-red-600 cursor-pointer' onClick={() => { removeItem(data.id) }} />
                                        </div>
                                    </div>
                                ))

                            }
                            {
                                items.length == 0 ? <p className='text-center py-2'>Please Add Products</p> : ''
                            }
                        </div>
                    </div>


                    {isAddCustomer && (
                        <div className="w-[93%] lg:w-[600px] z-10 absolute lg:right-[35%] top-[40%] md:top-[15%] bg-white p-4 rounded-[5px] shadow-lg border-1 border-gray-300 animate-zoomIn">
                            <AddCustomerModal
                                selected={1}
                                handle={() => { setIsAddCustomer(false) }}
                                callback={(msg) => {
                                    toast.success(msg, {
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
