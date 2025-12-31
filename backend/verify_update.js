
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function run() {
    try {
        // 1. Create a Pet Product
        console.log("Creating Test Product...");
        const createRes = await axios.post(`${API_URL}/admin/pet-products`, {
            name: "Update Test Product",
            category: "Pet Supplies",
            key: "update-test-" + Date.now(),
            price: 100,
            images: []
        });
        const product = createRes.data;
        console.log("Product created:", product._id, product.name, product.price);

        // 2. Update Name and Price using the mockup endpoint logic
        console.log("Updating name and price...");
        const updateRes = await axios.put(`${API_URL}/admin/pet-products/${product._id}/mockup`, {
            name: "Updated Name",
            price: 999
        });

        // 3. Verify Update
        if (updateRes.data.name === "Updated Name" && updateRes.data.price === 999) {
            console.log("PASS: Pet Product Name and Price updated successfully.");
        } else {
            console.error("FAIL: Pet Product Update failed!", updateRes.data);
        }

        // Cleanup
        await axios.delete(`${API_URL}/admin/pet-products/${product._id}`);
        console.log("Cleanup done.");

    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
}

run();
