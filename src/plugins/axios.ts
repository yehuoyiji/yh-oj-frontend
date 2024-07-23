import axios from "axios";


axios.interceptors.request.use(function (config) {



    return config;
}, function (error) {



    return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
    console.log('响应:', response)


    return response;
}, function (error) {



    return Promise.reject(error);
});