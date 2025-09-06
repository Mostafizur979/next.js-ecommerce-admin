'use client';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { imagePath } from '../assets';
import Link from 'next/link';
import Swal from 'sweetalert2'
export default function ProductListTable({ data, index }) {
    async function deleteProduct(sku) {
                        alert(sku)
        const res = await fetch('http://127.0.0.1:8000/api/getproducts/', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        
            body: JSON.stringify({
                sku: sku
            }),
        });

    }
    return (
        <tr className="border-b-[1px] border-gray-300">
            <td className="p-2 py-4 pl-6">{index + 1}</td>
            <td className="p-2">{data.SKU}</td>
            <td className="flex items-center gap-[5px] p-2">
                <div className="p-[5px] bg-[#F2F2F2] rounded-[5px]">
                    {/* <img src={imagePath.noImage} className="h-[20px] w-[20px]" alt="product" /> */}
                    <img src={data.Image == "no-image" ? imagePath.noImage  : `data:image/png;base64,${data.Image}`} className="h-[20px] w-[20px]" alt="product" />
                </div>
                {data.Pname.length > 15 ? data.Pname.slice(0, 15) + '...' : data.Pname}
            </td>
            <td className="p-2">{data.Category}</td>
            <td className="p-2">{data.Price}</td>
            <td className="p-2">{data.Unit}</td>
            <td className="p-2">{data.Qty}</td>
            <td className="flex items-center gap-[5px] p-2">
                <img src={imagePath.user} height={20} width={20} alt="user" />
                John Doe
            </td>
            <td className="p-2 w-[150px]">
                <div className="flex gap-[10px]">
                    <Link href={{ pathname: "/product/details/", query: { id: data.SKU } }}
                        className='p-[5px] border-[1px] border-gray-300 rounded duration-300 hover:bg-[#FE9F43] hover:text-white'>
                        <MdOutlineRemoveRedEye />
                    </Link>
                    <Link href={{ pathname: "/product/new/", query: { id: data?.SKU } }}
                        className='p-[5px] border-[1px] border-gray-300 rounded duration-300 hover:bg-[#FE9F43] hover:text-white'>
                        <FaRegEdit />
                    </Link>
                    <div onClick={() => {
                        Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                deleteProduct(data?.SKU)
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your product has been deleted.",
                                    icon: "success"
                                });
                            }
                        });
                    }}
                        className='p-[5px] border-[1px] border-gray-300 rounded duration-300 hover:bg-[#FE9F43] hover:text-white'><RiDeleteBin5Line /></div>
                </div>
            </td>
        </tr>
    );
}
