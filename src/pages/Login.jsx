import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL || "";

  const clearPreviousUserProgress = () => {
    const authKeys = ['token', 'user', 'userId'];
    Object.keys(localStorage).forEach(key => {
      if (!authKeys.includes(key)) localStorage.removeItem(key);
    });
  };

  const migrateOldProgress = (userId) => {
    const oldProgressKeys = ['riddleProgress', 'logicProgress', 'enduranceProgress'];
    oldProgressKeys.forEach(oldKey => {
      const oldData = localStorage.getItem(oldKey);
      if (oldData && userId) {
        localStorage.setItem(`${oldKey}_${userId}`, oldData);
        localStorage.removeItem(oldKey);
      }
    });
  };

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

      if (!response.ok) throw new Error(data.message || `HTTP error! status: ${response.status}`);

      if (data.user) {
        clearPreviousUserProgress();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user.user_id || data.user.id);
        migrateOldProgress(data.user.user_id || data.user.id);
      }

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/Dashboard"), 1500);

    } catch (error) {
      setMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && email && password && !loading) loginPost();
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 font-poppins">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <Link to="/" className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <button className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </Link>

        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden animate-fade-in">
          <div className="p-8 border-b border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-300 mt-2">Sign in to continue your puzzle journey</p>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Email Address <span className="text-red-400 ml-1">*</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div className="mb-8 relative">
              <label className="block text-gray-300 mb-2">Password <span className="text-red-400 ml-1">*</span></label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all pr-12"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-xl ${message.includes('successful') ? 'bg-green-900/30 border border-green-500/30' : 'bg-red-900/30 border border-red-500/30'}`}>
                <span className={message.includes('successful') ? 'text-green-300' : 'text-red-300'}>{message}</span>
              </div>
            )}

            <button
              onClick={loginPost}
              disabled={loading || !email || !password}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 hover-lift ${
                loading || !email || !password
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg'
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center pt-6 border-t border-gray-700/50">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/Register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
