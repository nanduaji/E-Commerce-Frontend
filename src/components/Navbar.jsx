import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faEnvelope, faSignOutAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getCartItems } from "../apiUtils/userApi";

const Navbar = () => {
    const [cartItems,setCartItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await getCartItems();
                if (response?.success) {
                    setCartItems(response?.cartItems);
                    console.log("Cart Items", response?.cartItems);
                } else {
                    alert("Error fetching products");
                }
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchCartItems();
    }, []);

    const handleLogout = () => {
        // Clear authentication details
        localStorage.removeItem("@token");
        localStorage.removeItem("@user");

        // Redirect to login page
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                {/* Brand Logo */}
                <Link className="navbar-brand" to="/">
                    Navbar
                </Link>

                {/* Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <FontAwesomeIcon icon={faBars} className="text-light" />
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Left Menu */}
                    <ul className="navbar-nav me-auto d-flex flex-row mt-3 mt-lg-0">
                        <li className="nav-item text-center mx-2">
                            <Link className="nav-link active" to="/">
                                <FontAwesomeIcon icon={faHome} className="mb-1" />
                                <br />
                                Home
                            </Link>
                        </li>

                        <li className="nav-item text-center mx-2">
                            <Link className="nav-link" to="/cart">
                                <FontAwesomeIcon icon={faShoppingCart} className="mb-1" />
                                <span className="badge rounded-pill bg-danger">{cartItems?.products?.length || 0}</span>
                                <br />
                                Cart
                            </Link>
                        </li>
                    </ul>

                    {/* Right - Logout Button */}
                    <button className="btn btn-danger ms-auto" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
