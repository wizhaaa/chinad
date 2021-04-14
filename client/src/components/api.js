import axios from "axios";

const api = axios.create({
  baseURL: "https://chinadelightmd.com",
});

export default api;
