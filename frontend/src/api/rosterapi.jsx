import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Adjust this to your FastAPI server URL

export const generateRoster = async (doctors, startDate, endDate) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/generate-roster`,
      { doctors, start_date: startDate, end_date: endDate }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating roster:", error);
    return null;
  }
};
