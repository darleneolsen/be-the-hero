import axios from 'axios';

// baseURL: '' para testar no celular coloca ip que aparece no expo
//Quando publicar coloca o endereço do servidor
const api = axios.create({
        baseURL: 'http://192.168.5.220:3337'
    }

)

export default api;