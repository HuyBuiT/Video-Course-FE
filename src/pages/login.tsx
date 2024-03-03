// LoginPage.tsx
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import '../css/pages/login.css'
interface User {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, user);
      console.log("Login success", response.data);
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("role", response.data.role);
      toast.success("Login success");
      navigate('/')
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user.email, user.password]);

  return (
    <div className="login-container">
      <h1 className="login-title">{loading ? "Processing..." : "Login"}</h1>
      <hr className="login-divider" />

      {/* Form */}
      <form onSubmit={onLogin} className="login-form">
        {/* Email Input */}
        <div className="login-input">
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            className="login-field"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="login-input">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            className="login-field"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={buttonDisabled}
          className={`login-button ${
            buttonDisabled ? "login-button-disabled" : "login-button-enabled"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
        <Toaster/>
      {/* Link to Signup */}
      <a href="/signup" className="login-signup-link">
        Visit Signup page
      </a>
    </div>
  );
}
