'use client'
import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { imagePath } from "@/assets";
import Image from "next/image";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import { FaArrowLeftLong, FaChevronDown, FaStarOfLife } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa"; // Use FaEdit instead of FaRegEdit
import SideBar from "@/components/SideBar";
import Footer from '@/components/footer';
import React from 'react';
import ImageUploading from 'react-images-uploading';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useSearchParams } from 'next/navigation';
import getCategoriesDetails from '@/lib/getCategoryInfo';

export default function CategoryUpdate() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [inputs, setInputs] = useState({ name: '', status: '' });
    const [isProductInformationOpen, setIsProductInformationOpen] = useState(true);
    const [isProductImageOpen, setIsProductImageOpen] = useState(true);
    const [images, setImages] = useState([]);
    const maxNumber = 5;
    const searchParams = useSearchParams();
    const title = searchParams.get("title");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const productData = await getCategoriesDetails(title);
                setInputs({
                    name: productData[0]?.name || '',
                    status: productData[0]?.status || '',
                });
                if (productData[0]?.Image) {
                    setImages([{ data_url: productData[0].Image }]);
                }
            } catch (error) {
                console.error("Failed to load category details:", error);
            }
        };

        fetchCategory();
    }, [title]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const onChange = (imageList) => {
        setImages(imageList);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://127.0.0.1:8000/api/category/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': 'mysecretkey123',
                },
                body: JSON.stringify({
                    title: inputs.name,
                    status: inputs.status,
                    images: images[0]?.data_url || '',
                }),
            });
            const data = await res.json();

            if (data.status === 'success') {
                alert('Category updated successfully!');
                setInputs({ name: '', status: '' });
                setImages([]);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to send data.');
        }
    };

    const resetInput = () => {
        setInputs({ name: '', status: '' });
        setImages([]);
    };

    return (
        <div className="w-full flex gap-[20px] bg-[#F7F7F7]">
            <SideBar sidebarOpen={isSidebarOpen} />
            <div className="w-full bg-[#F7F7F7] ml-[0px] md:ml-[252px]">
                {/* Mobile Header */}
                <div className="md:hidden bg-white px-4 shadow-sm grid grid-cols-2 items-center sticky top-0 z-40">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-[18px] text-[#FE9F43]">
                        <HiOutlineMenuAlt3 />
                    </button>
                    <button onClick={() => setIsSidebarOpen(false)} className={`${isSidebarOpen ? "block" : "hidden"}`}>
                        <Image src={imagePath.close} height={18} width={18} alt="icon" />
                    </button>
                    <Image src={imagePath.logo} alt="logo" width={235} height={48} />
                </div>

                <div className="w-full p-[18px]">
                    {/* Header */}
                    <div className="grid grid-cols-2 pb-[10px]">
                        <div>
                            <h1 className="text-[18px] text-gray-800 font-semibold">Edit Category</h1>
                            <p className="text-[14px] text-gray-600">Update category information</p>
                        </div>
                        <div className="flex gap-[10px] justify-end">
                            <Link href="/product/category">
                                <div className="bg-[#FE9F43] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]">
                                    <FiPlusCircle size={12} />
                                    <p>Add Category</p>
                                </div>
                            </Link>
                            <Link href="/product/category">
                                <div className="bg-[#051A2D] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]">
                                    <FaArrowLeftLong size={12} />
                                    <p>Back to Category</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={formSubmit}>
                        {/* Category Info */}
                        <div className='bg-white shadow'>
                            <div onClick={() => setIsProductInformationOpen(!isProductInformationOpen)} className='grid grid-cols-2 text-[18px] border-b border-gray-300 p-5 cursor-pointer'>
                                <div>Category Information</div>
                                <div className='flex justify-end'><FaChevronDown /></div>
                            </div>

                            <div className={`${isProductInformationOpen ? "grid" : "hidden"} grid-cols-1 lg:grid-cols-2 gap-[20px] p-[20px]`}>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Category Name<FaStarOfLife size={8} className='text-red-500' /></p>
                                    <input
                                        type="text"
                                        name="name"
                                        value={inputs.name}
                                        onChange={handleChange}
                                        className="w-full text-[14px] text-gray-600 p-2 outline-0 border border-gray-200 rounded"
                                        required
                                    />
                                    {inputs.name && inputs.name.length < 3 && (
                                        <span className="text-red-500 text-[12px]">Name should be at least 3 characters</span>
                                    )}
                                </div>

                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Status<FaStarOfLife size={8} className='text-red-500' /></p>
                                    <select
                                        name="status"
                                        value={inputs.status}
                                        onChange={handleChange}
                                        className="w-full text-[14px] text-gray-600 p-2 outline-0 border border-gray-200 rounded"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className='bg-white shadow mt-5'>
                            <div onClick={() => setIsProductImageOpen(!isProductImageOpen)} className='grid grid-cols-2 text-[18px] border-b border-gray-300 p-5 cursor-pointer'>
                                <div>Images</div>
                                <div className='flex justify-end'><FaChevronDown /></div>
                            </div>

                            <div className={`${isProductImageOpen ? "grid" : "hidden"} grid-cols-1 lg:grid-cols-2 gap-[20px] p-[20px]`}>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        <div className="flex items-center flex-wrap gap-3">
                                            <div
                                                className='p-5 flex flex-col justify-center items-center border-2 border-dotted border-gray-300 h-[150px] w-[150px] rounded hover:bg-gray-100'
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                <MdOutlineCloudUpload className='text-gray-500' size={64} />
                                                <p className='text-sm text-gray-400'>Choose or drag file</p>
                                            </div>

                                            {imageList.map((image, index) => (
                                                <div key={index} className="p-2">
                                                    <img src={image.data_url} alt="" className='border border-gray-300 p-2 h-[100px] w-[100px]' />
                                                    <div className="flex justify-between mt-2 gap-2">
                                                        <button type="button" onClick={() => onImageUpdate(index)} className='text-[#FE9F43] border p-2 rounded hover:bg-[#FE9F43] hover:text-white'>
                                                            <FaEdit size={15} />
                                                        </button>
                                                        <button type="button" onClick={() => onImageRemove(index)} className='text-red-500 border p-2 rounded hover:bg-red-500 hover:text-white'>
                                                            <RiDeleteBin6Line size={15} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className='flex gap-3 justify-end mt-5'>
                            <button type="reset" onClick={resetInput} className='bg-[#051A2D] border px-4 py-2 text-white rounded hover:text-[#051A2D] hover:bg-white'>
                                Cancel
                            </button>
                            <button type="submit" className='bg-[#FE9F43] border px-4 py-2 text-white rounded hover:text-[#FE9F43] hover:bg-white'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    );
}
