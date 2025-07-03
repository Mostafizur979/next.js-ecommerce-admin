import CustomInput from "@/components/CustomInput"
import CustomSelect from "@/components/UI/CustomSelect"
import { useState } from "react"
export default function CreatePaymentModal({ selected, handle, callback }) {
    const [inputs, setInputs] = useState({});
    const [method, setMethod] = useState('');
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handlePayment = (event) => {
        setMethod(event.target.value);
    }

     async function handleSubmit() {

        try {
          const res = await fetch("http://127.0.0.1:8000/api/sales-payment/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({
              sid: selected.invId,
              method: method,
              amount: inputs.amount,
              addedBy: "Admin"

            }),
          });
    
          const data = await res.json();
          if (data.status === 'success') {
             callback();
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
                <h2 className="text-[18px] font-semibold borde-b-1 border-gray-300 p-3">Create payments</h2>
                <div className="px-3 grid grid-cols-2 gap-3">
                    <CustomInput
                        width="full"
                        label="Invoice Id"
                        name="amount"
                        type="text"
                        value={selected?.invId}
                        placeholder=""
                        onChange={() => { }}
                    />
                    <CustomInput
                        width="full"
                        label="Customer Id"
                        name="amount"
                        type="text"
                        value={selected?.name}
                        placeholder=""
                        onChange={() => { }}
                    />
                    <div className="col-span-2">
                        <CustomInput
                            width="full"
                            label="Received Amount"
                            name="amount"
                            type="text"
                            value={inputs.amount || ""}
                            onChange={handleChange}
                            placeholder=""

                        />
                    </div>
                    <CustomSelect
                        label="Payment Method"
                        options={[
                            { label: "COD", value: "COD" },
                            { label: "bKash", value: "bKash" },
                            { label: "Nagad", value: "Nagad" },
                            { label: "Rocket", value: "Rocket" },
                            { label: "DBBL", value: "DBBL" }
                        ]}
                        value={method}
                        handleSelect={handlePayment}
                    />

                    <div className="col-span-2 flex gap-3 justify-end ">
                        <button className="bg-[#2F2B36] p-2 rounded-[5px] text-white text-[14px]" onClick={handle}>Cancel</button>
                        <button className="bg-[#FE9F43] p-2 rounded-[5px] text-white text-[14px]" onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
            </div>
        </>
    )
}