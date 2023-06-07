import axios from "axios";

// prod: "https://chinadelightmd.com"
// dev: "http://localhost:4747"
const api = axios.create({
  baseURL: "https://chinadelightmd.com",
});

export default api;
