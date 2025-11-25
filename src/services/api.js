import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost";
const apiPorta = process.env.NEXT_PUBLIC_API_PORTA || "3333";

// Garante que não fique com :undefined
const baseURL = `${apiUrl}:${apiPorta}`;

const api = axios.create({
    baseURL: baseURL
});

// Verifica a URL final no console
console.log("API URL:", api.getUri());

export default api;
