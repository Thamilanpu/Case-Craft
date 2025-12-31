import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const adminClient = axios.create({
  baseURL: `${API_URL}/admin/`
});

export const getAdminStats = async (token) => {
  const { data } = await adminClient.get("stats", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const getAdminOrders = async ({ page = 1, search = "", type = "", token }) => {
  const params = new URLSearchParams();
  params.append("page", page);
  if (search) params.append("search", search);
  if (type) params.append("type", type);

  const { data } = await adminClient.get(`orders?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const deleteAdminOrder = async (id, token) => {
  const { data } = await adminClient.delete(`orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const confirmAdminOrder = async (id, token) => {
  const { data } = await adminClient.post(
    `orders/${id}/confirm`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};

// User Management
export const getAdminUsers = async ({ page = 1, search = "", token }) => {
  const params = new URLSearchParams();
  params.append("page", page);
  if (search) params.append("search", search);

  const { data } = await adminClient.get(`users?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const updateUserRole = async (userId, role, token) => {
  const { data } = await adminClient.patch(
    `users/${userId}/role`,
    { role },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};

export const deleteAdminUser = async (id, token) => {
  const { data } = await adminClient.delete(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

