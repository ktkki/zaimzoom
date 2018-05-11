import axios from "axios";

const api = axios.create({
  baseURL: (function() {
    if (window.location.hostname === "localhost") {
      return "http://localhost:5000/";
    } else {
      return "";
    }
  })(),
  timeout: 10000,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default api;
