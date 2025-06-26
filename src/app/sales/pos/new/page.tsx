'use client'
import Image from "next/image";
import { imagePath } from "@/assets";
import { useState, useRef, useEffect, use } from 'react';
import SideBar from "@/components/SideBar";
import Footer from "@/components/footer";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import getCategories from "@/lib/getCategories";
import getProducts from "@/lib/getProductList";
import { set } from "react-datepicker/dist/date_utils";
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchData, setSearchData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategories();
        const productData = await getProducts();

        setCategories(category);
        setProducts(productData);
        setFilteredProducts(productData);

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

  return (
    <>
      <div className="w-full flex gap-[20px] bg-[#F7F7F7]">

        <SideBar sidebarOpen={isSidebarOpen} sideBarHandle={sideBarHandle} />

        {/* Dashboard Body */}
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
          <div className="w-full  bg-[#F9FAFB] grid grid-cols-3">
            <div className="col-span-2 flex gap-3">
              <div className="w-[150px] flex flex-col gap-3 justify-center items-center border-r-[1px] border-gray-300 h-[100vh] pt-[800px] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#FE9F43_#FFE3CB]">
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

              <div className="w-full">
                <div className="py-3 px-1 ">
                  <input
                    type="search"
                    placeholder="Search Product"
                    value={searchData}
                    onChange={(e) => { setSearchData(e.target.value) }}
                    className="p-[10px] w-[150px] lg:w-[300px] border border-gray-300 text-gray-500 text-[14px] rounded-[10px] outline-0"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4 p-[4px]">
                  {
                    products.map((product) => (
                      <div key={product.id} className="bg-white border p-5 border-gray-200 rounded-[10px] hover:border-green-600 duration-300 ease-in-out" >
                        <div className="flex justify-center items-center mb-6">
                          <img src={product.Image == "no-image" ? imagePath.noImage : `data:image/png;base64,${product.Image}`} className="h-[150px] w-[150px] object-fit" alt="product" />
                        </div>
                        <p className="text-[14px] text-gray-500 ">{product.SubCategory}</p>
                        <p className="text-[14px] font-semibold text-gray-600 mt-2">{product.Pname}</p>
                        <div className="flex justify-between mt-2 border-t-1 border-gray-200 pt-2">
                          <p className="text-[14px] font-semibold text-gray-600">$ {product.Price}</p>
                          <p className="text-[14px] text-gray-500"> {product.QtyAlert}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
