'use client'
import { useState, useEffect } from 'react';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { imagePath } from "@/assets";
import Image from "next/image";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import SideBar from "@/components/SideBar";
import Footer from '@/components/footer';
import { FaChevronDown } from "react-icons/fa6";
import { FaStarOfLife, FaRegEdit } from "react-icons/fa";
import React from 'react';
import ImageUploading from 'react-images-uploading';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineCloudUpload } from "react-icons/md";
import getCategories from '@/lib/getCategories';
import { useSearchParams } from 'next/navigation';
import getProductDetails from '@/lib/getProductDetails';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function ProductUpdate() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const [inputs, setInputs] = useState({});
    const [description, setDescription] = useState("")
    const [isProductInformationOpen, setIsProductInformationOpen] = useState(true);
    const [isPricingInformationOpen, setIsPricingInformationOpen] = useState(true);
    const [isProductImageOpen, setIsProductImageOpen] = useState(true);
    const [isProductDescriptionOpen, setIsProductDescriptionOpen] = useState(true);
    const [images, setImages] = useState([]);
    const maxNumber = 5;
    const [productCategory, setProductCategory] = useState([]);
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();
    const fetchCategories = async () => {
        const data = await getCategories();
        setProductCategory(data)
    };
    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductDetails(id);

            setInputs({
                pname: productData[0].Pname || '',
                sku: productData[0].SKU || '',
                category: productData[0].Category || '',
                subcategory: productData[0].SubCategory || '',
                unit: productData[0].Unit || '',
                qty: productData[0].Qty || '',
                price: productData[0].Price || '',
                discountType: productData[0].DiscountType || '',
                discountValue: productData[0].DiscountValue || '',
                qtyAlert: productData[0].QtyAlert || '',
            });
            // Optional: if you want to store the image and description separately
            setImages([{ data_url: productData[0].Image }]);
            setDescription(productData[0].Description || '');
        };

        fetchProduct();
    }, [id]);


    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const toggleSidebar = (val) => {
        setIsSidebarOpen(val === "open");
    };
    const productInformationOpen = () => {
        if (isProductInformationOpen) {
            setIsProductInformationOpen(false);
        }
        else {
            setIsProductInformationOpen(true);
        }
    }
    const pricingInformationOpen = () => {
        if (isPricingInformationOpen) {
            setIsPricingInformationOpen(false);
        }
        else {
            setIsPricingInformationOpen(true);
        }
    }
    const productImageOpen = () => {
        if (isProductImageOpen) {
            setIsProductImageOpen(false);
        }
        else {
            setIsProductImageOpen(true);
        }
    }
    const productDescriptionOpen = () => {
        if (isProductDescriptionOpen) {
            setIsProductDescriptionOpen(false);
        }
        else {
            setIsProductDescriptionOpen(true);
        }
    }

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://127.0.0.1:8000/api/products/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pname: inputs.pname,
                    sku: inputs.sku,
                    category: inputs.category,
                    subcategory: inputs.subcategory,
                    unit: inputs.unit,
                    qty: inputs.qty,
                    price: inputs.price,
                    discountType: inputs.discountType,
                    discountValue: inputs.discountValue,
                    qtyAlert: inputs.qtyAlert,
                    images: images[0]?.data_url,
                    description: description
                }),
            });

            const data = await res.json();

            if (data.status === 'success') {
                toast.success("Product updated successfully", {
                    autoClose: 1500 
                });
                setInputs({});
                setDescription("");
                setImages([]);
                setTimeout(() => {
                    router.push('/product/list');
                }, 1600);

            } else {
                toast(`Error: ${data.message}`, {
                    autoClose: 1500
                });
            }

        } catch (error) {
            console.error('Fetch error:', error);
            toast("Something went wrong, please try again later",{
                autoClose: 1500
            });
        }
    }

    const resetInput = () => {
        setInputs({});
        setDescription("");
        setImages([]);
    }


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
                    <div className="grid grid-cols-2 pb-[10px]">
                        <div>
                            <h1 className="text-[18px] text-gray-800 font-semibold">Edit Product</h1>
                            <p className="text-[14px] text-gray-600">Update product information</p>
                        </div>
                        <div className="flex gap-[10px] justify-end">
                            <Link href="/product/category">
                                <div className="bg-[#FE9F43] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]">
                                    <FiPlusCircle size={12} />
                                    <p>Add Category</p>
                                </div>
                            </Link>
                            <Link href="/product/list">
                                <div className="bg-[#051A2D] flex items-center text-white text-[14px] gap-[5px] p-[10px] rounded-[5px]">
                                    <FaArrowLeftLong size={12} />
                                    <p>Back to Product</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <form onSubmit={formSubmit}>
                        <div className=' bg-white shadow'>
                            <div onClick={productInformationOpen} className=' grid grid-cols-2 text-[18px] border-b border-gray-300 p-5 cursor-pointer'>
                                <div>Product Information</div>
                                <div className='flex justify-end'><FaChevronDown /></div>
                            </div>

                            <div className={`${isProductInformationOpen ? "grid" : "hidden"} w-full  grid-cols-1 lg:grid-cols-2 gap-[20px] p-[20px] `}>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Product Name <FaStarOfLife size={8} className='text-red-500' /></p>
                                    <input
                                        type="text"
                                        name="pname"
                                        value={inputs.pname || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                        required
                                    />
                                    {
                                        inputs.pname && inputs.pname.length < 3 && (
                                            <span className="text-red-500 text-[12px]">Name should be greater than 3 letters</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>SKU <FaStarOfLife size={8} className='text-red-500' /></p>
                                    <input
                                        type="text"
                                        name="sku"
                                        value={inputs.sku || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                        required
                                    />
                                    {
                                        inputs.sku && inputs.sku.length < 3 && (
                                            <span className="text-red-500 text-[12px]">SKU should be greater than 3 letters</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Category <FaStarOfLife size={8} className='text-red-500' /></p>
                                    <select
                                        name="category"
                                        value={inputs.category || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                    >
                                        <option value="Select">Select</option>
                                        {productCategory.map((data, index) => (
                                            <option key={index} value={data.name}>{data.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Sub Category <FaStarOfLife size={8} className='text-red-500' /></p>
                                    <select
                                        name="subcategory"
                                        value={inputs.subcategory || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                    >
                                        <option value="Select">Select</option>
                                        <option value="Laptop">Laptop</option>
                                        <option value="Monitor">Monitor</option>
                                        <option value="Router">Router</option>
                                        <option value="Mobile">Mobile</option>
                                    </select>
                                </div>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Unit <FaStarOfLife size={8} className='text-red-500' /></p>
                                    <select
                                        name="unit"
                                        value={inputs.unit || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                    >
                                        <option value="Select">Select</option>
                                        <option value="PCs">PCs</option>
                                        <option value="KG">KG</option>
                                        <option value="Package">Package</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='mt-[18px] bg-white shadow'>
                            <div onClick={pricingInformationOpen} className=' grid grid-cols-2 text-[18px] border-b border-gray-300 p-5 cursor-pointer'>
                                <div>Pricing & Stokes</div>
                                <div className='flex justify-end'><FaChevronDown /></div>
                            </div>

                            <div className={`${isPricingInformationOpen ? "grid" : "hidden"} w-full  grid-cols-1 lg:grid-cols-2 gap-[20px] p-[20px] `}>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Quantity<FaStarOfLife size={8} className='text-red-500' /></p>
                                    <input
                                        type="number"
                                        name="qty"
                                        value={inputs.qty || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                        required
                                    />
                                    {
                                        inputs.qty && inputs.qty < 1 && (
                                            <span className="text-red-500 text-[12px]">Qty Should be 1 or more than 1</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Price<FaStarOfLife size={8} className='text-red-500' /></p>
                                    <input
                                        type="number"
                                        name="price"
                                        value={inputs.price || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                        required
                                    />
                                    {
                                        inputs.price && inputs.price < 1 && (
                                            <span className="text-red-500 text-[12px]">Price should be positive number</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Discount Type <FaStarOfLife size={8} className='text-red-500' /></p>
                                    <select
                                        name="discountType"
                                        value={inputs.discountType || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                    >
                                        <option value="Select">Select</option>
                                        <option value="Percentage">Percentage</option>
                                        <option value="Fixed">Fixed</option>
                                    </select>
                                </div>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Discount Value <FaStarOfLife size={8} className='text-red-500' /></p>
                                    <input
                                        type="number"
                                        name="discountValue"
                                        value={inputs.discountValue || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                        required
                                    />
                                    {
                                        inputs.discountvalue && inputs.discountValue < 1 && (
                                            <span className="text-red-500 text-[12px]">Discount amount should be positive number</span>
                                        )
                                    }
                                </div>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Quantity Alert <FaStarOfLife size={8} className='text-red-500' /></p>
                                    <input
                                        type="number"
                                        name="qtyAlert"
                                        value={inputs.qtyAlert || ""}
                                        onChange={handleChange}
                                        className="w-[100%] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                        required
                                    />
                                    {
                                        inputs.qtyAlert && inputs.qtyAlert < 1 && (
                                            <span className="text-red-500 text-[12px]">Quantity alert should be positive number</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className=' bg-white shadow'>
                            <div onClick={productImageOpen} className=' grid grid-cols-2 text-[18px] border-b border-gray-300 p-5 cursor-pointer mt-5'>
                                <div>Images</div>
                                <div className='flex justify-end'><FaChevronDown /></div>
                            </div>

                            <div className={`${isProductImageOpen ? "grid" : "hidden"}  grid-cols-1 lg:grid-cols-2 gap-[20px] p-[20px]  `}>
                                <div className="App col-span-2">
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
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            // write your building UI
                                            <div className="upload__image-wrapper  flex items-center flex-wrap gap-[10px]">
                                                <div

                                                    className='p-5  flex flex-col justify-center items-center border-[2px] border-dotted border-gray-300 h-[150px] w-[150px] rounded hover:bg-gray-100'
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >

                                                    <MdOutlineCloudUpload className='text-gray-500' size={64} />
                                                    <p className='text-[12px] text-gray-400'>Choose File or drag it here</p>

                                                </div>
                                                &nbsp;

                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item p-[10px]  ">
                                                        <img src={`data:image/png;base64,${images[0] && images[0]?.data_url}`} alt="" className='border border-gray-300 p-2 h-[100px] w-[100px]' />
                                                        <div className="image-item__btn-wrapper mt-3 flex justify-between gap-[10px]">
                                                            <div onClick={() => onImageUpdate(index)} className='text-[#FE9F43] p-2 border border-gray-200 rounded hover:bg-[#FE9F43] hover:text-white'><FaRegEdit size={15} /></div>
                                                            <div onClick={() => onImageRemove(index)} className='text-red-500 p-2 border border-gray-200 rounded hover:bg-red-500 hover:text-white'><RiDeleteBin6Line size={15} /></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                            </div>
                        </div>

                        <div className=' bg-white shadow mt-5'>
                            <div onClick={productDescriptionOpen} className=' grid grid-cols-2 text-[18px] border-b border-gray-300 p-5 cursor-pointer'>
                                <div>Product Description</div>
                                <div className='flex justify-end'><FaChevronDown /></div>
                            </div>

                            <div className={`${isProductDescriptionOpen ? "grid" : "hidden"} w-full  grid-cols-1  gap-[20px] p-[20px] `}>
                                <div>
                                    <p className='text-[14px] text-gray-700 flex gap-1'>Description <FaStarOfLife size={8} className='text-red-500' /></p>
                                    <textarea
                                        name="description"
                                        value={description || ""}
                                        onChange={handleDescription}
                                        className="w-[100%] h-[200px] text-[14px] text-gray-600 p-[8px] outline-0 border-[1px] border-gray-200 rounded-[5px]"
                                        required
                                    />
                                    {
                                        description && description.length < 3 && (
                                            <span className="text-red-500 text-[12px]">Description should be contain more than 3 characters</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-3 justify-end mt-5'>
                            <button onClick={resetInput} type="reset" className='bg-[#051A2D] border border-[#051A2D] px-4 py-2 text-white rounded duration-200 hover:text-[#051A2D] hover:bg-white'>Cancel</button>
                            <button type="submit" className='bg-[#FE9F43] border border-[#FE9F43] px-4 py-2 text-white rounded duration-200 hover:text-[#FE9F43] hover:bg-white'> Submit</button>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}
