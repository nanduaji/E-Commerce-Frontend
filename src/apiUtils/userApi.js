import axiosInstance from "../config/axiosConfig";

function getHeaders() {
    return {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('@token'))}`,
        'Accept': 'application/json'
    }
}

export const userLogin = async (payload) => {
    const { email, password } = payload;
    if (email && password) {
        const result = await axiosInstance.post('/userLogin', payload, {
            headers: getHeaders()
        });

        return result?.data;
    } else {
        return false;
    }
}

export const getUsers = async () => {
    try {
        const result = await axiosInstance.get('/getUsers', {
            headers: getHeaders()
        });
        return result?.data;
    } catch (err) {
        return false;
    }
}

export const getProducts = async () => {
    try {
        const result = await axiosInstance.post('/getProducts', {}, { headers: getHeaders() });
        return result?.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return { success: false, message: error.response?.data || "Server error" };
    }
};

export const addProductsToCart = async (product) => {
    try {

        // Retrieve and parse user data
        const storedUser = localStorage.getItem("@user");
        if (!storedUser) {
            return { success: false, message: "User not logged in" };
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error("Error parsing user data:", error);
            return { success: false, message: "Invalid user data" };
        }
        // Ensure all required fields exist
        if (!user?.id || !product?._id || !product?.name || !product?.description || !product?.price ||
            !product?.category) {
            return { success: false, message: "User ID and all product fields are required" };
        }

        // Prepare payload
        const payload = {
            ...product,
            user: JSON.stringify({ id: user.id })  // Send only the user ID as a stringified object
        };

        const result = await axiosInstance.post('/addProductsToCart', payload, {
            headers: getHeaders()
        });

        return result?.data;
    } catch (error) {
        console.error("Error adding products:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Server error"
        };
    }
};

export const getCartItems = async (user) => {
    try {

        // Retrieve and parse user data
        const storedUser = localStorage.getItem("@user");
        if (!storedUser) {
            return { success: false, message: "User not logged in" };
        }

        let user;
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            console.error("Error parsing user data:", error);
            return { success: false, message: "Invalid user data" };
        }
        // Ensure all required fields exist
        if (!user?.id ) {
            return { success: false, message: "User ID is required" };
        }

        // Prepare payload
        const payload = {
            user: JSON.stringify({ id: user.id })  // Send only the user ID as a stringified object
        };

        const result = await axiosInstance.post('/getCartItems', payload, {
            headers: getHeaders()
        });

        return result?.data;
    } catch (error) {
        console.error("Error adding products:", error);
        return {
            success: false,
            message: error.response?.data?.message || "Server error"
        };
    }
};


