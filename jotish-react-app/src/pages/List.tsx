import { useEffect, useState } from "react";
import { Meteors } from "../components/ui/meteors";
import { CometCard } from "@/components/ui/comet-card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function List() {
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const [parsedData,setParsedData]=useState([])
    useEffect(() => {
        const f=async ()=>{
            const res=await axios.post('https://backend.jotish.in/backend_dev/gettabledata.php',{
                "username":"test",
                "password":"123456"
            })
            console.log(res.data)
            const newData=res?.data?.TABLE_DATA?.data
            console.log(newData)
            setData(newData)
            const parsed = newData.map((item: any) => ({
                name: item[0],
                role: item[1],
                location: item[2],
                pincode: item[3],
                joiningDate: new Date(item[4]), 
                salary: Number(item[5].replace(/[^0-9.-]+/g, "")) 
            }));
            setParsedData(parsed)
        }
        f()
    },[])
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950">

        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <Meteors number={400} /> 
        </div>

      <div className="relative z-10 flex flex-col items-center py-20 px-4">
        {data?.map((item : any)=>{
            return (
                <CometCard>
            <button
                type="button"
                className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4"
                aria-label="View invite F7RA"
                style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
                }}
                onClick={()=>{
                    const params = new URLSearchParams({
                    name: item[0],
                    role: item[1],
                    location: item[2],
                    pincode: item[3],
                    date: item[4],   // Already a string! e.g., "2011/04/25"
                    salary: item[5]  // Already a string! e.g., "$320,800"
                });
                
                navigate(`/details?${params.toString()}`);
                }}
            >
                <div className="mx-2 flex-1">
                <div className="relative mt-2 aspect-[3/4] w-full">
                    <img
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
                    alt="Invite background"
                    src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                        opacity: 1,
                    }}
                    />
                </div>
                </div>
                <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                <div className="text-xs">{item[0]}</div>
                <div className="text-xs text-gray-300 opacity-50">{item[1]}</div>
                </div>
            </button>
                </CometCard>
            )
        })}
         
      </div>
    </div>
  );
}