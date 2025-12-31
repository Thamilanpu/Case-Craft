
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create a dummy user token or use a known one. For this test, we assume we can create an order.
// If auth is required, we might need a login step. Let's assume we can create an order if we have a valid token.
// Actually, earlier scripts used a token. I'll need to login first or use a hardcoded token if I have one valid.
// I'll try to login as a user first.

async function run() {
    try {
        // 1. Register/Login a User
        console.log("Logging in user...");
        const userEmail = `testuser${Date.now()}@example.com`;
        const userPass = "password123";

        await axios.post(`${API_URL}/auth/register`, {
            name: "Test User",
            email: userEmail,
            password: userPass
        });

        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: userEmail,
            password: userPass
        });
        const token = loginRes.data.token;
        console.log("User logged in.");

        // 2. Create an Order with custom details
        console.log("Creating Order...");
        const orderData = {
            items: [{
                productId: "test-product-id",
                productName: "Test Pet Product",
                designImage: "http://example.com/design.png",
                templateImage: "http://example.com/template.png",
                userCustomImage: "http://example.com/user_upload.png",
                customText: "Fluffy's Bowl",
                price: 100,
                quantity: 1
            }],
            fullName: "Test User",
            email: userEmail,
            phone: "1234567890",
            address: "123 Test St",
            total: 100
        };

        const orderRes = await axios.post(`${API_URL}/orders`, orderData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const orderId = orderRes.data._id;
        console.log("Order created:", orderId);

        // 3. Login as Admin to fetch details (Simulated by using Admin API logic directly or just checking DB)
        // Since I don't have admin creds readily available in script, I will assume successful creation implies data is there.
        // But to be sure, I should verify the response from the creation which usually returns the created object.

        if (orderRes.data.items[0].customText === "Fluffy's Bowl" &&
            orderRes.data.items[0].templateImage === "http://example.com/template.png" &&
            orderRes.data.items[0].userCustomImage === "http://example.com/user_upload.png") {
            console.log("PASS: Order created with all custom details.");
        } else {
            console.error("FAIL: Order missing details in response:", orderRes.data);
        }

    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
}

run();
