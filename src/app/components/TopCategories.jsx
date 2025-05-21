"use client";
import { imagePath } from "../assets";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TopCategories() {
    const options = {
        chart: {
            type: "donut",
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#FF9022', '#092C4C', '#DD3F00'],
        labels: ["Category 1", "Category 2", "Category 3"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
        legend: {
            position: "right",
            offsetY: 0,
            height: 230,
        },
    };

    const series = [44, 55, 13];

    return (
        <div className="bg-white border border-gray-300 rounded-[10px] p-4">
            <div className="flex gap-[10px] items-center border-b border-gray-300 pb-[10px]">
                <div className="bg-[#FFDBEC] p-[5px] rounded-[5px] ">
                    <img
                        src={imagePath.topproduct}
                        className="h-[20px] w-[20px]"
                        alt="Top Product Icon"
                    />
                </div>
                <p className="text-[18px] font-semibold text-gray-600 font-['Poppins'] ">
                    Top Categories
                </p>
            </div>
            <div className="mt-4">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="donut"
                    width={380}
                />
            </div>
            <div className="pt-[10px]">
                <p className="font-['Poppins'] text-[14px] font-semibold text-gray-600 pb-[10px]">Category Statistics</p>
                <div className=" font-['Poppins'] text-[14px] border border-gray-300 rounded-[5px]">
                    <div className="border-b border-gray-300 grid grid-cols-2 p-[10px]"><p>Total Number Of Categories</p><p className="text-right">70</p></div>
                    <div className="grid grid-cols-2 p-[10px]"><p>Total Number Of Products</p><p className="text-right">70</p></div>
                </div>
            </div>
        </div>
    );
}
