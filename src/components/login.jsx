import React, { useEffect, useState } from "react";
import { userLogin } from "../apiUtils/userApi";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("User");
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('@token'));
        const user = JSON.parse(localStorage.getItem('@user'));
        const role = localStorage.getItem("@role");
        if (token && user) {
            if (role === "Admin") {
              navigate("/adminDashboard");
            } else {
              navigate("/dashboard");
            }
          } else {
            // Clear incorrect session data
            localStorage.removeItem("@token");
            localStorage.removeItem("@user");
            localStorage.removeItem("@role");
      
            navigate("/");
          }
        // eslint-disable-next-line
    }, []);
    const isValid = () => {
        if (email && email?.trim().length > 0 && password && password?.trim().length > 0) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        } else {
            return false;
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        email.trim();
        password.trim();
        if (isValid()) {
            const response = await userLogin({ email: selectedRole === "Admin" ? "admin" : email, password: selectedRole === "Admin" ? "admin123" : password });
            if (response?.success) {
                localStorage.setItem("@token", JSON.stringify(response?.token));
                localStorage.setItem("@user", JSON.stringify(response?.data));
                if (response?.data?.role.toLowerCase() === "admin") {
                    navigate('/adminDashboard');
                }
                else {
                    navigate('/dashboard');
                }
            } else {
                alert("Email or Password is invalid!");
            }
        } else {
            alert("Please enter a valid email");
        }
    }
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
        localStorage.setItem("@role", event.target.value);
    };
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 rounded-4 text-center" style={{ width: "400px" }}>
                <img
                    src="login.jpg"
                    alt="Login Vector"
                    className="img-fluid mb-3"
                    style={{ maxWidth: "150px", margin: "0 auto" }}
                />
                <h3 className="mb-3">Welcome Back</h3>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 d-flex align-items-center">
                            <div className="form-check me-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    value="Admin"
                                    checked={selectedRole === "Admin"}
                                    onChange={handleRoleChange}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Admin
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    value="User"
                                    checked={selectedRole === "User"}
                                    onChange={handleRoleChange}
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    User
                                </label>
                            </div>
                        </div>
                    </div>
                    <p className="mt-2">Selected Role: <strong>{selectedRole}</strong></p>
                </div>


                <input type="email" className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={selectedRole === "Admin" ? "admin" : email} />
                <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={selectedRole === "Admin" ? "admin123" : password} />
                {/* <a href="/createAdminUser" style={{display:'flex',marginBottom:'10px'}}>create Admin User</a> */}
                <button className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
};

export default Login;
