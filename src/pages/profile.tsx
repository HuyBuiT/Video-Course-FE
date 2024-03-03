// ProfilePage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import '../css/pages/profile.css';
import { useNavigate } from "react-router-dom";
interface User {
  name: string;
  email: string;
  // Add any other user properties as needed
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const config_header = {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      };

      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: process.env.REACT_APP_API_URL+"/current_user",
        headers: config_header,
      };

      const response = await axios.request(config);
      setUser(response.data.user);
    } catch (error: any) {
      navigate('/login')
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
      navigate('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
        </>
      ) : null}
      <hr />
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
