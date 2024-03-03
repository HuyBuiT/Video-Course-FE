// SignupPage.tsx
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import '../css/pages/signup.css';
interface User {
  email: string;
  password: string;
  name: string;
}

export default function SignupPage() {
  const [user, setUser] = useState<User>({ email: "", password: "", name: "" });
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onSignup = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5500/api/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup success");
      // navigate to login page, here you will have to manage the redirection to /login
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.name));
  }, [user.email, user.password, user.name]);

  return (
    <div className="signup-container">
      <h1 className="signup-title">{loading ? "Processing..." : "Signup"}</h1>
      <hr className="signup-divider" />

      {/* Form */}
      <form onSubmit={onSignup} className="signup-form">
        {/* Name Input */}
        <div className="signup-input">
          <label htmlFor="name" className="signup-label">
            Name
          </label>
          <input
            className="signup-field"
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="signup-input">
          <label htmlFor="email" className="signup-label">
            Email
          </label>
          <input
            className="signup-field"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="signup-input">
          <label htmlFor="password" className="signup-label">
            Password
          </label>
          <input
            className="signup-field"
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
          className={`signup-button ${
            buttonDisabled ? "signup-button-disabled" : "signup-button-enabled"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      <Toaster/>
      {/* Link to Login */}
      <a href="/login" className="signup-login-link">
        Visit Login page
      </a>
    </div>
  );
}
