import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const publicClient = axios.create({
  baseURL: `${API_URL}/phone-models`
});

const adminClient = axios.create({
  baseURL: `${API_URL}/admin/`
});

export const fetchPhoneModels = async () => {
  const { data } = await publicClient.get("/");
  return data;
};

export const adminCreatePhoneModel = async (payload, token) => {
  const { data } = await adminClient.post("phone-models", payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const adminDeletePhoneModel = async (id, token) => {
  const { data } = await adminClient.delete(`phone-models/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const adminAddTemplateToModel = async (modelId, templateImage, token) => {
  const { data } = await adminClient.post(
    `phone-models/${modelId}/templates`,
    { templateImage },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};

export const adminRemoveTemplateFromModel = async (modelId, templateIndex, token) => {
  const { data } = await adminClient.delete(`phone-models/${modelId}/templates/${templateIndex}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const adminUpdateModelMockup = async (modelId, mockupImage, coverArea, coverSize, token, name, price, cameraOverlay) => {
  const { data } = await adminClient.patch(
    `phone-models/${modelId}/mockup`,
    { mockupImage, coverArea, coverSize, name, price, cameraOverlay },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};


