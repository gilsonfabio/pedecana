import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://innvcar-com-br.umbler.net'
    baseURL: 'http://10.111.134.40:3333'
});

export default api;