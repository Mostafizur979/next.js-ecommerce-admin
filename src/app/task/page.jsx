'use client'
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Input from "@/components/task-component";
export default function test() {
    const [inputs, setInputs] = useState({});
    const [subTotal, setSubTotal] = useState({});
    const [subTotal2, setSubTotal2] = useState(0);
    const [vat, setVat] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const product = [
        {
            name: "Redmi Note 12 5G",
            price: 24000,

        },
        {
            name: "Realme C25",
            price: 14000,

        },
        {
            name: "Samsung S24 Ultra",
            price: 124000,

        }
    ]
    const [items, setItems] = useState([{ name: product[0].name, price: product[0].price, qty: "", discount: "", total: "" }])

    const handleSubTotal = (index) => {
        let tempProduct = items;
        let price = tempProduct[index].price;
        let qty = tempProduct[index].qty;
        let Discount = tempProduct[index].discount;
        Discount = (price * qty * Discount) / 100;
        let sub = (price * qty) - Discount;
        tempProduct[index].total = sub;
        setItems(tempProduct)
        console.log("price: " + price)
        console.log("Qty: " + qty);
        console.log("Disc: " + Discount);
        console.log("Sub: " + sub)
        setSubTotal(prev => ({ ...prev, [index]: sub }))
        handleVat(vat);

    }
    const handleVat = (value) => {
        let vat2 = value;
        vat2 = subTotal2 + (subTotal2*parseInt(vat2))/100;
        setTotalAmount(vat2)
        setVat(value);
    }

    useEffect(() => {
        let total = 0;
        let tmp = [subTotal];
        items.map((data, index) => {
            total = total + parseFloat(subTotal[index])
            console.log("SubTotal: " + total)
        })
        setSubTotal2(total)
        setTotalAmount(total)
    }, [subTotal])

    const handleName = (event, index) => {
        let tempProduct = items;
        tempProduct[index].name = event.target.value;
        product.map((prod) => {
            if (prod.name == event.target.value) {
                tempProduct[index].price = prod.price

            }
        })

        setItems(tempProduct)
        handleSubTotal(index)
        console.log("HandleName: " + event.target.value + "Prd Price: " + items[index].price)

    }
    const handlePrice = (event, index) => {
        event.preventDefault()
        let tempProduct = items;
        tempProduct[index].price = event.target.value;
        setItems(tempProduct)
        handleSubTotal(index)
        console.log("Price: " + items[index].price)
    }

    const handleQty = (event, index) => {
        let tempProduct = items;
        tempProduct[index].qty = event.target.value;
        setItems(tempProduct)
        handleSubTotal(index)
    }

    const handleDiscount = (event, index) => {
        let tempProduct = items;
        tempProduct[index].discount = event.target.value;
        setItems(tempProduct)
        handleSubTotal(index)
        console.log("Dis: " + tempProduct[index].discount)
    }


    const addMore = () => {
        setItems(values => ([...values, { name: product[0].name, price: product[0].price, qty: "", discount: "", total: "" }]))
    }



    return (
        <>
            <div className="flex justify-end p-5"><div onClick={addMore} className="text-white max-w-[100px]  text-center text-[14px] bg-green-700 inline p-2">Add More</div></div>
            <div className="grid grid-cols-5 gap-2 p-5 border-b-1">
                <div>Product Name</div>
                <div>Price</div>
                <div>Qty</div>
                <div>Discount(%)</div>
                <div className="text-right">Sub Total</div>
            </div>
            {
                items.map((data, index) => (
                    <div key={index}>
                        <form className="grid grid-cols-5 gap-2 p-5" >
                            <div >
                                <select
                                    name="productName"
                                    onChange={(e) => { handleName(e, index) }}
                                    className="border-1 border-gray-600 p-2">
                                    {product.map((prod, index) => (
                                        <option value={prod.name} key={index}>{prod.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="price"
                                    value={data.price || ''}
                                    onChange={(e) => { handlePrice(e, index) }}
                                    className="border-1 border-gray-600 p-2"
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="qty"
                                    value={data.qty || ''}
                                    onChange={(e) => { handleQty(e, index) }}
                                    className="border-1 border-gray-600 p-2"
                                />
                                {
                                    data.qty && data.qty < 0 ? <span className="text-red-600 text-[14px]">Invalid Qty Number</span> : <span></span>
                                }
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="discount"
                                    value={data.discount || ''}
                                    onChange={(e) => { handleDiscount(e, index) }}
                                    className="border-1 border-gray-600 p-2"
                                />
                                {
                                    data.discount && data.discount > 100 ? <span className="text-red-600 text-[14px]">Discount Should Be Less Than 100%</span> : <span></span>
                                }
                            </div>
                            <div >
                                <div className="text-right font-semibold"> {subTotal[index]}</div>
                            </div>
                        </form>
                    </div>
                ))
            }
            <div className="border-b-1"></div>
            <div className="flex gap-5 justify-end p-4">
                <p>Sub Total: </p>
                <p>{isNaN(subTotal2) ? 0 : subTotal2}</p>
            </div>
            <div className="flex gap-5 items-center justify-end p-4">
                <p>Vat(%): </p>
                <div>
                    <input
                        type="number"
                        name="vat"
                        value={vat || ''}
                        onChange={(e)=>{handleVat(e.target.value)}}
                        className="border-1 border-gray-600 p-2 w-[60px] "
                    />

                </div>
            </div>
            <div className="flex gap-5 justify-end p-4">
                <p>Total: </p>
                <p>{isNaN(totalAmount) ? 0 : totalAmount}</p>
            </div>
        </>
    )
}