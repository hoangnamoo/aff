import axiosClient from './axiosClient';

const authApi = {
    signUpStep1: (data) => {
        const baseURL = 'user/signup/step1';
        return axiosClient.post(baseURL, {
            email: data.email,
        });
    },
    signUpStep2: (data) => {
        const baseURL = 'user/signup/step2';
        return axiosClient.post(baseURL, {
            email: data.email,
            OTPCode: data.OTPCode,
        });
    },
    signUpStep3: (data) => {
        const baseURL = 'user/signup/step3';
        return axiosClient.post(baseURL, {
            email: data.email,
            password: data.password,
            resetToken: data.resetToken,
        });
    },
    login: (data) => {
        const baseURL = 'user/login';
        return axiosClient.post(baseURL, {
            email: data.email,
            password: data.password,
        });
    },
    getUserInfo() {
        const baseURL = 'user/get-me';
        return axiosClient.get(baseURL);
    },
    getOTP() {
        const baseURL = 'user/otp';
        return axiosClient.get(baseURL);
    },
    verifyOTP(data) {
        const baseURL = 'user/otp';
        return axiosClient.post(baseURL, {
            OTPCode: data.OTPCode,
        });
    },
};

export default authApi;
