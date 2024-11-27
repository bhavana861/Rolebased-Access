import axios from 'axios';

const commonAPI = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });
    return response; 
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default commonAPI;
