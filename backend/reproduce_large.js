
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function run() {
    try {
        // 1. Create a product
        console.log("Creating product...");
        const createRes = await axios.post(`${API_URL}/admin/pet-products`, {
            name: "Large Payload Product",
            category: "Pet Supplies",
            key: "large-payload-" + Date.now(),
            price: 100,
            images: []
        });

        const product = createRes.data;
        console.log("Product created:", product._id);

        // 2. Add LARGE template (11MB string)
        // 11 * 1024 * 1024 = 11534336 bytes
        console.log("Generating large payload (11MB)...");
        const largeString = "A".repeat(11 * 1024 * 1024);

        console.log("Adding template...");

        try {
            const addRes = await axios.post(`${API_URL}/admin/pet-products/${product._id}/templates`, {
                templateImage: largeString
            });
            console.log("Template added successfully (Unexpected).");
        } catch (err) {
            console.error("Failed to add template (Expected if limit < 11MB):", err.response ? err.status : err.message);
            if (err.response && err.response.data) {
                console.error("Error data:", err.response.data);
            }
        }

    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
}

run();
