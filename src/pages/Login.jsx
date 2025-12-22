import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_BASE =
    import.meta.env.VITE_API_URL ||
    "https://application-dev-rj8t.onrender.com";

  const clearPreviousUserProgress = () => {
    const authKeys = ["token", "user", "userId"];
    Object.keys(localStorage).forEach((key) => {
      if (!authKeys.includes(key)) localStorage.removeItem(key);
    });
  };

  const migrateOldProgress = (userId) => {
    ["riddleProgress", "logicProgress", "enduranceProgress"].forEach((key) => {
      const old = localStorage.getItem(key);
      if (old && userId) {
        localStorage.setItem(`${key}_${userId}`, old);
        localStorage.removeItem(key);
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      clearPreviousUserProgress();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user.user_id || data.user.id);

      migrateOldProgress(data.user.user_id || data.user.id);

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/Dashboard"), 1000);
    } catch (err) {
      setMessage(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) loginPost();
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 font-poppins">
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-cyan-400">
              Welcome Back
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full mt-6 px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full mt-4 px-4 py-3 bg-gray-900 border border-gray-600 rounded-xl text-white"
            />

            <button
              onClick={loginPost}
              disabled={loading}
              className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {message && (
              <p className="mt-4 text-center text-red-400">{message}</p>
            )}

            <p className="mt-6 text-center text-gray-400">
              No account?{" "}
              <Link to="/Register" className="text-cyan-400">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
