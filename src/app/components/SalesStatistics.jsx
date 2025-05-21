import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { imagePath } from '../assets';
import Image from 'next/image';
export default function SalesStatistics() {
    let sales = [8000, 22000, 21000, 18000, 18000, 16000, 22000, 15000, 18000, 12000, 7000, 18000];
    let expense = [-9000, -22000, -20000, -16000, -17000, -15000, -21000, -17000, -16000, -19000, -18000, -20000];
    let totalSales = sales.reduce((acc, val) => acc + val, 0);
    let totalExpense = expense.reduce((acc, val) => acc + val, 0);

    const chartOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '25%',
                endingShape: 'rounded',
                borderRadius: 5,
                borderRadiusApplication: 'end'
            }
        },
        colors: ['#0E9384', '#E04F16'],
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
            title: { text: 'Amount ($)' },
        },
        tooltip: {
            y: {
                formatter: val => `$${val}`,
            }
        },
        legend: {
            position: 'top'
        }
    };

    const chartSeries = [
        {
            name: 'Sales',
            data: sales
        },
        {
            name: 'Expense',
            data: expense
        }
    ];

    return (
        <div className="p-4 bg-white rounded-xl shadow">
            <div className="grid grid-cols-2 pb-[10px] border-b-[1px] border-gray-300 mb-[10px]">
                <div className="flex items-center gap-[10px]">
                    <div className="bg-[#FFE3CB] p-[5px] rounded-[5px]">
                        <Image src={imagePath.cart} alt="icon" height={20} width={20} />
                    </div>
                    <div>
                        <h2 className="text-[18px] font-semibold text-gray-600 font-['Poppins']">Sales Statistics</h2>
                    </div>

                </div>
                <div className="flex justify-end">
                    <div className="flex border border-gray-300 rounded-[10px] overflow-hidden">
                        {["2025", "2024", "2023", "2022"].map((year) => (
                            <p
                                key={year}

                                className={`cursor-pointer p-[5px] border-r border-gray-300 last:border-r-0 font-medium 
                bg-[#F9FAFB] text-gray-700`}
                            >
                                {year}
                            </p>
                        ))}
                    </div>
                </div>
                <div className='col-span-2 pt-[10px] grid grid-cols-3 gap-[10px]'>
                    <div className='p-[10px] border border-gray-300 rounded-[5px]'>
                        <p className='text-[#0E9588] text-[13px]' >${totalSales}</p>
                        <p className='text-[12px] text-gray-600'>Sales</p>
                    </div>
                    <div className='p-[10px] border border-gray-300 rounded-[5px]'>
                        <p className='text-[#E65A16] text-[13px]' >${totalExpense}</p>
                        <p className='text-[12px] text-gray-600'>Expense</p>
                    </div>
                    <div className='p-[10px] border border-gray-300 rounded-[5px]'>
                        <p className='text-[#0E9588] text-[13px]' >${totalSales + totalExpense}</p>
                        <p className='text-[12px] text-gray-600'>Revenue</p>
                    </div>
                </div>
            </div>
            <Chart options={chartOptions} series={chartSeries} type="bar" height={392} />
        </div>
    );
}
