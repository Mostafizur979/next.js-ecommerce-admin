import CustomInput from "@/components/CustomInput"
import { useEffect, useState } from "react"
import CustomReactSelect from '@/components/UI/CustomReactSelect';
import bdData from "@/lib/bd-address-data.json";
export default function AddCustomerModal({ selected, handle, callback }) {
    const [inputs, setInputs] = useState({});
    const [method, setMethod] = useState('');
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');
    const [state, setState] = useState('en')
    const [bdLocationData, setBdLocationData] = useState(bdData);
    const [divisionOption, setDivisionOption] = useState([])
    const [districtOption, setDistrictOption] = useState([]);
    const [upazilaOption, setUpazilaOption] = useState([]);
    const [district, setDistrict] = useState([]);

    useEffect(() => {
        const divisionData = [];
        bdLocationData.divisions.map((division, index) => {
            divisionData.push({ label: division.name, value: division.name })
        })
        setDivisionOption(divisionData);
    }, [])
    const handleDivisionChange = (division) => {
        const districts = bdLocationData.divisions.find(d => d.name === division)?.districts || [];
        setDistrict(districts);
        const districtData = [];
        districts.map((data, index) => {
            districtData.push({ label: data.name, value: data.name })
        })
        setDistrictOption(districtData);
    }

    const handleDistrictChange = (districtName) => {
        debugger
        const upazilas = district.find(d => d.name === districtName)?.upazilas || [];
        const upazilaData = [];
        upazilas.map((upazila, index) => {
           upazilaData.push({value: upazila, label: upazila})
           console.log("Up: "+upazila);
        })
        setUpazilaOption(upazilaData)

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handlePayment = (event) => {
        setMethod(event.target.value);
    }
    console.log(bdData)

    async function handleSubmit() {
        debugger
        try {
            const res = await fetch("http://127.0.0.1:8000/api/customer/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    name: inputs.name,
                    mobile: inputs.phone,
                    district: selectedDistrict,
                    upazila: selectedUpazila

                }),
            });

            const data = await res.json();
            if (data.status === 'success') {
                let msg = 'Customer information added Successfully';
                if(data.message == 0){
                   msg = 'Duplicate phone number!'
                }
                callback(msg);
                handle();
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
            <div>
                <h2 className="text-[18px] font-semibold borde-b-1 border-gray-300 p-3">Add Customer</h2>
                <div className="px-3 grid grid-cols-2 gap-3">
                    <CustomInput
                        width="full"
                        label="Name"
                        name="name"
                        type="text"
                        value={inputs.name || ''}
                        placeholder=""
                        onChange={(e) => handleChange(e)}
                    />
                    <CustomInput
                        width="full"
                        label="Phone"
                        name="phone"
                        type="text"
                        value={inputs.phone}
                        placeholder=""
                        onChange={(e) => { handleChange(e) }}
                    />
                    <CustomReactSelect label="Division" options={divisionOption} handleSelected={(division) => { handleDivisionChange(division.value) }} />
                    <CustomReactSelect label="District" options={districtOption} 
                      handleSelected={(data) => { 
                        handleDistrictChange(data.value) 
                        setSelectedDistrict(data.value)
                        }} />
                    <CustomReactSelect label="Upazila" options={upazilaOption} handleSelected={(data) => {setSelectedUpazila(data.value)}} />


                    <div className="col-span-2 flex gap-3 justify-end ">
                        <button className="bg-[#2F2B36] p-2 rounded-[5px] text-white text-[14px]" onClick={handle}>Cancel</button>
                        <button className="bg-[#FE9F43] p-2 rounded-[5px] text-white text-[14px]" onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
            </div>
        </>
    )
}
