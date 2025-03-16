import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft, faShoppingCart, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../config/axiosConfig";
import { getCartItems } from "../apiUtils/userApi";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        if (response?.success) {
          setCartItems(response?.cartItems?.products || []);
        } else {
          alert("Error fetching products");
        }
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchCartItems();
  }, []);

  const removeItem = async (productId) => {
    try {
      await axiosInstance.post("/removeFromCart", { productId });
      setCartItems(cartItems.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Calculate Total Price
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-dark btn-lg" onClick={() => navigate("/dashboard")}>
          <FontAwesomeIcon icon={faArrowLeft} /> Continue Shopping
        </button>
        <h2 className="fw-bold text-dark">
          <FontAwesomeIcon icon={faShoppingCart} className="text-primary" /> Your Cart
        </h2>
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <h3 className="text-muted">Your cart is empty 🛒</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/dashboard")}>
            <FontAwesomeIcon icon={faArrowLeft} /> Start Shopping
          </button>
        </div>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={item._id}>
              <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold text-primary">{item.name}</h5>
                  <p className="card-text text-muted">{item.description}</p>
                  <p className="fw-bold fs-5 text-success">💲{item.price}</p>
                  <button
                    className="btn btn-outline-danger w-100 rounded-3"
                    onClick={() => removeItem(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="cart-summary card shadow-lg rounded-4 p-4 text-center bg-light">
          <h5 className="fw-bold text-dark">🛍️ Cart Summary</h5>
          <p className="fs-5">Total Items: <strong>{cartItems.length}</strong></p>
          <p className="fs-4 text-success">Total Price: <strong>💲{totalPrice.toFixed(2)}</strong></p>
          <button className="btn btn-success btn-lg w-100 rounded-4">
            <FontAwesomeIcon icon={faCheckCircle} /> Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
