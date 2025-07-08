import { useEffect, useState } from "react";
import { LuPrinter } from "react-icons/lu";
import getSales from "@/lib/getSales";
import getProducts from "@/lib/getProductList";
import { imagePath } from "@/assets";
import getCustomer from "@/lib/getCustomer";
export default function SalesDetailsModal({ sid, callback }) {
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsInfo, setProductsInfo] = useState([]);
    const [customer, setCustomer] = useState({});

   
   useEffect(()=>{
    async function getSalesData() {
        let salesData = await getSales();
        const productData = await getProducts();
        let customerData = await getCustomer();

        salesData = salesData.filter((data) => data.sid == sid)
        let productsId = salesData[0].pid.split(",");
        let productsQty = salesData[0].qty.split(",");
   
        customerData = customerData.filter((data) => data.id == salesData[0].cid)
   
        setCustomer({
            id: customerData[0].id,
            name: customerData[0].name,
            upazila: customerData[0].upazila,
            district: customerData[0].district,
            phone: customerData[0].phone
        });

        setProducts([]);
        productsId.map((product, index) => {
            setProducts(prev => ([...prev, { pid: product, qty: productsQty[index] }]))
        })

        setProductsInfo(productData)
        setSales({
            subTotal: salesData[0].subTotal,
            discount: salesData[0].discount,
            paid: salesData[0].paid,
            total: salesData[0].subTotal+salesData[0].tax-salesData[0].discount,
            tax: salesData[0].tax,
            status: salesData[0].status,
            date: salesData[0].invoicedate
        })
    }
    getSalesData()
}, [])

useEffect(() => {
    const updatedProducts = products.map((data) => {
        const prod = productsInfo.find((p) => p.SKU === data.pid);
        return prod
            ? { pid: prod.Pname, qty: data.qty, price: prod.Price, image: prod.Image }
            : { pid: data.pid, qty: data.qty, price: data.price, image: '' };
    });
    setProducts(updatedProducts);

}, [productsInfo]);

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
                    <h2 className="text-[17px] font-semibold py-1">{customer.name}</h2>
                    <p className="text-[14px] text-gray-600 py-1">{customer.upazila}, {customer.district}</p>
                    <p className="text-[14px] text-gray-600 py-1">Phone {customer.phone}</p>
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
                        <p className="text-[16px] text-gray-800]">{sales.date}</p>
                    </div>

                    <div className="flex items-center gap-2 py-1">
                        <p className="text-[14px] text-gray-600">Status: </p>
                        <p className="text-[12px] text-white bg-[#FE9F43] p-1 rounded-[5px]">{sales.status}</p>
                    </div>
                    <div className="flex items-center gap-2 py-1">
                        <p className="text-[14px] text-gray-600">Payment Status: </p>
                        <p className={`text-[12px]  bg-gray-200 p-1 rounded-[5px] ${sales.paid >= sales.total ? 'text-green-600' : 'text-red-600'}`}>{sales.paid >= sales.total ? 'Paid' : 'Due'}</p>
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
                                <td className="p-2 text-right">Qty</td>
                                <td className="p-2 text-right">Discount</td>
                                <td className="p-2 text-right">Total</td>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map((data) => (
                                    <tr>
                                        <td className="p-2 flex gap-2 items-center">
                                            <img src={data.image == "no-image" ? imagePath.noImage : `data:image/png;base64,${data.image}`} className="h-[40px] w-[40px]" alt="product" />
                                            {data.pid}</td>
                                        <td className="p-2">{data.price}</td>
                                        <td className="p-2 text-right">{data.qty}</td>
                                        <td className="p-2 text-right">0</td>
                                        <td className="p-2 text-right">{data.price * data.qty}</td>
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
                                    <td className="w-[200px] p-2 text-right text-gray-600">{sales.subTotal}</td>
                                </tr>
                                <tr className="text-gray-800 border-1 border-gray-300">
                                    <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Tax</td>
                                    <td className="w-[200px] p-2 text-right text-gray-600">{sales.tax}</td>
                                </tr>
                                <tr className="text-gray-800 border-1 border-gray-300">
                                    <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Discount</td>
                                    <td className="w-[200px] p-2 text-right text-gray-600">{sales.discount}</td>
                                </tr>
                                <tr className="text-gray-800 border-1 border-gray-300">
                                    <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Grand Total</td>
                                    <td className="w-[200px] p-2 text-right text-gray-600">{sales.subTotal + sales.tax - sales.discount}</td>
                                </tr>
                                <tr className="text-gray-800 border-1 border-gray-300">
                                    <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Paid</td>
                                    <td className="w-[200px] p-2 text-right text-gray-600">{sales.paid}</td>
                                </tr>
                                <tr className="text-gray-800 border-1 border-gray-300">
                                    <td className="w-[400px] p-2 bg-gray-200 border-r-1 border-gray-300 text-gray-700" >Due</td>
                                    <td className="w-[200px] p-2 text-right text-gray-600">{sales.subTotal + sales.tax - sales.discount - sales.paid}</td>
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