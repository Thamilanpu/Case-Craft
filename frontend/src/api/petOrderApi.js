import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Admin: fetch pet orders with pagination & search
export const getPetOrders = async ({ page = 1, search = "", token }) => {
  const { data } = await axios.get(`${API_URL}/admin/pet-orders`, {
    params: { page, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // { data: [...orders], pagination: { page, pages, total } }
};

// Admin: confirm a pet order
export const confirmPetOrder = async (orderId, token) => {
  const { data } = await axios.put(
    `${API_URL}/admin/pet-orders/${orderId}/confirm`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

// Admin: delete a pet order
export const deletePetOrder = async (orderId, token) => {
  const { data } = await axios.delete(`${API_URL}/admin/pet-orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
