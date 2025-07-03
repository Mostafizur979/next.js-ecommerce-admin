import { useEffect, useState } from "react";
import { LuPrinter } from "react-icons/lu";
import getSales from "@/lib/getSales";
export default function SalesDetailsModal({ sid, callback }) {
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function getSalesData() {
            let salesData = await getSales();
            salesData = salesData.filter((data) => data.sid == sid)
            let productsId = salesData[0].pid.split(",");
            let productsQty = salesData[0].qty.split(",");
            setProducts([])
            productsId.map((product, index) => {
                setProducts(prev => ([...prev, { pid: product, qty: productsQty[index] }]))
            })

        }
        getSalesData()
    }, [])
    return (
        <>
            <div>
                <div className="flex justify-between pb-3 border-b-1 border-gray-300 ">
                    <h2 className="text-[18px] font-semibold p-3  ">Sales Detais</h2>
                    <div className="flex gap-2 items-center">
                        <div><LuPrinter size={24} onClick={() => { print() }} /></div>
                        <button className="bg-[#131C37] p-2 px-4 rounded-[5px] text-white text-[14px]" onClick={callback}>Back to Sales</button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 p-3">
                    <div>
                        <h3 className="text-[15px] font-semibold py-2">Customer Info</h3>
                        <h2 className="text-[17px] font-semibold py-1">Mostafizur Rahman</h2>
                        <p className="text-[14px] text-gray-600 py-1">Puthia, Rajshahi</p>
                        <p className="text-[14px] text-gray-600 py-1">Phone +8801767820520</p>
                    </div>
                    <div>
                        <h3 className="text-[15px] font-semibold py-2">Company Info</h3>
                        <h2 className="text-[17px] font-semibold py-1">XYZ</h2>
                        <p className="text-[14px] text-gray-600 py-1">Mirpur-10, Dhaka</p>
                        <p className="text-[14px] text-gray-600 py-1">Phone +8801767820520</p>
                    </div>
                    <div>
                        <h3 className="text-[15px] font-semibold py-2">Invoice Info</h3>
                        <div className="flex gap-2 py-1">
                            <p className="text-[14px] text-gray-600">Reference: </p>
                            <p className="text-[16px] text-[#FE9F43]">{sid}</p>
                        </div>
                        <div className="flex gap-2 py-1">
                            <p className="text-[14px] text-gray-600">Date: </p>
                            <p className="text-[16px] text-gray-800]">Dec 24, 2024</p>
                        </div>

                        <div className="flex items-center gap-2 py-1">
                            <p className="text-[14px] text-gray-600">Status: </p>
                            <p className="text-[12px] text-white bg-green-600 p-1 rounded-[5px]">Completed</p>
                        </div>
                        <div className="flex items-center gap-2 py-1">
                            <p className="text-[14px] text-gray-600">Payment Status: </p>
                            <p className="text-[12px] text-green-600 bg-gray-200 p-1 rounded-[5px]">Completed</p>
                        </div>

                    </div>
                </div>
                <div className="p-3 py-0">
                    <p className="text-[14px] py-2">Order Summary</p>
                    <div>
                        <table className="lg:w-full text-[14px] " >
                            <thead>
                                <tr className="font-semibold border-t border-b border-gray-200 bg-gray-200 text-gray-700 z-10 ">
                                    <td className="p-2">Product</td>
                                    <td className="p-2">Price</td>
                                    <td className="p-2">Qty</td>
                                    <td className="p-2">Discount</td>
                                    <td className="p-2">Total Cost</td>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products.map((data) => (
                                        <tr>
                                            <td className="p-2">{data.pid}</td>
                                            <td className="p-2"></td>
                                            <td className="p-2">{data.qty}</td>
                                            <td className="p-2"></td>
                                            <td className="p-2"></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end py-4">
                        <div>
                            <table>
                                <tbody>
                                    <tr className="text-gray-800 border-1 border-gray-300">
                                        <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Sub Total</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">1000</td>
                                    </tr>
                                    <tr className="text-gray-800 border-1 border-gray-300">
                                        <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Tax</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">10</td>
                                    </tr>
                                    <tr className="text-gray-800 border-1 border-gray-300">
                                        <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Discount</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">50</td>
                                    </tr>
                                    <tr className="text-gray-800 border-1 border-gray-300">
                                        <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Grand Total</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">960</td>
                                    </tr>
                                    <tr className="text-gray-800 border-1 border-gray-300">
                                        <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Paid</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">960</td>
                                    </tr>
                                    <tr className="text-gray-800 border-1 border-gray-300">
                                        <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Due</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}