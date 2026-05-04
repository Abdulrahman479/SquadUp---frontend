import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import HostGame from './pages/HostGame';
import JoinGame from './pages/JoinGame';
import MyHostedGames from './pages/MyHostedGames';
import MyJoinedGames from './pages/MyJoinedGames';

import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      {/* ✅ Add this */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/host-game"
          element={
            <PrivateRoute>
              <HostGame />
            </PrivateRoute>
          }
        />
        <Route
          path="/join"
          element={
            <PrivateRoute>
              <JoinGame />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-hosted-games"
          element={
            <PrivateRoute>
              <MyHostedGames />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-joined-games"
          element={
            <PrivateRoute>
              <MyJoinedGames />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;