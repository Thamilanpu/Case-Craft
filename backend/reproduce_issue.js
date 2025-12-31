
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

async function run() {
  try {
    // 1. Create a product
    console.log("Creating product...");
    const createRes = await axios.post(`${API_URL}/admin/pet-products`, {
      name: "Debug Product",
      category: "Pet Supplies",
      key: "debug-product-" + Date.now(),
      price: 100,
      images: [] 
    });
    
    const product = createRes.data;
    console.log("Product created:", product._id);

    // 2. Add template
    console.log("Adding template...");
    const templateImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    
    try {
        const addRes = await axios.post(`${API_URL}/admin/pet-products/${product._id}/templates`, {
          templateImage
        });
        console.log("Template added successfully. Templates count:", addRes.data.templates.length);
    } catch (err) {
        console.error("Failed to add template:", err.response ? err.response.data : err.message);
    }

    // Cleanup
    // await axios.delete(`${API_URL}/admin/pet-products/${product._id}`);

  } catch (err) {
    console.error("Error:", err.response ? err.response.data : err.message);
  }
}

run();
