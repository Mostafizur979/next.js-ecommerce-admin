'use client';
import SideBar from "../../../components/SideBar";
import Footer from "../../../components/footer";
import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { imagePath } from "../../../assets";
import Image from "next/image";
import { PiLessThanThin, PiGreaterThanThin } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaStarOfLife } from "react-icons/fa";
import CategoryListTable from "../../../components/CategoryListTable";
import getCategories from "../../../lib/getCategories";
export default function Category() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [productCategory, setProductCategory] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCategory, setIscategory] = useState(false);
    const [inputCategory, setInputCategory] = useState('');
    const itemsPerPage = 5;

    const fetchCategories = async () => {
         const data = await getCategories();
         setProductCategory(data); 
    };


    useEffect(() => {
        fetchCategories();
    }, []);

    // Filter logic
    useEffect(() => {
        let result = [...productCategory];

        if (searchData.trim() !== "") {
            result = result.filter((category) =>
                category.name?.toLowerCase().includes(searchData.toLowerCase())
            );
        }

        if (categoryFilter !== "all") {
            result = result.filter((prod) =>
                prod.status?.toLowerCase() === categoryFilter.toLowerCase()
            );
        }

        setFilteredProduct(result);
        setCurrentPage(1);
    }, [searchData, categoryFilter, productCategory]);

    // Pagination
    const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredProduct.slice(startIndex, startIndex + itemsPerPage);

    const toggleSidebar = (val) => setIsSidebarOpen(val === "open");

    const handleCategory = (e) => setInputCategory(e.target.value);

    const resetInput = () => {
        setInputCategory('');
        setIscategory(false);
    };

    const categorySubmit = async (e) => {
        e.preventDefault();

        if (inputCategory.length < 3) {
            alert("Category name must be at least 3 characters.");
            return;
        }

        try {
            const res = await fetch('http://127.0.0.1:8000/api/receive/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category: inputCategory }),
            });

            const data = await res.json();

            if (data.status === 'success') {
                fetchCategories(); // refresh category list
                setInputCategory('');
                setIscategory(false);
            } else {
                alert(`Error: ${data.message}`);
            }

        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to send data.');
        }
    };

    return (
        <div className="w-full flex gap-[20px] bg-[#F7F7F7]">
            <SideBar sidebarOpen={isSidebarOpen} />
            <div className="w-full bg-[#F7F7F7] ml-[0px] md:ml-[252px]">
                {/* Mobile header */}
                <div className="md:hidden bg-white px-4 py-2 shadow-sm flex justify-between items-center sticky top-0 z-40">
                    <button onClick={() => toggleSidebar("open")} className="text-[18px] text-[#FE9F43]">
                        <HiOutlineMenuAlt3 />
                    </button>
                    <Image src={imagePath.logo} alt="logo" width={120} height={30} />
                </div>

                <div className="w-full p-[18px]">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-[18px] text-gray-800 font-semibold">Category</h1>
                            <p className="text-[14px] text-gray-600">Manage your categories</p>
                        </div>
                        <button
                            onClick={() => setIscategory(true)}
                            className="bg-[#FE9F43] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]"
                        >
                            <FiPlusCircle size={14} />
                            <span>Add Category</span>
                        </button>
                    </div>

                    <div className="bg-white w-full shadow mt-4">
                        <div className="grid grid-cols-2 p-4">
                            <input
                                type="search"
                                placeholder="Search"
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                                className="p-2 w-full max-w-[300px] border border-gray-300 text-gray-500 text-sm rounded-lg outline-0"
                            />
                            <select
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="p-2 w-full max-w-[200px] border border-gray-300 text-sm rounded-lg outline-0 justify-self-end"
                            >
                                <option value="all">All</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="font-semibold text-gray-800 border-t border-b border-gray-300">
                                        <th className="p-3 pl-6">#</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Created On</th>
                                        <th className="p-3">Created By</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedData.map((data, index) => (
                                        <CategoryListTable key={data.id || index} data={data} index={(currentPage - 1) * itemsPerPage + index + 1} />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
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

                    {/* Category Modal */}
                    {isCategory && (
                        <div className="w-[90%] max-w-[500px] p-5 bg-white shadow-lg rounded border border-gray-300 fixed top-[20%] left-1/2 transform -translate-x-1/2 z-50">
                            <div className="flex justify-between border-b border-gray-300 py-2">
                                <h2 className="text-lg font-semibold">Add Category</h2>
                                <IoIosCloseCircleOutline onClick={resetInput} size={24} className="text-red-500 cursor-pointer" />
                            </div>
                            <form onSubmit={categorySubmit} className="mt-4">
                                <label className="block text-sm text-gray-700 mb-1">
                                    Category <FaStarOfLife size={8} className="inline text-red-500" />
                                </label>
                                <input
                                    type="text"
                                    value={inputCategory}
                                    onChange={handleCategory}
                                    className="w-full p-2 border rounded text-sm text-gray-700"
                                    required
                                />
                                {inputCategory && inputCategory.length < 3 && (
                                    <span className="text-red-500 text-xs">Category should be at least 3 letters.</span>
                                )}
                                <div className="flex gap-3 justify-end mt-5">
                                    <button type="button" onClick={resetInput} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-white hover:text-gray-700 border">
                                        Cancel
                                    </button>
                                    <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-white hover:text-orange-400 border">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </div>
    );
}
