"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        name: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5500/api/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.name.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-3xl font-semibold">{loading ? "Processing" : "Signup"}</h1>
          <hr className="w-1/2 mb-8" />
    
          {/* Name Input */}
          <div className="flex mb-4">
            <label htmlFor="name" className="mr-2 text-lg">
              Name
            </label>
            <input
              className="input-field"
              id="name"
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>
    
          {/* Email Input */}
          <div className="flex mb-4">
            <label htmlFor="email" className="mr-2 text-lg">
              Email
            </label>
            <input
              className="input-field"
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>
    
          {/* Password Input */}
          <div className="flex mb-6">
            <label htmlFor="password" className="mr-2 text-lg">
              Password
            </label>
            <input
              className="input-field"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>
    
          <button
            onClick={onSignup}
            disabled={buttonDisabled}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            {buttonDisabled ? "No signup" : "Signup"}
          </button>
    
          <Link href="/login" className="mt-4 text-blue-500">
            Visit login page
          </Link>
        </div>
      );
}