'use client';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { imagePath } from '../assets';
import Link from 'next/link';
import Swal from 'sweetalert2'

export default function SubCategoryListTable({ data, index }) {
    return (
        <>
            <tr className="border-b-[1px] border-gray-300">
                <td className="p-2 py-4 pl-6"> {index}</td>
                <td className="p-2">{data.name}</td>
                <td className="p-2">{data.parentCategory}</td>
                <td className="p-2">{data.createdOn}</td>
                <td className="flex items-center gap-[5px] p-2">
                    <img src={imagePath.user} height={20} width={20} alt="user" />
                    John Doe
                </td>
                <td className='p-2'>
                    <p className={`text-white w-18 text-center rounded py-1 px-2 ${data.status == "Active" ? 'bg-[#3EB780] ' : 'bg-[#FE9F43] ' }`}>{data.status}</p>
                </td>
                <td className="p-2 w-[150px]">
                    <div className="flex gap-[10px]">
                        <Link
                            href={{ pathname: "/product/sub-category/edit/", query: { id: data?.id } }}
                            className='p-[5px] border-[1px] border-gray-300 rounded duration-300 hover:bg-[#FE9F43] hover:text-white'><FaRegEdit /></Link>
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


        </>
    );
}
