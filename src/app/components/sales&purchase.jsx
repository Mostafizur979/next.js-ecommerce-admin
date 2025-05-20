'use client'
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { imagePath } from "../assets";
import Image from "next/image";
export default function SalesPurchaseBar() {
  const [sales, setSales] = useState([800000, 815000, 830000, 845000, 860000, 875000, 890000, 905000, 920000, 935000, 950000, 965000]);
  const [purchase, setPurchase] = useState([800000, 805000, 820000, 830000, 845000, 860000, 875000, 890000, 905000, 920000, 935000, 950000]);
  const [selectedYear, setSelectedYear] = useState("2022");

  const salesPurchaseUpdate = (year) => {
    setSelectedYear(year);

    const generateRandomData = () => {
      return Array.from({ length: 12 }, () =>
        Math.floor(Math.random() * (1000000 - 800000 + 1)) + 800000
      );
    };

    setSales(generateRandomData());
    setPurchase(generateRandomData());
  };

  const series = [
    {
      name: "Sales",
      data: sales,
    },
    {
      name: "Purchase",
      data: purchase,
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false, 
    },
    colors: ['#FE9F43', '#FFE3CB'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
    },
    legend: {
      position: 'right',
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <div className="grid grid-cols-2 pb-[10px] border-b-[1px] border-gray-300 mb-[10px]">
        <div className="flex items-center gap-[10px]">
          <div className="bg-[#FFE3CB] p-[5px] rounded-[5px]">
            <Image src={imagePath.cart} alt="icon" height={20} width={20} />
          </div>
          <div>
            <h2 className="text-[18px] font-semibold text-gray-600 font-['Poppins']">Sales & Purchase</h2>
          </div>

        </div>
        <div className="flex justify-end">
          <div className="flex border border-gray-300 rounded-[10px] overflow-hidden">
            {["2025", "2024", "2023", "2022"].map((year) => (
              <p
                key={year}
                onClick={() => salesPurchaseUpdate(year)}
                className={`cursor-pointer p-[5px] border-r border-gray-300 last:border-r-0 font-medium 
                  ${selectedYear === year ? "bg-[#FE9F43] text-white" : "bg-[#F9FAFB] text-gray-700"}`}
              >
                {year}
              </p>
            ))}
          </div>
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
}
