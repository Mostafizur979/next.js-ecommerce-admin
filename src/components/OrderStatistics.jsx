"use client";
import dynamic from "next/dynamic";
import React from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { imagePath } from "../assets";
export default function OrderStatistics() {
  const series = [
    {
      name: "2 AM",
      data: [30, 40, 45, 35, 20, 10, 5],
    },
    {
      name: "4 AM",
      data: [40, 55, 65, 50, 30, 25, 10],
    },
    {
      name: "6 AM",
      data: [20, 30, 35, 25, 10, 40, 45],
    },
    {
      name: "8 AM",
      data: [10, 25, 20, 15, 10, 35, 50],
    },
    {
      name: "10 AM",
      data: [50, 60, 70, 55, 40, 20, 15],
    },
    {
      name: "12 PM",
      data: [10, 20, 15, 10, 5, 0, 0],
    },
    {
      name: "2 PM",
      data: [5, 10, 10, 5, 0, 0, 0],
    },
    {
      name: "4 PM",
      data: [0, 5, 10, 0, 0, 15, 20],
    },
    {
      name: "6 PM",
      data: [0, 0, 0, 0, 10, 20, 25],
    },
    {
      name: "8 PM",
      data: [0, 0, 0, 0, 0, 10, 30],
    },
  ];

  const options = {
    chart: {
      type: "heatmap",
      height: 370,
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 20,
              name: "Low",
              color: "#FDE4C8", 
            },
            {
              from: 21,
              to: 40,
              name: "Medium",
              color: "#F59E0B", 
            },
            {
              from: 41,
              to: 100,
              name: "High",
              color: "#F58B3C", 
            },
          ],
        },
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
   
  };

  return (
        <div className="p-4 bg-white rounded-xl shadow">
            <div className="grid grid-cols-2 pb-[10px] border-b-[1px] border-gray-300 mb-[10px]">
                <div className="flex items-center gap-[10px]">
                    <div className="bg-[#FFE3CB] p-[5px] rounded-[5px]">
                        <img src={imagePath.cart} alt="icon" height={20} width={20} />
                    </div>
                    <div>
                        <h2 className="text-[18px] font-semibold text-gray-600 font-['Poppins']">Order Statistics</h2>
                    </div>
                </div>
            </div>
             <ReactApexChart options={options} series={series} type="heatmap" height={375} />
        </div>

   
  );
}
