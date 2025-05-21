import { LuCopyright } from "react-icons/lu";
export default function Footer(){
    return(
      <>
        <div className="grid grid-cols-2 bg-white m-[20px] p-[10px] rounded-[10px] shadow">
            <div className="flex  items-center gap-[5px] text-gray-600 text-[14px]"><LuCopyright/>Greentech. All Right Reserved</div>
            <div className="text-right text-gray-600 text-[14px]">Designed & Developed By Mostafizur Rahman</div>
        </div>
      </>
    )
}