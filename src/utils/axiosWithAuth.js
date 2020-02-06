import axios from 'axios';


const axiosWithAuth = type => {
    const token = localStorage.getItem("token");
    const apiUrl = 'https://lambda-cs25-mud.herokuapp.com';

    let key
    if (type === 'auth') {
        key = "X-CSRFToken";
    } else if (type === 'game') {
        key = "Authorization"
    };

    return axios.create({
        baseURL: apiUrl,
        headers: {
            "Content-Type": "application/json",
            [key]: `Token ${token}`
        }
    });
};

export default axiosWithAuth;