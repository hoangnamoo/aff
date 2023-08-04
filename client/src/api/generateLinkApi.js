import axiosClient from './axiosClient';

const generateLinkApi = {
    getLinkEcomUnlogin: (data) => {
        const baseURL = 'generator/ecommerce/unlogin';
        return axiosClient.post(baseURL, {
            link: data.link,
        });
    },
    getLinkEcomlogedin: (data) => {
        const baseURL = 'generator/ecommerce';
        return axiosClient.post(baseURL, {
            link: data.link,
        });
    },
};

export default generateLinkApi;
