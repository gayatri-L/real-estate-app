import axios from "axios";

const BASE_URL = "http://localhost:8080/organization"; // Ensure this matches your backend

// Fetch organizations
export const fetchOrganizations = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
};

// Create new organization
export const createOrganization = async (organizationData) => {
  try {
    const response = await axios.post(BASE_URL, organizationData);
    return response.data;
  } catch (error) {
    console.error("Error creating organization:", error);
    throw error;
  }
};
