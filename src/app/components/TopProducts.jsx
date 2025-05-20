"use client";
import { useEffect, useState } from "react";
import getTopProducts from "../lib/getProducts";
import { imagePath } from "../assets";
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
            <div className="bg-white border border-gray-300  rounded-[10px] p-4">
                <div className="flex gap-[10px] items-center border-b border-gray-300 pb-[10px]">
                    <div className="bg-[#FFDBEC] p-[5px] rounded-[5px]"><img src={imagePath.topproduct} className="h-[20px] w-[20px]" /> </div>
                    <p className="text-[18px] font-semibold text-gray-600 font-['Poppins']">Top Selling Products</p>
                </div>
                {products.slice(0,5).map((product) => (
                    <div key={product.id} className="flex gap-[10px] my-[10px] py-[10px] items-center border-b-[1px] border-gray-300">
                        <img src={product.image} alt='product' height={48} width={48} />
                        <div>
                            <p className="font-['Poppins'] text-[14px] font-semibold text-gray-700">{product.title}</p>
                            <p className="font-['Poppins'] text-[13px] text-gray-600 ">{product.price} <span className="text-red-700 text-[20px]">.</span> 247+ Sales</p>
                         </div>   
                    </div>
                ))}
            </div>

        </>
    );
}
