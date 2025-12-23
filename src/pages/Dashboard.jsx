import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    // Example: fetch leaderboard or other protected data
    const fetchData = async () => {
      try {
        const data = await fetchWithAuth("/leaderboard");
        console.log("Leaderboard:", data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-poppins p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">
        Welcome {user?.display_name || "Player"}!
      </h1>

      {error && <div className="p-3 mb-4 bg-red-700 text-red-200 rounded">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800/80 p-6 rounded-2xl hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-cyan-400 mb-2">Single Player</h2>
          <p>Play puzzles at your own pace.</p>
          <button className="mt-4 bg-blue-600 px-6 py-2 rounded text-white hover:bg-blue-700">Play Now</button>
        </div>

        <div className="bg-gray-800/80 p-6 rounded-2xl hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">Endurance Challenge</h2>
          <p>Continuous puzzles with increasing difficulty.</p>
          <button className="mt-4 bg-yellow-600 px-6 py-2 rounded text-white hover:bg-yellow-700">Play Now</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
