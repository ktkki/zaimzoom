import axios from "axios";

const api = axios.create({
  baseURL: (function() {
    if (window.location.hostname === "localhost") {
      // drakov default port 3000
      return "http://localhost:3000/";
    } else {
      return `${window.location.host}`;
    }
  })(),
  timeout: 5000,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default api;
