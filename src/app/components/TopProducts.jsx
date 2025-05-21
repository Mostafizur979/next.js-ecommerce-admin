"use client";
import { useEffect, useState } from "react";
import getTopProducts from "../lib/getProducts";
import { imagePath } from "../assets";
import { LuDot } from "react-icons/lu";

export default function TopProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getTopProducts();
            setProducts(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="bg-white rounded-xl shadow p-4">
                <div className="flex gap-[10px] items-center border-b border-gray-300 pb-[10px]">
                    <div className="bg-[#FFDBEC] p-[5px] rounded-[5px]"><img src={imagePath.topproduct} className="h-[20px] w-[20px]" /> </div>
                    <p className="text-[18px] font-semibold text-gray-600 ">Top Selling Products</p>
                </div>
                {products.slice(0,5).map((product) => (
                    <div key={product.id} className="flex gap-[10px] my-[10px] py-[10px] items-center border-b-[1px] border-gray-300">
                        <div className="h-[48px] w-[48px]  rounded"><img src={product.image} alt='product' className="h-full w-full object-fit" /></div>
                        <div>
                            <p className="text-[14px]  text-gray-700">{product.title.length>40 ? product.title.slice(0,40)+"..." : product.title}</p>
                            <p className=" text-[13px] text-gray-600 flex items-center ">${product.price} <span className="text-red-700 "><LuDot /></span> 247+ Sales</p>
                         </div>   
                    </div>
                ))}
            </div>

        </>
    );
}
