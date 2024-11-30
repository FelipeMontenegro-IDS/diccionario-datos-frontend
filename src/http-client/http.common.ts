import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5057/api/Database', // Cambia esto por tu base URL
    timeout: 10000, // Tiempo de espera (opcional)
});

export default api;