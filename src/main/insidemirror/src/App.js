import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LockScreen from "./pages/LockScreen";
import MainScreen from "./pages/MainScreen";
import Schedules from "./pages/Schedules";
import Settings from "./pages/Settings";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Unknown");
  const [showSchedules, setShowSchedules] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          !authenticated ? (
            <LockScreen
              onAuthenticated={() => setAuthenticated(true)}
              onUserDetected={(name) => setUserName(name)}
            />
          ) : showSchedules ? (
            <Schedules userName={userName} />
          ) : (
            <MainScreen
              userName={userName}
              onLogout={() => setAuthenticated(false)}
              onGoToSchedules={() => setShowSchedules(true)} // ✅ MainScreen에 props 전달
            />
          )
        }
      />
      <Route path="/settings" element={<Settings />} />
      <Route path="/schedules" element={<Schedules />} />
    </Routes>
  );
}

export default App;
