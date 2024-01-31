"use client";
// import axios from "axios";
// import Link from "next/link";
// import React, {useState} from "react";
// import {toast} from "react-hot-toast";
// import {useRouter} from "next/navigation";


// export default function ProfilePage() {
//     const router = useRouter()
//     const [data, setData] = useState("nothing")
//     const logout = async () => {
//         try {
//             await axios.get('http://localhost:5500/api/logout')
//             toast.success('Logout successful')
//             localStorage.removeItem("token");
//             localStorage.removeItem("role");
//             router.push('/login')
//         } catch (error:any) {
//             console.log(error.message);
//             toast.error(error.message)
//         }
//     }

//     const getUserDetails = async () => {
//         const res = await axios.get('http://localhost:5500/api/current_user')
//         console.log(res.data);
//         setData(res.data.data._id)
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1>Profile</h1>
//             <hr />
//             <p>Profile page</p>
//             <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
//             </Link>}</h2>
//         <hr />
//         <button
//         onClick={logout}
//         className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >Logout</button>

//         <button
//         onClick={getUserDetails}
//         className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >GetUser Details</button>


//             </div>
//     )
// }
// pages/profile.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  // Add any other user properties as needed
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");

    if (!token) {
      // If not authenticated, navigate to the login page
      router.push("/login");
    } else {
      // If authenticated, fetch user details
      getUserDetails();
    }
  }, [router]);

  const getUserDetails = async () => {
    try {
      //const response = await axios.get("http://localhost:5500/api/current_user");
      const token = localStorage.getItem("token");
      const config_header = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
    };

    const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:5500/api/current_user",
        headers: config_header,
    };

    const response = await axios.request(config);
    setUser(response.data.user);
    } catch (error: any) {
      console.error("Error fetching user details", error.message);
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5500/api/logout");
      toast.success("Logout successful");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {user ? (
        <>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
        </>
      ) : null}
      <hr />
      <button
        onClick={handleLogout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

