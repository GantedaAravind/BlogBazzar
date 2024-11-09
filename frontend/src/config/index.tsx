import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'https://blogbazzarapi.vercel.app/api/v1',  // Set the base URL for all requests
  timeout: 180000,  // Set a default timeout (10 seconds)
  headers: {
    'Content-Type': 'application/json',  // Default content type
  },
  withCredentials: true  // Ensure cookies are sent with requests
});

export default axiosInstance;
