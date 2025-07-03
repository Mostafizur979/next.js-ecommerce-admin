import getSalesPayment from "@/lib/getSalesPayment"
import { useEffect, useState } from "react"
import { CgCloseO } from "react-icons/cg";
export default function SalesPaymentListModal({sid='', handlePaymentList}) {
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        async function paymentList() {
            let paymentData = await getSalesPayment();
            paymentData = paymentData.filter((data)=> data.sid == sid)
            setPayments(paymentData);
        }
        paymentList()
    }, [sid])
    return (
        <>
            <div>
                <div>
                    <div className="p-2 font-semibold text-green-600 flex justify-between"> 
                        <p>{sid}</p>
                        <div className="text-red-700"><CgCloseO size={20} className="cursor-pointer"
                         onClick={handlePaymentList}
                        /></div>
                    </div>
                    <table className="lg:w-full text-[14px] " >
                        <thead>
                            <tr className="font-semibold text-gray-800 border-t border-b border-gray-200 bg-white z-10 ">
                                <td className="p-2">Payment Id</td>
                                <td className="p-2">Method</td>
                                <td className="p-2">Amount</td>
                                <td className="p-2">Author</td>
                                <td className="p-2">Date</td>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((data, index) => (
                                <tr className="border-b-[1px] border-gray-200" key={index}>
                                    <td className="p-2">{data.id}</td>
                                    <td className="p-2">{data.method}</td>
                                    <td className="p-2">{data.amount}</td>
                                    <td className="p-2">{data.author}</td>
                                    <td className="p-2">{data.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>


            </div>
        </>
    )
}