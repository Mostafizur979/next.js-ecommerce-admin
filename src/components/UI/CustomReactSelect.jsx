import React, { useState } from 'react';
import Select from 'react-select';

export default function SelectComponent({ label = "default label", options, handleSelected, isRequired = false, width = "full" }) {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

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
        name="color"
        options={options}
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
          // Change the background of selected item in dropdown
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#FE9F43' : state.isFocused ? '#FFF3E0' : undefined,
            color: state.isSelected ? 'white' : 'black',
            '&:hover': {
              backgroundColor: '#FFF3E0',
              color: 'black',
            },
          }),
          //  Style the displayed selected value
          singleValue: (base) => ({
            ...base,
            color: 'black',
            padding: '2px 6px',
            borderRadius: '5px',
          }),
        }}
      />
    </div>
  );
}
