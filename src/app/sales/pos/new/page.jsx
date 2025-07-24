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
import { useRouter } from "next/navigation";
export default function POS() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [inputs, setInputs] = useState({});
  const [cartLen, setCartLen] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [isQr, setIsQr] = useState(false);
  const [netTotal,setNetTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
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

  const handleCart = (productId) => {
    const product = filteredProducts.find(prod => prod.SKU == productId);
    const isExist = cartItems.find(data => data.id == productId);
    if (isExist?.id == productId) {
      toast.warn('Already added this product', { autoClose: 1500 })
      return
    }
    setCartItems(prev =>
    ([...prev,
    {
      id: product.SKU,
      name: product.Pname,
      unit: product.Unit,
      qty: 1,
      stock: product.QtyAlert,
      price: product.Price,
      discount: product.Price * product.DiscountValue / 100,
      vat: '0',
      total: product.Price - product.Price * product.DiscountValue / 100,
      image: product.Image
    }]))
  }
  const removeCartItem = (pId) => {
    debugger
    const newItems = cartItems.filter(prod => prod.id != pId);
    console.log("NewItems: " + newItems)
    setCartItems(newItems);
  }

  const increaseCartQty = (index) => {
    const tempProduct = [...cartItems];
    tempProduct[index].qty = tempProduct[index].qty + 1;
    tempProduct[index].total = (parseFloat(tempProduct[index].price || 0) + parseFloat(tempProduct[index].vat || 0) - parseFloat(tempProduct[index].discount || 0)) * parseInt(tempProduct[index].qty);
    setCartItems(tempProduct)
  }

  const decreaseCartQty = (index) => {
    const tempProduct = [...cartItems];
    tempProduct[index].qty = tempProduct[index].qty - 1;
    tempProduct[index].total = (parseFloat(tempProduct[index].price || 0) + parseFloat(tempProduct[index].vat || 0) - parseFloat(tempProduct[index].discount || 0)) * parseInt(tempProduct[index].qty);
    setCartItems(tempProduct)
  }

  useEffect(() => {
    setCartLen(cartItems.length)
  }, [cartItems])

  useEffect(() => {
    let subTotal = 0;
    let discountAmount = 0;
    let vatAmount = 0;
    cartItems.map((data) => {
      subTotal = subTotal + parseFloat(data.price || 0) * parseInt(data.qty);
      discountAmount = discountAmount + parseFloat(data.discount || 0) * parseInt(data.qty);
      vatAmount = vatAmount + parseFloat(data.vat || 0) * parseInt(data.qty);
    })
    setDiscount(discountAmount)
    setSubTotal(subTotal);
    setNetTotal(subTotal + vatAmount - discountAmount);
  }, [cartItems])


 async function handleSubmit() {
        let pid = [];
        let size = 0;
        let qty = {};
        let prices = [];
        let taxes = [];
        let discounts = [];
        cartItems.map((product) => {
            pid.push(product.id);
            size = size + parseInt(product.qty);
            qty = {...qty, [product.id] : product.qty};
            prices.push(product.price);
            taxes.push(product.vat);
            discounts.push(product.discount)
        })
        debugger
        if(!inputs.customerMobile || !inputs.customerName || !inputs.customerUpazila || !inputs.customerDistrict || !inputs.customerDelivery ) {
          toast.warn("Please fill all required field")
          return 
        }
        if(inputs.customerMobile.length == 0 || inputs.customerName.length == 0 || inputs.customerUpazila.length == 0 || inputs.customerDistrict.length == 0 || inputs.customerDelivery.length == 0){
          toast.warn("Please fill all required field")
          return 
        }
        

        try {
            const res = await fetch("http://127.0.0.1:8000/api/sales/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    pid: pid,
                    qty: qty,
                    size: size,
                    price: subTotal,
                    tax: 0,
                    shipping: 0,
                    discount: discount,
                    address: inputs.customerDelivery,
                    cName: inputs.customerName,
                    cMobile: inputs.customerMobile ,
                    cUpazila: inputs.customerUpazila,
                    cDistrict: inputs.customerDistrict,
                    individualPrice: prices,
                    individualTax: taxes,
                    indivualDiscount: discounts
                }),
            });

            const data = await res.json();
            if (data?.status === 'success') {
                toast.success("Successfully Added Sales",{autoClose: 1500})
                router.push("/sales");
            
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

        <SideBar sidebarOpen={isSidebarOpen} defaultCollapsed={collapsed} sideBarHandle={sideBarHandle} />

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
          <div className="w-full grid grid-cols-4">
            <div className="col-span-3 flex gap-3">
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

                <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-[4px]">
                  {
                    products.map((product) => (
                      <div key={product.SKU}
                        onClick={() => { handleCart(product.SKU) }}
                        className="bg-white relative border p-5 border-gray-200 rounded-[10px] hover:border-green-600 duration-300 ease-in-out" >
                        <div className="flex justify-center items-center mb-6">
                          <img src={product.Image == "no-image" ? imagePath.noImage : `data:image/png;base64,${product.Image}`} className="h-[150px] w-[150px] object-contain" alt="product" />
                        </div>
                        <p className="text-[14px] text-gray-500 ">{product.SubCategory}</p>
                        <p className="text-[14px] font-semibold text-gray-600 mt-2">{product.Pname}</p>
                        <div className="flex justify-between mt-2 border-t-1 border-gray-200 pt-2">
                          <p className="text-[14px] font-semibold text-green-700">$ {product.Price}</p>
                          <p className="text-[14px] text-red-600"> {product.QtyAlert} {product.Unit}</p>
                        </div>
                        <div className="absolute top-2 right-0 text-[12px] bg-green-600 text-white p-1 ">{product.DiscountValue}%</div>
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
                        <img src={product.image == "no-image" ? imagePath.noImage : `data:image/png;base64,${product.image}`} className="h-[50px] w-[50px] object-contain" alt="product" />
                      </div>
                      <div className="col-span-3">
                        <p className="p-1 inline bg-[#FE9F43] text-white text-[12px] rounded-[5px]">{product.id}</p>
                        <p className="text-[14px] text-gray-800 font-semibold">{product.name}</p>
                        <p className="flex gap-2 text-[14px] text-green-700 font-semibold">
                          <div className="flex">
                            <TbCurrencyTaka size={16} />
                            {product.total}
                          </div>
                          <div className="flex text-gray-500 text-[12px] line-through">
                            <TbCurrencyTaka size={16} />
                            {product.price*product.qty}
                          </div>
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-between items-center bg-[#E6EAED] rounded-[5px] p-2">
                      <FiMinusCircle size={16} onClick={() => { decreaseCartQty(index) }} />
                      <div className="text-gray-600 text-[14px]">{product.qty}</div>
                      <FiPlusCircle size={16} onClick={() => { increaseCartQty(index) }} />
                    </div>
                    <div className="flex justify-end "><RiDeleteBin6Line size={16} onClick={() => { removeCartItem(product.id) }} /></div>
                  </div>
                ))}
                {/* Order Cart Items End */}
              </div>
              {/* <div className="grid grid-cols-3 gap-3 mt-4">
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
              </div> */}
              <div className="grid grid-cols-2 text-[15px] text-gray-600 bg-[#F9FAFB] mt-3 p-3">
                <p className="py-2">Sub Total</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} /> {subTotal}</p>
                {/* <p className="py-2">Tax {`(GST ${tax}%)`}</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} />{taxValue}</p> */}
                {/* <p className="py-2">Shipping</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} />{shippingCost}</p> */}
                {/* <p className="py-2">Sub Total</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} />{subTotal + taxValue + parseInt(shippingCost)}</p> */}
                <p className="py-2 text-red-500">Discount</p><p className="flex items-center justify-end text-red-500"><TbCurrencyTaka size={20} />{discount}</p>
                <p className="py-4">Total</p><p className="flex items-center justify-end"><TbCurrencyTaka size={20} />{netTotal}</p>
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
                  className="col-span-3 p-3 my-3 bg-blue-950  text-white rounded-[10px] flex justify-center item-center ">Grand Total : <TbCurrencyTaka size={20} />  {netTotal} </button>
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
