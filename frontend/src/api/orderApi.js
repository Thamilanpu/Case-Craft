import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const orderClient = axios.create({
  baseURL: `${API_URL}/orders`
});

export const saveOrder = async (payload, token) => {
  const { data } = await orderClient.post("/", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const getMyOrders = async (token) => {
  const { data } = await orderClient.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

