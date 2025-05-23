'use client';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { imagePath } from '../assets';
import Link from 'next/link';
import Swal from 'sweetalert2'
export default function ProductListTable({ data, index }) {
    return (
        <tr className="border-b-[1px] border-gray-300">
            <td className="p-2 py-4 pl-6">{index + 1}</td>
            <td className="p-2">{data.id}</td>
            <td className="flex items-center gap-[5px] p-2">
                <div className="p-[5px] bg-[#F2F2F2] rounded-[5px]">
                    <img src={data.image} className="h-[20px] w-[20px]" alt="product" />
                </div>
                {data.title.length > 15 ? data.title.slice(0, 15) + '...' : data.title}
            </td>
            <td className="p-2">{data.category}</td>
            <td className="p-2">{data.price}</td>
            <td className="p-2">Pc</td>
            <td className="p-2">100</td>
            <td className="flex items-center gap-[5px] p-2">
                <img src={imagePath.user} height={20} width={20} alt="user" />
                John Doe
            </td>
            <td className="p-2 w-[150px]">
                <div className="flex gap-[10px]">
                    <Link href={`/productdetails/${data.id}`}
                        className='p-[5px] border-[1px] border-gray-300 rounded duration-300 hover:bg-[#FE9F43] hover:text-white'>
                        <MdOutlineRemoveRedEye />
                    </Link>
                    <div className='p-[5px] border-[1px] border-gray-300 rounded duration-300 hover:bg-[#FE9F43] hover:text-white'><FaRegEdit /></div>
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
