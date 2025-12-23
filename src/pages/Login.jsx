import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginPost = async () => {
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      // Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user.user_id || data.user.id);

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/Dashboard"), 1000);
    } catch (err) {
      setMessage(err.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && password && !loading) loginPost();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 font-poppins">
      <div className="bg-gray-800/80 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-4">Welcome Back</h2>

        {message && (
          <div className={`p-3 mb-4 rounded ${message.includes('successful') ? 'bg-green-700 text-green-200' : 'bg-red-700 text-red-200'}`}>
            {message}
          </div>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-gray-900 text-white focus:outline-none"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Password"
            className="w-full mb-4 p-3 rounded bg-gray-900 text-white focus:outline-none"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={loginPost}
          disabled={loading || !email || !password}
          className={`w-full py-3 rounded font-semibold ${
            loading || !email || !password
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="mt-4 text-gray-400 text-center">
          Don't have an account? <Link to="/Register" className="text-cyan-400">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
