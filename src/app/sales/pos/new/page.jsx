'use client'
import Image from "next/image";
import { imagePath } from "@/assets";
import { useState, useRef, useEffect, use } from 'react';
import SideBar from "@/components/SideBar";
import Footer from "@/components/footer";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import getCategories from "@/lib/getCategories";
import getProducts from "@/lib/getProductList";
import CustomInput from "@/components/CustomInput";
import { GoPlusCircle } from "react-icons/go";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbCurrencyTaka } from "react-icons/tb";
import { BsCash } from "react-icons/bs";
import { GoCreditCard } from "react-icons/go";
import { LuScanLine } from "react-icons/lu";
import { RiCloseCircleLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import CustomSelect from "@/components/UI/CustomSelect"
import getCustomer from "@/lib/getCustomer";
import Link from "next/link";
export default function POS() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [inputs, setInputs] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [cartItemQty, setCartItemQty] = useState({})
  const [cartLen, setCartLen] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, seTotal] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [isQr, setIsQr] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategories();
        const productData = await getProducts();
        const customerData = await getCustomer();
        setCategories(category);
        setProducts(productData);
        setFilteredProducts(productData);
        setCustomer(customerData)

      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [])



  const toggleSidebar = (val) => {
    if (val == "open") {
      setIsSidebarOpen(true);
    }
    else {
      setIsSidebarOpen(false);
    }
  };

  const sideBarHandle = () => {
    setCollapsed(!collapsed);
  }

  const selectCategory = (name) => {
    const filteredProduct = filteredProducts.filter((product) => product.Category === name);
    setProducts(filteredProduct);
  }

  useEffect(() => {
    const result = filteredProducts.filter((prod) =>
      prod.Pname.toLowerCase().includes(searchData.toLowerCase())
    );
    setProducts(result);

  }, [searchData])

  const findCustomer = (cPhone) => {
    customer.map((data) => {
      if (data.phone == cPhone) {
        setInputs({
          customerMobile: data.phone,
          customerName: data.name,
          customerUpazila: data.upazila,
          customerDistrict: data.district
        })
      }
    })
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    if (name == "customerMobile") {
      findCustomer(value)
    }
  }

  const handleCart = (sku) => {
    console.log("Product added to cart with SKU:", sku);
    let status = false;
    cartItems.forEach((product, index) => {
      if (product.SKU == sku) {
        status = true;
      }
    })
    if (status) {
      toast("Already product added into cart", {
        autoClose: 1500
      })
    }
    else {
      products.map((product) => {
        if (product.SKU == sku) {
          setCartItems(prev => ([...prev, product]))
          setCartItemQty(prev => ({ ...prev, [sku]: 1 }))
          setSubTotal(subTotal + product.Price);
        }
      })
    }
  }
  useEffect(() => {
    setCartLen(cartItems.length)
  }, [cartItems])

  const increaseCartQty = (sku) => {
    let qty = cartItemQty[sku] + 1
    setCartItemQty(prev => ({ ...prev, [sku]: qty }))
    cartItems.map((product, index) => {
      console.log("Cart Qty: " + product.Qty)
      if (product.SKU == sku) {
        setSubTotal(subTotal + product.Price);
      }
    })
  }

  const decreaseCartQty = (sku) => {
    let qty = cartItemQty[sku]
    if (qty > 1) {
      qty = qty - 1
      cartItems.map((product) => {
        if (product.SKU == sku) {
          setSubTotal(subTotal - product.Price);
        }
      })
    }
    setCartItemQty(prev => ({ ...prev, [sku]: qty }))
  }

  const removeCartItem = (sku) => {
    setCartItems(prev => prev.filter(product => product.SKU != sku));
    setCartItemQty(prev => {
      const updatedQty = { ...prev };
      delete updatedQty[sku];
      return updatedQty;
    });
    cartItems.map((product) => {
      if (product.SKU == sku) {
        setSubTotal(subTotal - product.Price * cartItemQty[sku]);
      }
    })
  };

  const handleTax = (e) => {
    setTax(e.target.value)
    setTaxValue(subTotal * e.target.value / 100)
  }
  const handleShipping = (e) => {
    setShippingCost(e.target.value)
  }
  const handleDiscount = (e) => {
    setDiscount(e.target.value)
    setDiscountValue(subTotal * e.target.value / 100)
  }

  useEffect(() => {
    setTaxValue(subTotal * tax / 100)
    setDiscountValue(subTotal * discount / 100)

  }, [subTotal])

  async function handleSubmit() {
    let pid = [];
    let size = 0;
    cartItems.map((product) => {
      pid.push(product.SKU)
    })
    for (let sku in cartItemQty) {
      size = size + cartItemQty[sku]
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/sales/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          pid: pid,
          qty: cartItemQty,
          size: size,
          price: subTotal,
          tax: taxValue,
          shipping: shippingCost,
          discount: discountValue,
          address: inputs.customerDelivery,
          cName: inputs.customerName,
          cMobile: inputs.customerMobile,
          cUpazila: inputs.customerUpazila,
          cDistrict: inputs.customerDistrict
        }),
      });

      const data = await res.json();
      if (data.status === 'success') {
        toast.success("Invoice Created  Successfully", {
          autoClose: 1500
        });
        setInputs({});
        setCartItems([]);
        setCartItemQty({});
        setTax(0);
        setDiscount(0);
        setShippingCost(0);
        setSubTotal(0);
        setTaxValue(0);
        setDiscountValue(0);
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
      <div className="w-full flex gap-[20px] bg-[#F7F7F7]">

        <SideBar sidebarOpen={isSidebarOpen} sideBarHandle={sideBarHandle} />

        <div className={`${collapsed ? "w-full ml-[0px] md:ml-[57px]" : "w-full ml-[0px] md:ml-[252px]"} duration-300 ease-in-out`}>
          <div className="md:hidden bg-white my-0 px-4 shadow-sm grid grid-cols-2 items-center sticky top-0 bottom-2  z-40">
            <button onClick={() => {
              toggleSidebar("open");
            }} className={`${isSidebarOpen ? "hidden" : "block"}  text-[18px] text-[#FE9F43]`}>
              <HiOutlineMenuAlt3 />
            </button>
            <button onClick={() => {
              toggleSidebar("close");
            }} className={`${isSidebarOpen ? "block" : "hidden"}`}>
              <Image src={imagePath.close} height={18} width={18} alt="icon" />
            </button>
            <Image src={imagePath.logo} alt="logo" width={235} height={48} />
          </div>
          <div className="w-full grid grid-cols-3">
            <div className="col-span-2 flex gap-3">
              <div className="m-1 w-[150px] fixed flex flex-col gap-3 justify-center items-center border-r-[1px] border-gray-300 h-[100vh] pt-[800px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#FE9F43_#FFE3CB]">
                {categories.map((category) => (
                  <div key={category.id} className="max-w-[100px] p-2 flex flex-col  justify-center items-center bg-white  border border-gray-300 rounded-[10px] text-gray-600 hover:text-[#FE9F43] 
                hover:border-[#FE9F43]
                cursor-pointer"
                    onClick={() => {
                      selectCategory(category.name)
                    }}
                  >
                    <img src={category.Image == "no-image" ? imagePath.noImage : `data:image/png;base64,${category.Image}`} className="h-[80px] w-[80px] object-fit" alt="product" />
                    <p className="text-[12px] text-center">{category.name}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#F9FAFB] w-full ml-[160px] pr-[5px]  h-[100vh] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#FE9F43_#FFE3CB]">
                <div className="py-3 px-1 flex justify-between items-center ">
                  <CustomInput
                    width="750"
                    type="search"
                    label={false}
                    placeholder="Search Product"
                    value={searchData}
                    onChange={(e) => { setSearchData(e.target.value) }}
                    name="search"
                  />
                  <div>
                    <Link href="/sales" className="text-white text-[14px] p-2 bg-[#FE9F43] rounded-[5px]">Sales List</Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 p-[4px]">
                  {
                    products.map((product) => (
                      <div key={product.SKU}
                        onClick={() => { handleCart(product.SKU) }}
                        className="bg-white border p-5 border-gray-200 rounded-[10px] hover:border-green-600 duration-300 ease-in-out" >
                        <div className="flex justify-center items-center mb-6">
                          <img src={product.Image == "no-image" ? imagePath.noImage : `data:image/png;base64,${product.Image}`} className="h-[150px] w-[150px] object-contain" alt="product" />
                        </div>
                        <p className="text-[14px] text-gray-500 ">{product.SubCategory}</p>
                        <p className="text-[14px] font-semibold text-gray-600 mt-2">{product.Pname}</p>
                        <div className="flex justify-between mt-2 border-t-1 border-gray-200 pt-2">
                          <p className="text-[14px] font-semibold text-green-700">$ {product.Price}</p>
                          <p className="text-[14px] text-red-600"> {product.QtyAlert} {product.Unit}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="py-[10px] p-[10px] border-l-[1px] border-gray-300 bg-white">
              <div className="text-[18px] text-gray-600 font-semibold pb-[10px] bg-[#F9FAFB] p-3 rounded-[5px]">
                <p>New Order</p>
                <p className="text-[14px] text-gray-400 font-light">Transaction ID: #656465</p>
              </div>
              <p className="text-[18px] text-gray-600 font-semibold pt-[20px] pb-[10px]">Customer Information</p>
              <div>
                <CustomInput
                  width="full"
                  label="Mobile"
                  name="customerMobile"
                  type="text"
                  value={inputs.customerMobile || ""}
                  onChange={handleChange}
                  placeholder=""
                  isRequired="true"
                />


                <CustomInput
                  width="full"
                  label="Customer Name"
                  name="customerName"
                  type="text"
                  value={inputs.customerName || ""}
                  onChange={handleChange}
                  placeholder=""
                />

                <CustomInput
                  width="full"
                  label="Upazila"
                  name="customerUpazila"
                  type="text"
                  value={inputs.customerUpazila || ""}
                  onChange={handleChange}
                  placeholder=""
                />
              
                <CustomInput
                  width="full"
                  label="District"
                  name="customerDistrict"
                  type="text"
                  value={inputs.customerDistrict || ""}
                  onChange={handleChange}
                  placeholder=""
                />
                <CustomInput
                  width="full"
                  label="Delivery Address"
                  name="customerDelivery"
                  type="text"
                  value={inputs.customerDelivery || ""}
                  onChange={handleChange}
                  placeholder=""
                />
              </div>
              <div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-[18px] text-gray-600 font-semibold pb-[10px]">Order Details</p>
                  <div className="p-2 text-[10px] text-gray-500 border-1 border-gray-300 rounded-[5px]">Items: <span className="text-green-600">{cartLen}</span></div>
                </div>
                {/* Order Cart Items */}
                {cartItems.map((product, index) => (
                  <div className="grid grid-cols-7 gap-6 mt-4 items-center bg-white border-1 border-gray-300 rounded-[5px] p-3">
                    <div className="col-span-4 grid grid-cols-4 items-center gap-2">
                      <div className="bg-[#FAFBFE] p-2 rounded-[10px] max-h-[82px]">
                        <img src={product.Image == "no-image" ? imagePath.noImage : `data:image/png;base64,${product.Image}`} className="h-[50px] w-[50px] object-contain" alt="product" />
                      </div>
                      <div className="col-span-3">
                        <p className="p-1 inline bg-[#FE9F43] text-white text-[12px] rounded-[5px]">{product.SKU}</p>
                        <p className="text-[14px] text-gray-800 font-semibold">{product.Pname}</p>
                        <p className="flex items-center text-[14px] text-green-700 font-semibold"><TbCurrencyTaka size={16} />{product.Price}</p>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-between items-center bg-[#E6EAED] rounded-[5px] p-2">
                      <FiMinusCircle size={16} onClick={() => { decreaseCartQty(product.SKU) }} />
                      <div className="text-gray-600 text-[14px]">{cartItemQty[product.SKU]}</div>
                      <FiPlusCircle size={16} onClick={() => { increaseCartQty(product.SKU) }} />
                    </div>
                    <div className="flex justify-end "><RiDeleteBin6Line size={16} onClick={() => { removeCartItem(product.SKU) }} /></div>
                  </div>
                ))}
                {/* Order Cart Items End */}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <CustomSelect
                  label="Order Tax"
                  options={[
                    { label: "GST 0%", value: 0 },
                    { label: "GST 5%", value: 5 },
                    { label: "GST 10%", value: 10 },
                    { label: "GST 15%", value: 15 },
                    { label: "GST 20%", value: 20 },
                    { label: "GST 25%", value: 25 }
                  ]}
                  value={tax}
                  handleSelect={(e) => handleTax(e)}
                />
                <CustomSelect
                  label="Shipping"
                  options={[
                    { label: "0", value: 0 },
                    { label: "50", value: 50 },
                    { label: "100", value: 100 },
                    { label: "150", value: 150 },
                    { label: "200", value: 200 },
                    { label: "250", value: 250 }
                  ]}
                  value={shippingCost}
                  handleSelect={(e) => handleShipping(e)}
                />

                <CustomSelect
                  label="Discount"
                  options={[
                    { label: "0%", value: 0 },
                    { label: "10%", value: 10 },
                    { label: "15%", value: 15 },
                    { label: "20%", value: 20 },
                    { label: "25%", value: 25 },
                    { label: "30%", value: 30 },
                    { label: "35%", value: 35 }
                  ]}
                  value={discount}
                  handleSelect={(e) => handleDiscount(e)}
                />
              </div>
              <div className="grid grid-cols-2 text-[15px] text-gray-600 bg-[#F9FAFB] mt-3 p-3">
                <p className="py-2">Sub Total</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} /> {subTotal}</p>
                <p className="py-2">Tax {`(GST ${tax}%)`}</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} />{taxValue}</p>
                <p className="py-2">Shipping</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} />{shippingCost}</p>
                <p className="py-2">Sub Total</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} />{subTotal + taxValue + parseInt(shippingCost)}</p>
                <p className="py-2 text-red-500">Discount</p><p className="flex items-center justify-end text-red-500"><TbCurrencyTaka size={20} />{discountValue}</p>
                <p className="py-4">Total</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} />{subTotal + taxValue + parseInt(shippingCost) - parseInt(discountValue)}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <p className="col-span-3 text-[18px] text-gray-600 font-semibold pb-[10px]">Payment Method</p>
                <div className="flex gap-1 flex-col items-center justify-center text-gray-600 p-2 border-1 border-gray-300 rounded-[10px] hover:border-amber-600 hover:bg-[#FFF6EE] hover:text-amber-600">
                  <BsCash className="text-[20px]" />
                  <p className="text-[14px">Cash</p>
                </div>
                <div className="flex gap-1 flex-col items-center justify-center text-gray-600 p-2 border-1 border-gray-300 rounded-[10px] hover:border-amber-600 hover:bg-[#FFF6EE] hover:text-amber-600">
                  <GoCreditCard className="text-[20px]" />
                  <p className="text-[14px]">Debit Card</p>
                </div>
                <div className="flex gap-1 flex-col items-center justify-center text-gray-600 p-2 border-1 border-gray-300 rounded-[10px] hover:border-amber-600 hover:bg-[#FFF6EE] hover:text-amber-600"
                  onClick={() => { setIsQr(true) }}
                >
                  <LuScanLine className="text-[20px]" />
                  <p className="text-[14px]" >Scan</p>
                </div>
                <button
                  onClick={handleSubmit}
                  className="col-span-3 p-3 my-3 bg-blue-950  text-white rounded-[10px] flex justify-center item-center ">Grand Total : <TbCurrencyTaka size={20} />  {subTotal + taxValue + parseInt(shippingCost) - parseInt(discountValue)} </button>
              </div>
            </div>
          </div>

        </div>
        <ToastContainer />
      </div>
      {
        isQr &&
        <div className="flex items-center justify-center fixed top-[50%] left-[50%]">
          <div className="bg-white flex items-center justify-center border-1 border-gray-300 rounded-[10px] h-[350px] w-[350px] absolute">
            <RiCloseCircleLine size={25} className="absolute right-[10px] top-[10px] text-red-600 "
              onClick={() => {
                setIsQr(false)
              }} />
            <img src={imagePath.bkashQR} height={300} width={300} className="object-contain" />
          </div>
        </div>
      }
    </>
  );
}
