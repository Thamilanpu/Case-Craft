
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function run() {
    try {
        // 1. Create a product WITH template
        console.log("Creating product with initial template...");
        const templateImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

        const createRes = await axios.post(`${API_URL}/admin/pet-products`, {
            name: "Final Verify Product",
            category: "Pet Supplies",
            key: "final-verify-" + Date.now(),
            price: 200,
            images: [templateImage],
            templates: [templateImage]
        });

        const product = createRes.data;
        console.log("Product created:", product._id);
        console.log("Templates count (should be 1):", product.templates.length);

        if (product.templates.length !== 1) {
            console.error("FAIL: Template not saved on create!");
        } else {
            console.log("PASS: Template saved on create.");
        }

        // 2. Add ANOTHER template
        console.log("Adding second template...");
        const addRes = await axios.post(`${API_URL}/admin/pet-products/${product._id}/templates`, {
            templateImage: templateImage
        });
        console.log("Templates count (should be 2):", addRes.data.templates.length);

        if (addRes.data.templates.length !== 2) {
            console.error("FAIL: Second template not added!");
        } else {
            console.log("PASS: Second template added.");
        }

        // Cleanup
        await axios.delete(`${API_URL}/admin/pet-products/${product._id}`);
        console.log("Cleanup done.");

    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
}

run();
