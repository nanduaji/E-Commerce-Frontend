import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import CartPage from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/cart" 
          element={<ProtectedRoute><CartPage /></ProtectedRoute>} 
        />
        <Route 
          path="/adminDashboard" 
          element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
