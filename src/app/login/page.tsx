"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5500/api/login", user);
      console.log("Login success", response.data);
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.role)
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-semibold ">{loading ? "Processing" : "Login"}</h1>
      <hr className="w-1/2 mb-8" />

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
        onClick={onLogin}
        disabled={buttonDisabled}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <Link href="/signup" className="mt-4 text-blue-500">
        Visit Signup page
      </Link>
    </div>
  );
}
