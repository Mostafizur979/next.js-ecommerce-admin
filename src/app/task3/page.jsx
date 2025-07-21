'use client'
import { useEffect, useState } from "react";

export default function Page() {
    const [stocks, setStocks] = useState([]);
    const [highstock, setHighStock] = useState('');
    const inventory = [
        {
            productId: "P001",
            name: "Laptop",
            categories: ["Electronics", "Computing"],
            stock: [
                { location: "Warehouse 1", quantity: 5 },
                { location: "Warehouse 2", quantity: 15 },
            ],
            reorderThreshold: 10,
            suppliers: [
                { id: "S001", name: "TechSupply Co.", priority: 1 },
                { id: "S002", name: "Global Distributors", priority: 2 },
            ],
        },
        {
            productId: "P002",
            name: "Mouse",
            categories: ["Electronics", "Accessories"],
            stock: [
                { location: "Warehouse 1", quantity: 50 },
                { location: "Warehouse 3", quantity: 0 },
            ],
            reorderThreshold: 20,
            suppliers: [
                { id: "S003", name: "FastTech", priority: 1 },
                { id: "S004", name: "Accessory World", priority: 3 },
            ],
        },
        {
            productId: "P003",
            name: "Monitor",
            categories: ["Electronics", "Displays"],
            stock: [
                { location: "Warehouse 1", quantity: 2 },
                { location: "Warehouse 2", quantity: 1 },
            ],
            reorderThreshold: 5,
            suppliers: [
                { id: "S005", name: "Vision Supplies", priority: 2 },
            ],
        },
    ];
    // 2. Find the total stock available for each product across all warehouses.
   useEffect(()=>{
        let max = 0;
        inventory.map((data,index)=>{
        let stock = 0;
        data.stock.map((product,idx)=>{
           stock = stock + parseInt(product.quantity)
        })
        if(stock > max){
            max = stock;
            setHighStock(data.productId)
        }
        setStocks(prev => ([...prev, { id:data.productId, name:data.name, stockValue: stock }]))
    })
   },[])

    return (
        <>
            <div className="flex justify-center">
                <table>
                    <thead>
                        <tr>
                            <td className="px-4 py-2">Product Id</td>
                            <td className="px-4 py-2">Product Name</td>
                            <td className="px-4 py-2">Stock Quantity</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocks.map((data, index) => (
                                <tr className={`${highstock==data.id ? 'text-red-600': 'text-gray-800'}`}>
                                    <td className="px-4 py-2">{data.id}</td>
                                    <td className="px-4 py-2">{data.name}</td>
                                    <td className="px-4 py-2">{data.stockValue}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )

}