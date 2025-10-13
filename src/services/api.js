import axios from "axios";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiPorta = process.env.NEXT_PUBLIC_API_PORTA; 

const api = axios.create({  
    baseURL : `${apiUrl}:${apiPorta}` 
});


     console.log("API URL:", api.getUri()); // Verifica a URL base configurada
export default api; 
