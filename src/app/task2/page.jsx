'use client'
import { useState, useEffect } from "react";
import { FamilyTree } from "@/components/task-component"
export default function page() {

    const [searchData, setSearchData] = useState('');
    const [searchResult, setSearchResult] = useState(FamilyTree);
    const [parentResult, setParentResult] = useState([]);
    const [childResult, setChildResult] = useState([]);

    const handleChange = (e) => {
        setSearchData(e.target.value)
    }

    useEffect(() => {
        let parent = [];
        let child = [];
        let root = FamilyTree.filter((data) => data.Name.toLowerCase().includes(searchData.toLowerCase().trim()) || data.Location.toLowerCase().includes(searchData.toLowerCase().trim()));


        FamilyTree.map((pData, index) => {
            let parentdata = pData.Parents.filter((data) => data.Name.toLowerCase().includes(searchData.toLowerCase().trim()) || data.Location.toLowerCase().includes(searchData.toLowerCase().trim()));
            if (parentdata.length != 0) {
                parent = [...parent, ...parentdata]
            }

            pData.Parents.map((child2) => {
                let childData = child2.Children.filter((data) => data.Name.toLowerCase().includes(searchData.toLowerCase().trim()) || data.Location.toLowerCase().includes(searchData.toLowerCase().trim()));
                if (childData.length != 0) {
                    child = [...child, ...childData]
                }
            })

        })
        setSearchResult(root)
        setParentResult(parent)
        setChildResult(child)
    }, [searchData])




    return (
        <>
            <div className="p-4 flex justify-center ">
                <input type="search"
                    name="searchData"
                    value={searchData || ''}
                    onChange={handleChange}
                    className="border-1 border-gary-600 p-1 outline-0 w-[500px] rounded-[10px]"
                />
            </div>
            <div className="p-4">
                {searchResult.map((data) => (
                    <div className="p-2 my-2 border-1 border-gray-500 rounded-[10px]">
                        <div>
                            <p>Name: {data.Name} </p>
                            <p>Age: {data.Age} </p>
                            <p>Location: {data.Location}</p>

                        </div>
                    </div>
                ))}
                {parentResult.map((data) => (
                    <div className="p-2 my-2 border-1 border-gray-500 rounded-[10px]">
                        <div>
                            <p>PName: {data.Name} </p>
                            <p>Age: {data.Age} </p>
                            <p>Location: {data.Location}</p>

                        </div>
                    </div>
                ))}
                {childResult.map((data) => (
                    <div className="p-2 my-2 border-1 border-gray-500 rounded-[10px]">
                        <div>
                            <p>PName: {data.Name} </p>
                            <p>Age: {data.Age} </p>
                            <p>Location: {data.Location}</p>

                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}