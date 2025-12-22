import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import ChoosePuzzle from "../pages/ChoosePuzzle";
import Riddles from "../pages/Riddles";
import Correct from "../pages/Correct";
import Incorrect from "../pages/Incorrect";
import Logic from "../pages/Logic";
import LogicCorrect from "../pages/LogicCorrect";
import LogicIncorrect from "../pages/LogicIncorrect";
import LogicSummary from "../pages/LogicSummary";
import Endurance from "../pages/Endurance";
import EnduranceCorrect from "../pages/EnduranceCorrect";
import EnduranceIncorrect from "../pages/EnduranceIncorrect";
import EnduranceSummary from "../pages/EnduranceSummary";
import LeaderBoard from "../pages/LeaderBoard";
import Register from "../pages/Register";
import Summary from "../pages/Summary";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/choosepuzzle" element={<ChoosePuzzle />} />
      <Route path="/riddles" element={<Riddles />} />
      <Route path="/correct" element={<Correct />} />
      <Route path="/incorrect" element={<Incorrect />} />
      <Route path="/logic" element={<Logic />} />
      <Route path="/logiccorrect" element={<LogicCorrect />} />
      <Route path="/logicincorrect" element={<LogicIncorrect />} />
      <Route path="/logicsummary" element={<LogicSummary />} />
      <Route path="/endurance" element={<Endurance />} />
      <Route path="/endurancecorrect" element={<EnduranceCorrect />} />
      <Route path="/enduranceincorrect" element={<EnduranceIncorrect />} />
      <Route path="/endurancesummary" element={<EnduranceSummary />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/summary" element={<Summary />} />
    </Routes>
  );
}
