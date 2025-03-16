import React, { useEffect, useState } from "react";
import { userLogin } from "../apiUtils/userApi";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('@token'));
        const user = JSON.parse(localStorage.getItem('@user'));

        if (user && token) {
            navigate('/dashboard');
            return;
        } else {
            localStorage.removeItem('@token');
            localStorage.removeItem('@entri_user');

            navigate('/login');
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
            const response = await userLogin({ email: email, password: password });
            console.log("response from login: ", response);
            if (response?.success) {
                localStorage.setItem("@token", JSON.stringify(response?.token));
                localStorage.setItem("@user", JSON.stringify(response?.data));
                navigate('/dashboard');
            } else {
                alert("Email or Password is invalid!");
            }
        } else {
            alert("Please enter a valid email");
        }
    }
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
        <input type="email" className="form-control mb-3" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        <button className="btn btn-primary w-100" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
