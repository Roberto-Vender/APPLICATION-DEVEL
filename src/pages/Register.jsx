import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || "";

  const registerPost = async () => {
    if (password !== confirm) {
      setMessage("Password doesn't match!");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    const postData = { displayName, email, password };
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(postData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || `HTTP error! status: ${response.status}`);

      setMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate('/Login'), 1500);

    } catch (error) {
      setMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 font-poppins">
      {/* Your design remains intact */}
      {/* ...All your current JSX untouched... */}
    </div>
  );
};

export default Register;
