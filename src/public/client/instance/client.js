import axios from "axios";

const instance = axios.create({
    baseURL: "",
});

// instance.interceptors.response.use((response) => {
//     const { code, data } = response.data;
//     if (code === 0) {
//         return data;
//     }
//     return Promise.reject(response.data);
// });

export default instance;
