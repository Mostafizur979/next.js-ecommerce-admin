'use client'
import { useEffect, useReducer, useState } from "react"

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_NAME:
            return { ...state, name: action.payload }
        case actionTypes.SET_MOBILE:
            return { ...state, mobile: action.payload }
        case actionTypes.SET_DISTRICT:
            return { ...state, district: action.payload }
    }
}
const initialState = {
    name: "",
    mobile: "",
    district: ""
}
const actionTypes = {
    SET_NAME: "SET_NAME",
    SET_MOBILE: "SET_MOBILE",
    SET_DISTRICT: "SET_DISTRICT"
}
export default function Page() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputs(prev => ({...prev, [name]: value}))
    }


    return (
        <>
            <form className="p-2 flex gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={state.name}
                    className="p-2 w-[300px] border"
                    onChange={(event) => { dispatch({ type: actionTypes.SET_NAME, payload: event.target.value }) }}
                />
                <input
                    type="text"
                    placeholder="Mobile"
                    value={state.mobile}
                    className="p-2 w-[300px] border"
                    onChange={(event) => { dispatch({ type: actionTypes.SET_MOBILE, payload: event.target.value }) }}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={state.district}
                    className="p-2 w-[300px] border"
                    onChange={(event) => { dispatch({ type: actionTypes.SET_DISTRICT, payload: event.target.value }) }}
                />
            </form>

            <div className="p-2">
                <p>Name: {state.name}</p>
                <p>Mobile: {state.mobile}</p>
                <p>District: {state.district}</p>
            </div>
        </>
    )
}