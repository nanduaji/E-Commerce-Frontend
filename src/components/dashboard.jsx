import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./dashboard.module.css";
import Navbar from "./Navbar";
import { addProductsToCart, getProducts } from "../apiUtils/userApi";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [isProductAdded,setIsProductAdded] = useState(false);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                if (response?.success) {
                    setProducts(response?.data);
                    
                } else {
                    alert("Error fetching products");
                }
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);
    const addProductToCart = async (product) => {
        try {
            const response = await addProductsToCart(product);
            localStorage.setItem("cart",products)
            if (response?.success) {
                setIsProductAdded(true);
                alert("Product added to cart successfully!");
            } else {
                setIsProductAdded(false);
                alert(response?.message || "Error adding products");
            }
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };
    return (
        <>
            <Navbar />
            <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
                <div className="container">
                    <div className="row align-items-center text-center">
                        {/* Left Column - Branding */}
                        <div className="col-lg-6 col-md-12 text-md-start">
                            <h1 className="display-4 fw-bold text-dark">Glamorous Glam</h1>
                            <p className="lead text-muted">
                                Discover the latest trends in fashion and beauty.
                            </p>
                            <a href="#shop" className="btn btn-primary btn-lg mt-3">
                                Shop Now
                            </a>
                        </div>

                        {/* Right Column - Image */}
                        <div className="col-lg-6 col-md-12 mt-4 mt-lg-0">
                            <img
                                src="fashion.jpg"
                                alt="Fashion Banner"
                                className="img-fluid w-100 rounded"
                                style={{ maxHeight: "400px", objectFit: "contain" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Shop By Categories */}
            <p className="lead text-center mt-5" id="shop">SHOP BY CATEGORIES</p>

            <div className="container">
                <div className="row g-4">
                    {products.map((product) => (
                        <div key={product._id} className="col-sm-6 col-md-4 col-lg-3 d-flex">
                            <div className="card w-100 shadow-sm border-0">
                                <img
                                    className="card-img-top"
                                    src={product.image || "default-image.jpg"}
                                    alt={product.name}
                                    style={{ height: "180px", objectFit: "contain" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text text-muted">{product.description}</p>
                                    <button
                                        className="btn btn-primary mt-auto"
                                        onClick={() => addProductToCart(product)}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
