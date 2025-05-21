"use client";
import { useEffect, useState } from "react";
import getTopProducts from "../lib/getProducts";
import { imagePath } from "../assets";
import Link from "next/link";
export default function LowStockProducts() {
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
                <div className="flex relative gap-[10px] items-center border-b border-gray-300 pb-[10px]">
                    <div className="bg-[#FFDBEC] p-[5px] rounded-[5px]"><img src={imagePath.warning} className="h-[20px] w-[20px]" /> </div>
                    <p className="text-[18px] font-semibold text-gray-600   ">Low Stock Products</p>
                    <Link className="text-right absolute right-0 text-[12px] underline duration-300 hover:text-[#FE9F43]" href="">View All</Link>
                </div>
                {products.slice(5, 10).map((product) => (
                    <div key={product.id} className="flex relative gap-[10px] my-[10px] py-[10px] items-center border-b-[1px] border-gray-300">
                         <div className="h-[48px] w-[48px]  rounded"><img src={product.image} alt='product' className="h-full w-full " /></div>
                        <div>
                              <p className="text-[14px]  text-gray-700">{product.title.length>40 ? product.title.slice(0,40)+"..." : product.title}</p>
                              <p className="text-[13px] text-gray-600 ">ID: {"6697"+product.id}</p>
                        </div>
                        <div className="absolute right-0 text-right">
                            <p className="text-[12px]">Instock</p>
                            <p className="text-[12px] text-red-600">05</p>
                        </div>
                    </div>
                ))}
            </div>

        </>
    );
}
