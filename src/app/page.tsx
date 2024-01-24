"use client"
import axios from "axios";
import { useEffect } from "react";


export default function Home() {
  const fetchData =async () => {
        try {
            const config_header = {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
            };
    
            // URL-encoded form data
            const urlEncodedData = new URLSearchParams();
            urlEncodedData.append("courseId", "659bcc06ea253d5fdcb633cb");
    
            const config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "http://localhost:5500/api/scan",
                headers: config_header,
                data: urlEncodedData, // Attaching the URL-encoded form data
            };
    
            const res = await axios.request(config);
        } catch (error) {
            console.error("Error fetching:", error);
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div>
      Watch video course!
    </div>
  )
}
