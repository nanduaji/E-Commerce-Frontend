import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../config/axiosConfig";

const UserForm = ({ show, handleClose, editUser, onSave }) => {
  const [userData, setUserData] = useState({ name: "", email: "",password:"", role: "user" });

  useEffect(() => {
    if (editUser) {
      setUserData(editUser);
    } else {
      setUserData({ name: "", email: "", role: "user" });
    }
  }, [editUser]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
        console.log("userData",userData)
      if (editUser) {
        await axiosInstance.put(`/users/${editUser._id}`, userData);
      } else {
        await axiosInstance.post("/addUser", userData);
      }
      onSave();
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editUser ? "Edit User" : "Create User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={userData.password} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={userData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {editUser ? "Update" : "Create"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserForm;
