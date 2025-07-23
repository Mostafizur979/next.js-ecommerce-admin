import { useRouter } from "next/navigation";
import { LuPrinter } from "react-icons/lu";
import { imagePath } from "@/assets";
import { useState } from "react";
export default function CreateSalesDetailsModal({ items, shippingAddress, callback, subTotal, discount, vat, shippingPrice, netTotal, successFull }) {
    const router =  useRouter();
    debugger
    async function handleSubmit() {
        let pid = [];
        let size = 0;
        let qty = {};
        let prices = [];
        let taxes = [];
        let discounts = [];

        items.map((product) => {
            pid.push(product.id);
            size = size + parseInt(product.qty);
            qty = {...qty, [product.id] : product.qty};
            prices.push(product.price);
            taxes.push(product.vat);
            discounts.push(product.discount)
        })
        

        try {
            const res = await fetch("http://127.0.0.1:8000/api/sales/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    pid: pid,
                    qty: qty,
                    size: size,
                    price: subTotal,
                    tax: vat,
                    shipping: shippingPrice,
                    discount: discount,
                    address: shippingAddress.address,
                    cName: shippingAddress.cName,
                    cMobile: shippingAddress.cPhone,
                    cUpazila: shippingAddress.upazila,
                    cDistrict: shippingAddress.district,
                    individualPrice: prices,
                    individualTax: taxes,
                    indivualDiscount: discounts
                }),
            });

            const data = await res.json();
            if (data?.status === 'success') {
                successFull();
                router.push("/sales");
            
            } else {
                alert(`Error: ${data?.message}`);
            }

        } catch (error) {
            console.error('Fetch error:', error);
            alert("Failed to submit");
        }
    }
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
                <div className="grid md: grid-cols-2 lg:grid-cols-3 gap-3 p-3">
                    <div>
                        <h3 className="text-[15px] font-semibold py-2">Customer Info</h3>
                        <h2 className="text-[17px] font-semibold py-1">{shippingAddress?.cName}</h2>
                        <p className="text-[14px] text-gray-600 py-1">{shippingAddress?.address}</p>
                        <p className="text-[14px] text-gray-600 py-1">{shippingAddress?.upazila}, {shippingAddress?.district}</p>
                        <p className="text-[14px] text-gray-600 py-1">Phone {shippingAddress?.cPhone}</p>
                    </div>
                    <div>
                        <h3 className="text-[15px] font-semibold py-2">Company Info</h3>
                        <h2 className="text-[17px] font-semibold py-1">XYZ</h2>
                        <p className="text-[14px] text-gray-600 py-1">Mirpur-10, Dhaka</p>
                        <p className="text-[14px] text-gray-600 py-1">Phone +8801767820520</p>
                    </div>
                    <div className="cols-span-2 md:col-span-1">
                        <h3 className="text-[15px] font-semibold py-2">Invoice Info</h3>
                        <div className="flex gap-2 py-1">
                            <p className="text-[14px] text-gray-600">Reference: </p>
                            <p className="text-[16px] text-[#FE9F43]">{ }</p>
                        </div>
                        <div className="flex gap-2 py-1">
                            <p className="text-[14px] text-gray-600">Date: </p>
                            <p className="text-[16px] text-gray-800]">{ }</p>
                        </div>

                        <div className="flex items-center gap-2 py-1">
                            <p className="text-[14px] text-gray-600">Status: </p>
                            <p className="text-[12px] text-white bg-[#FE9F43] p-1 rounded-[5px]">{ }</p>
                        </div>
                        <div className="flex items-center gap-2 py-1">
                            <p className="text-[14px] text-gray-600">Payment Status: </p>
                            <p className={`text-[12px]   p-1 rounded-[5px] ${true ? 'text-green-600' : 'text-red-600'}`}>{true ? 'Paid' : 'Due'}</p>
                        </div>

                    </div>
                </div>
                <div className="p-3 py-0">
                    <p className="text-[14px] py-2">Order Summary</p>
                    <div>
                        <table className="lg:w-full text-[14px] " >
                            <thead>
                                <tr className="font-semibold border-t border-b border-gray-200  text-gray-700 z-10 ">
                                    <td className="p-2"><span className="pr-5">#</span><span>Items</span></td>
                                    <td className="p-2">Price</td>
                                    <td className="p-2 text-right">Qty</td>
                                    <td className="p-2 text-right">Vat</td>
                                    <td className="p-2 text-right">Discount</td>
                                    <td className="p-2 text-right">Total</td>
                                </tr>
                            </thead>

                            <tbody className="border-b-[1px] border-gray-300">
                                {
                                    items?.map((data, index) => (
                                        <tr>
                                            <td className="p-2 flex gap-2 items-center">
                                                <span className="pr-5">{index + 1}</span>
                                                <img src={data.image == "no-image" ? imagePath.noImage : `data:image/png;base64,${data.image}`} className="h-[30px] w-[30px]" alt="product" />
                                                {data.name}
                                            </td>
                                            <td className="p-2">{data.price}</td>
                                            <td className="p-2 text-right">{data.qty}</td>
                                            <td className="p-2 text-right">{data.vat}</td>
                                            <td className="p-2 text-right">{data.discount}</td>
                                            <td className="p-2 text-right font-semibold">{data.total}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end py-4 font-semibold">
                        <div className="w-[300px]">
                            <table>
                                <tbody>
                                    <tr className="text-gray-800">
                                        <td className="w-[400px] p-2   text-gray-700" >Sub Total</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">{subTotal}</td>
                                    </tr>
                                    <tr className="text-gray-800 ">
                                        <td className="w-[400px] p-2   text-gray-700" >Tax</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">{vat}</td>
                                    </tr>
                                    <tr className="text-gray-800 ">
                                        <td className="w-[400px] p-2   text-gray-700" >Discount</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">{discount}</td>
                                    </tr>
                                    <tr className="text-gray-800 ">
                                        <td className="w-[400px] p-2   text-gray-700" >Shipping Price</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">{shippingPrice}</td>
                                    </tr>
                                    <tr className="text-gray-800 border-t-[1px] border-gray-400 ">
                                        <td className="w-[400px] p-2   text-gray-700" >Grand Total</td>
                                        <td className="w-[200px] p-2 text-right text-gray-600">{netTotal}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <button className="bg-[#D1D5DB] p-2 px-4 mr-4 text-red-600 rounded-[10px] cursor-pointer" onClick={callback}>Cancel</button>
                        <button className="bg-[#FE9F43] p-2 px-6 text-white rounded-[10px] cursor-pointer" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}