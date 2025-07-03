'use client'
import SideBar from "@/components/SideBar";
import Footer from "@/components/footer";
import { useState, useEffect, useRef } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { imagePath } from "@/assets";
import Image from "next/image";
import getCategories from "@/lib/getCategories";
import { PiLessThanThin, PiGreaterThanThin } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import getSales from "@/lib/getSales";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { MdArrowOutward } from "react-icons/md";
import { BiPlusCircle } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import CreatePaymentModal from "@/Modal/sales-create-payment-modal";
import { ToastContainer, toast } from 'react-toastify';

export default function SalesList() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState('all');
    const [sales, setsales] = useState([]);
    const [filteredsales, setFilteredsales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [collapsed, setCollapsed] = useState(false);
    const [numOfRows, setNumOfRows] = useState("5");
    const [top, setTop] = useState(0);
    const [isAction, setIsAction] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});
    const [Index, setIndex] = useState(0);
    const [isPayModal, setIsPayModal] = useState(false)
    const [sync, setSync] = useState(false)
    let itemsPerPage = parseInt(numOfRows);
    const modalRef = useRef();
    const iconRef = useRef();

    const handleClickOutside = (event) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            iconRef.current &&
            !iconRef.current.contains(event.target)
        ) {
            setIsAction(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (event) => {
        setNumOfRows(event.target.value)
        setCurrentPage(1);
    }
    useEffect(() => {
        async function fetchData() {
            const data = await getCategories();
            const salesData = await getSales();
            setsales(salesData);
            setCategories(data);
            setFilteredsales(salesData);
        }
        fetchData();
    }, [sync]);

    const toggleSidebar = (val) => {
        setIsSidebarOpen(val === "open");
    };
    const sideBarHandle = () => {
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        let result = sales;

        if (searchData.trim() !== "") {
            result = result.filter((sales) =>
                sales.sid.toLowerCase().includes(searchData.toLowerCase())
            );
        }

        if (paymentStatus === "Paid") {
            result = result.filter(
                (sales) => sales.subTotal <= sales.paid + sales.discount
            );
        } else if (paymentStatus === "Due") {
            result = result.filter(
                (sales) => sales.subTotal > sales.paid + sales.discount
            );
        }

        setFilteredsales(result);
        setCurrentPage(1); // Reset page on filter
    }, [searchData, paymentStatus, sales]);

    const totalPages = Math.ceil(filteredsales.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredsales.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full flex gap-[20px] bg-[#F7F7F7]" >
            <SideBar sidebarOpen={isSidebarOpen} sideBarHandle={sideBarHandle} />
            <div className={`${collapsed ? "w-full ml-[0px] md:ml-[57px]" : "w-full ml-[0px] md:ml-[252px]"} duration-300 ease-in-out`}>
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
                            <h1 className="text-[18px] text-gray-800 font-semibold">Sales</h1>
                            <p className="text-[14px] text-gray-600">Manage your sales</p>
                        </div>
                        <div className="flex justify-end">
                            <Link href="/sales/new">
                                <div className="bg-[#FE9F43] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]">
                                    <FiPlusCircle size={12} />
                                    <p>Add sales</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-white w-full shadow mt-[10px]">
                        {/* Search & Filter */}
                        <div className="grid grid-cols-2 p-[10px]">
                            <div>
                                <input
                                    type="search"
                                    placeholder="Search"
                                    value={searchData}
                                    onChange={(e) => setSearchData(e.target.value)}
                                    className="p-[10px] w-[150px] lg:w-[300px] border border-gray-300 text-gray-500 text-[14px] rounded-[10px] outline-0"
                                />
                            </div>
                            <div className="flex justify-end">
                                <select
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    className="bg-white p-[10px] text-[12px] rounded-[10px] border border-gray-300 outline-0"
                                >
                                    <option value="all">All</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Due">Due</option>

                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-scroll lg:overflow-hidden relative overflow-y-auto" >
                            {sales[0]?.sid ?
                                <table className="w-[800px] lg:w-full text-[14px] " >
                                    <thead>
                                        <tr className="font-semibold text-gray-800 border-t border-b border-gray-200 sticky top-[0px] bg-white z-10 ">
                                            <td className="p-2 py-5 pl-6">#</td>
                                            <td className="p-2">Invoice No.</td>
                                            <td className="p-2">Customer Name</td>
                                            <td className="p-2">Date & Time</td>
                                            <td className="p-2">Status</td>
                                            <td className="p-2">Grand Total</td>
                                            <td className="p-2">Paid</td>
                                            <td className="p-2">Due</td>
                                            <td className="p-2">Discount</td>
                                            <td className="p-2 text-center">payment Status</td>
                                            <td className="p-2">Added By</td>
                                            <td className="p-2">Action</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {paginatedData.map((data, index) => (
                                            <tr className="border-b-[1px] border-gray-200" key={index}>
                                                <td className="p-2 py-5 pl-6">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td className="p-2">{data.sid}</td>
                                                <td className="p-2">{data.cid}</td>
                                                <td className="p-2">{data.invoicedate}</td>
                                                <td ><span className={` ${data.status == "Pending" ? 'bg-[#06AED4]' : "bg-green-700"} p-2 text-white rounded-[5px]`}>{data.status}</span></td>
                                                <td className="p-2">{data.subTotal}</td>
                                                <td className="p-2">{data.paid}</td>
                                                <td className="p-2">{data.subTotal - data.paid - data.discount}</td>
                                                <td className="p-2">{data.discount}</td>
                                                <td className="text-center">
                                                    {data.subTotal <= data.paid + data.discount ? <span className="p-2 text-white bg-green-600 rounded-[5px]">paid</span> : <span className="p-2 text-white bg-red-400 rounded-[5px]">Due</span>}
                                                </td>
                                                <td className="p-2">Admin</td>
                                                <td className="p-2 px-6 cursor-pointer"
                                                    ref={iconRef}
                                                    onClick={() => {
                                                        setIndex(index)
                                                        if (index > paginatedData.length - 2) {
                                                            setTop(index - 2);
                                                        }
                                                        else if (index > paginatedData.length - 3) {
                                                            setTop(index - 1);
                                                        }
                                                        else {
                                                            setTop(index)
                                                        }
                                                        setIsAction(true)

                                                    }}
                                                ><BsThreeDotsVertical size={16} /></td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table> : <div className="flex justify-center py-[20px]"><div className="loader "></div> </div>}
                            {isAction && (
                                <div
                                    ref={modalRef}
                                    style={{ top: `${80 + 60 * top}px` }}
                                    className="absolute right-[5%] bg-white p-4 rounded-[5px] shadow-lg"
                                >
                                    <div className="flex gap-2 py-1 items-center cursor-pointer"><IoEyeOutline /> Sale Detail</div>
                                    <div className="flex gap-2 py-1 items-center cursor-pointer"><LiaEdit /> Sale Edit</div>
                                    <div className="flex gap-2 py-1 items-center cursor-pointer"><MdArrowOutward /> Show Payment</div>
                                    <div className="flex gap-2 py-1 items-center cursor-pointer"
                                        onClick={() => {
                                            console.log(paginatedData[Index]?.sid);
                                            setIsPayModal(true)
                                            setSelectedItems({
                                                invId: paginatedData[Index]?.sid,
                                                name: paginatedData[Index]?.cid
                                            })
                                        }}
                                    ><BiPlusCircle /> Create Payment</div>
                                    <div className="flex gap-2 py-1 items-center cursor-pointer"><RiDeleteBin6Line /> Delete Payment</div>
                                </div>
                            )}
                            {isPayModal && (
                                <div className="w-[600px] absolute right-[35%] top-[30%] bg-white p-4 rounded-[5px] shadow-lg animate-zoomIn">
                                    <CreatePaymentModal
                                        selected={selectedItems}
                                        handle={() => setIsPayModal(false)}
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

                        {/* Pagination */}
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 ml-4 text-[14px]">
                                <p>Item Per Page</p>
                                <div>
                                    <select value={numOfRows} onChange={handleChange} className="border-[1px] border-gray-400 rounded-[5px] outline-0">
                                        <option vlaue="1">1</option>
                                        <option vlaue="5">5</option>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-gray-800 text-sm flex gap-2 items-center justify-end p-4">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200"
                                >
                                    <PiLessThanThin />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`h-8 w-8 flex items-center justify-center rounded-full ${currentPage === i + 1 ? 'bg-orange-400 text-white' : 'bg-gray-200'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200"
                                >
                                    <PiGreaterThanThin />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
                <Footer />
            </div>
        </div>
    );
}
