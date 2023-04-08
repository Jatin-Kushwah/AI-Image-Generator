import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:4000",
});

export default axiosClient;
