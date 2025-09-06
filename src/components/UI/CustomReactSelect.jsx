import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export default function SelectComponent({
  label = "default label",
  options,
  value = null,          
  handleSelected,
  isRequired = false,
  width = "full"
}) {
  const [isClearable] = useState(true);
  const [isSearchable] = useState(true);
  const [isDisabled] = useState(false);
  const [isLoading] = useState(false);
  const [isRtl] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || options?.[0]);


  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
    else{
      setSelectedOption(options?.[0])
    }
  }, [value]);

  const floatLabel = isFocused || (!!selectedOption && selectedOption?.label?.length > 0);

  return (
    <div className={`relative ${width === "full" ? "w-full" : "w-[300px]"} mt-4`}>
      {label && (
        <label
          className={`
            absolute left-2 px-1 text-gray-500 transition-all duration-200 bg-white
            ${floatLabel ? "top-[-7px] text-[12px]" : "top-2 text-sm"}
            z-10
          `}
          onClick={() => setIsFocused(true)}
        >
          {label}
          {isRequired && <span className="text-red-600"> *</span>}
        </label>
      )}

      <Select
        className="basic-single"
        classNamePrefix="select"
        value={selectedOption}
        onChange={(option) => {
          setSelectedOption(option);
          handleSelected(option);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="select"
        options={options}
        menuPortalTarget={document.body}
        styles={{
          control: (base, state) => ({
            ...base,
            paddingTop: 0,
            fontSize: 14,
            boxShadow: 'none',
            outline: 'none',
            borderColor: state.isFocused ? '#FE9F43' : base.borderColor,
            '&:hover': {
              borderColor: '#FE9F43',
            },
          }),
          valueContainer: (base) => ({
            ...base,
            paddingTop: 2
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? '#FE9F43'
              : state.isFocused
              ? '#FFF3E0'
              : undefined,
            color: state.isSelected ? 'white' : 'black',
            '&:hover': {
              backgroundColor: '#FFF3E0',
              color: 'black',
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: 'black',
            padding: '2px 6px',
            borderRadius: '5px',
          }),
          menu: (base) => ({
            ...base,
            zIndex: 50,
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 50,
          }),
        }}
      />
    </div>
  );
}
