import React from "react";
import axiosInstance from "../config/axiosConfig";

const UserTable = ({ users, setUsers, setEditUser, setShowForm }) => {
  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.role === "admin" ? "bg-danger" : "bg-success"}`}>
                  {user.role}
                </span>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditUser(user);
                    setShowForm(true);
                  }}
                >
                  ✏ Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
