import { useState } from "react";

export default function CustomInput({ width="full", label, name, type = "text", value = "", onChange, placeholder = "", isRequired = false, disabled = false}) {
  const [isFocused, setIsFocused] = useState(false);

  const floatLabel = isFocused || (type=="text" && value?.length > 0) || (type=="number" && value > 0) || value?.length > 0;

  return (
    <div className={`relative ${width === "full" ? "w-full" : "w-[300px]"} mt-4`}>
      {label && (
        <label
          className={`
            absolute left-3 px-1  text-gray-500 transition-all duration-200 
            ${floatLabel  ? "top-[-7px] text-[12px] bg-white" : "top-3 text-sm"}
          `}
          onClick={() => setIsFocused(true)}
        >
          {label}{isRequired && <span className="text-red-600"> *</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={floatLabel ? "" : placeholder}
        autoComplete="off"
        className="w-full p-2 border border-gray-300 rounded-[5px] text-sm text-gray-700 outline-none"
        readOnly = {disabled}
      />
    </div>
  );
}
