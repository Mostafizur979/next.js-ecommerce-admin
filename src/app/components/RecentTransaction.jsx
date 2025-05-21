import { imagePath } from "../assets"
import Link from "next/link"
import { useState } from "react"
export default function RecentTransaction() {
    const [isSale, setIsSale] = useState(true);
    const [isPurchase, setIspurchase] = useState(false);
    const [isExpense, setIsexpense] = useState(false);
    const sales = () => {
        setIsSale(true);
        setIspurchase(false);
        setIsexpense(false);
    }
    const purchase = () => {
        setIsSale(false);
        setIspurchase(true);
        setIsexpense(false);
    }
    const expense = () => {
        setIsSale(false);
        setIspurchase(false);
        setIsexpense(true);
    }
    return (
        <>
            <div className="bg-white rounded-xl shadow p-4">
                <div className="flex relative gap-[10px] items-center border-b border-gray-300 pb-[10px]">
                    <div className="bg-[#FFDBEC] p-[5px] rounded-[5px]"><img src={imagePath.transaction} className="h-[20px] w-[20px]" /> </div>
                    <p className="text-[18px] font-semibold text-gray-600   ">Recent Transactions</p>
                    <Link className="text-right absolute right-0 text-[12px] underline duration-300 hover:text-[#FE9F43]" href="">View All</Link>
                </div>
                <div>
                    <div className="pt-[10px] flex justify-between">
                        <p onClick={sales} className={`pt-[10px] cursor-pointer ${isSale ? "text-[#EC7C39] border-b-[2px] border-[#EC7C39]" : "border-0"}`}>Sale</p>
                        <p onClick={purchase} className={`pt-[10px] cursor-pointer ${isPurchase ? "text-[#EC7C39] border-b-[2px] border-[#EC7C39]" : "border-0"}`}>Purchase</p>
                        <p onClick={expense} className={`pt-[10px] cursor-pointer ${isExpense ? "text-[#EC7C39] border-b-[2px] border-[#EC7C39]" : "border-0"}`}>Expenses</p>
                    </div>
                    <div className={`pt-[10px] overflow-x-scroll ${isSale ? "block" : "hidden"}`}>
                        <table className="min-w-[600px] lg:w-full  text-[12px] text-gray-700 ">
                            <thead>
                                <tr className="text-left pb-[10px]">
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6, 7].map((data) => (
                                    <tr key={data}>
                                        <td className="text-gray-500">20 May 2025</td>
                                        <td className="flex gap-[10px]">
                                            <img src={imagePath.user} alt="user" height={32} width={32} className="rounded-[5px] overflow-hidden" />
                                            <div >
                                                <p className="font-semibold">Andressa Willer</p>
                                                <p className="text-[11px] text-[#EB7B38]">#11589</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="bg-[#3EB780] max-w-[85px] px-[10px] py-[5px] text-white text-[11px] rounded-[10px]">Completed</div>
                                        </td>
                                        <td className="text-gray-900 font-semibold py-[20px] ">
                                            $4,500
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={`pt-[10px] overflow-x-scroll ${isPurchase ? "block" : "hidden"}`}>
                        <table className="min-w-[600px] lg:w-full text-[12px] text-gray-700 ">
                            <thead>
                                <tr className="text-left pb-[10px]">
                                    <th>Date</th>
                                    <th>Supplier</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6, 7].map((data) => (
                                    <tr key={data}>
                                        <td className="text-gray-500">20 May 2025</td>
                                        <td>Electro Mart</td>
                                        <td>
                                            <div className="bg-[#3EB780] max-w-[85px] px-[10px] py-[5px] text-white text-[11px] rounded-[10px]">Completed</div>
                                        </td>
                                        <td className="text-gray-900 font-semibold py-[20px] ">
                                            $4,500
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={`pt-[10px] overflow-x-scroll ${isExpense ? "block" : "hidden"}`}>
                        <table className="min-w-[600px] lg:w-full text-[12px] text-gray-700 ">
                            <thead>
                                <tr className="text-left pb-[10px]">
                                    <th>Date</th>
                                    <th>Expenses</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5, 6, 7].map((data) => (
                                    <tr key={data}>
                                        <td className="text-gray-500">20 May 2025</td>
                                        <td>
                                            <p className="font-semibold">Electricity Payment</p>
                                            <p className="text-[11px] text-[#EB7B38]">#11589</p>
                                        </td>
                                        <td>
                                            <div className="bg-[#3EB780] max-w-[85px] px-[10px] py-[5px] text-white text-[11px] rounded-[10px]">Completed</div>
                                        </td>
                                        <td className="text-gray-900 font-semibold py-[20px] ">
                                            $4,500
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </>
    )
}