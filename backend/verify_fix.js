
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function run() {
    try {
        // 1. Create a product
        console.log("Creating product for verification...");
        const createRes = await axios.post(`${API_URL}/admin/pet-products`, {
            name: "Verify Product",
            category: "Pet Supplies",
            key: "verify-product-" + Date.now(),
            price: 150,
            images: []
        });

        const product = createRes.data;
        console.log("Product created:", product._id);

        // 2. Add a valid small template
        console.log("Adding valid template...");
        const templateImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

        const addRes = await axios.post(`${API_URL}/admin/pet-products/${product._id}/templates`, {
            templateImage
        });
        console.log("Template added successfully. Templates count:", addRes.data.templates.length);

        // Cleanup
        await axios.delete(`${API_URL}/admin/pet-products/${product._id}`);
        console.log("Cleanup done.");

    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
}

run();
