import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const fetchData = async (resource) => {
  try {
    const response = await axios.get(`${BASE_URL}/${resource}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchData;
