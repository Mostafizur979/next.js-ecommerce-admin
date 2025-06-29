export default function CustomSelect({ label, options, value, handleSelect }) {
    return (
        <div>
            <p className="text-[14px] py-1">{label}</p>
            <select
                value={value}
                onChange={handleSelect}
                className="w-full p-2 border border-gray-300 rounded-[5px] text-sm text-gray-700 outline-none"
            >
                {options.map((data, index) => (
                    <option key={index} value={data.value}>
                        {data.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
