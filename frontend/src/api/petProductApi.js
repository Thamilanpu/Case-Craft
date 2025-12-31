import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Public
export const fetchPetProducts = async () => {
  const { data } = await axios.get(`${API_URL}/pet-products`);
  return data;
};

// Admin
export const adminCreatePetProduct = async (product, token) => {
  const { data } = await axios.post(`${API_URL}/admin/pet-products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const adminDeletePetProduct = async (productId, token) => {
  const { data } = await axios.delete(`${API_URL}/admin/pet-products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const adminAddTemplateToPet = async (productId, templateImage, token) => {
  const { data } = await axios.post(
    `${API_URL}/admin/pet-products/${productId}/templates`,
    { templateImage }, // <-- IMPORTANT
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const adminRemoveTemplateFromPet = async (productId, templateIndex, token) => {
  const { data } = await axios.delete(
    `${API_URL}/admin/pet-products/${productId}/templates/${templateIndex}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const adminUpdatePetMockup = async (productId, mockupImage, coverArea, coverSize, token, name, price) => {
  const { data } = await axios.put(
    `${API_URL}/admin/pet-products/${productId}/mockup`,
    { mockupImage, coverArea, coverSize, name, price },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};
