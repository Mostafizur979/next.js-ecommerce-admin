'use client'
import SideBar from "../../components/SideBar";
import Footer from "../../components/footer";
import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { imagePath } from "../../assets";
import Image from "next/image";
import getCategories from "../../lib/getCategories";
import getProducts from "../../lib/getProductList";
import { PiLessThanThin, PiGreaterThanThin } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import ProductListTable from "../../components/ProductListTable";
import Link from "next/link";

export default function ProductList() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [category, setCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        async function fetchData() {
            const data = await getCategories();
            const productData = await getProducts();
            console.log("data ",productData);
            setProduct(productData);
            setCategories(data);
            setFilteredProduct(productData); // Initial value
        }
        fetchData();
    }, []);

    const toggleSidebar = (val) => {
        setIsSidebarOpen(val === "open");
    };

    useEffect(() => {
        let result = product;

        if (searchData.trim() !== "") {
            result = result.filter((prod) =>
                prod.Pname.toLowerCase().includes(searchData.toLowerCase())
            );
        }

        if (category !== "all") {
            result = result.filter((prod) =>
                prod.Category.toLowerCase() === category.toLowerCase()
            );
        }

        setFilteredProduct(result);
        setCurrentPage(1); // Reset page on filter
    }, [searchData, category, product]);

    const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredProduct.slice(startIndex, startIndex + itemsPerPage);

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
                            <h1 className="text-[18px] text-gray-800 font-semibold">Product List</h1>
                            <p className="text-[14px] text-gray-600">Manage your products</p>
                        </div>
                        <div className="flex justify-end">
                            <Link href="/createproduct">
                                <div className="bg-[#FE9F43] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]">
                                    <FiPlusCircle size={12} />
                                    <p>Add Product</p>
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
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="bg-white p-[10px] text-[12px] rounded-[10px] border border-gray-300 outline-0"
                                >
                                    <option value="all">All</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Table */}
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
                                    {paginatedData.map((data, index) => (
                                        <ProductListTable
                                            key={index}
                                            data={data}
                                            index={startIndex + index}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="text-gray-800 text-[14px] flex gap-[10px] items-center justify-end p-[10px]">
                            <p
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="cursor-pointer flex items-center justify-center h-[30px] w-[30px] rounded-full bg-gray-200"
                            >
                                <PiLessThanThin />
                            </p>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <p
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`cursor-pointer flex items-center justify-center h-[30px] w-[30px] rounded-full ${
                                        currentPage === i + 1 ? 'bg-orange-400 text-white' : 'bg-gray-200'
                                    }`}
                                >
                                    {i + 1}
                                </p>
                            ))}
                            <p
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className="cursor-pointer flex items-center justify-center h-[30px] w-[30px] rounded-full bg-gray-200"
                            >
                                <PiGreaterThanThin />
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
