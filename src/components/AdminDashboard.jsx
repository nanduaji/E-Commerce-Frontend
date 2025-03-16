import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import axiosInstance from "../config/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    console.log("token", localStorage.getItem("@token"));
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("@token");

      if (!token) {
        console.error("No token found!");
        return;
      }

      console.log("Sending Token:", token); // Debugging

      const response = await axiosInstance.post(
        "/getUsers",
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token.trim())}`,
          },
        }
      );

      console.log("response", response);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem("@token"); // Remove token
    localStorage.removeItem("@user");  // Remove user data
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Admin Dashboard</h2>

        <div>
          <button className="btn btn-danger me-2" onClick={handleLogout}>
            Logout
          </button>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Create User
          </button>
        </div>
      </div>

      {/* User Table */}
      <UserTable users={users} setUsers={setUsers} setEditUser={setEditUser} setShowForm={setShowForm} />

      {/* User Form Modal */}
      <UserForm show={showForm} handleClose={() => setShowForm(false)} editUser={editUser} onSave={fetchUsers} />
    </div>
  );
};

export default AdminDashboard;
