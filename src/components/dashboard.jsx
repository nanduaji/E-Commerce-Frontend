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
                        <div className="col-md-6 text-md-start">
                            <h1 className="display-4 fw-bold text-dark">Glamorous Glam</h1>
                            <p className="lead text-muted">
                                Discover the latest trends in fashion and beauty.
                            </p>
                            <a href="#shop" className="btn btn-primary btn-lg mt-3">
                                Shop Now
                            </a>
                        </div>

                        {/* Right Column - Image */}
                        <div className="col-md-6">
                            <img
                                src="fashion.jpg"
                                alt="Fashion Banner"
                                className={`img-fluid w-auto rounded ${styles.homepageimage}`}
                                style={{ maxWidth: "100%", height: "600px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <p className="lead ms-3" id="shop">SHOP BY CATEGORIES</p>
            <div className="container">
                <div className="row g-4">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4 col-lg-3 col-sm-6 d-flex">
                            <div className="card" style={{ width: "18rem" }}>
                                <img
                                    className="card-img-top"
                                    src={product.image || "default-image.jpg"}
                                    alt={product.name}
                                    style={{ height: "200px", objectFit: "contain" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <button href="#" className="btn btn-primary mt-auto" onClick={() => addProductToCart(product)}>
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
