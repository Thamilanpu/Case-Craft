
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function run() {
    try {
        // 1. Create a product
        console.log("Creating product...");
        const createRes = await axios.post(`${API_URL}/admin/pet-products`, {
            name: "Mongo Limit Product",
            category: "Pet Supplies",
            key: "mongo-limit-" + Date.now(),
            price: 100,
            images: []
        });

        const product = createRes.data;
        console.log("Product created:", product._id);

        // 2. Add 2MB chunks until failure
        const chunkSize = 2 * 1024 * 1024; // 2MB
        const largeString = "A".repeat(chunkSize);

        let count = 0;
        while (true) {
            count++;
            console.log(`Adding chunk ${count} (Total ~${count * 2}MB)...`);
            try {
                await axios.post(`${API_URL}/admin/pet-products/${product._id}/templates`, {
                    templateImage: largeString
                });
                console.log(`Chunk ${count} added.`);
            } catch (err) {
                console.error(`Failed at chunk ${count} (Total ~${count * 2}MB):`);
                console.error("Status:", err.response ? err.response.status : "Unknown");
                console.error("Data:", err.response ? err.response.data : err.message);
                break;
            }
        }

    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
}

run();
