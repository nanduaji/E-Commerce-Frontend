import React from "react";

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded-4 text-center" style={{ width: "400px" }}>
        <img 
          src="https://cdn.pixabay.com/photo/2017/08/22/11/56/user-2664699_1280.png" 
          alt="Login Vector" 
          className="img-fluid mb-3" 
          style={{ maxWidth: "150px", margin: "0 auto" }}
        />
        <h3 className="mb-3">Welcome Back</h3>
        <input type="email" className="form-control mb-3" placeholder="Email" />
        <input type="password" className="form-control mb-3" placeholder="Password" />
        <button className="btn btn-primary w-100">Login</button>
      </div>
    </div>
  );
};

export default Login;
