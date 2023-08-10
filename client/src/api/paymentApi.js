import axiosClient from './axiosClient';

const paymentApi = {
    requestWithdraw: (data) => {
        const baseURL = 'payment/withdraw';
        return axiosClient.post(baseURL, {
            requestInfo: data.requestInfo,
            OTPCode: data.OTPCode,
            isMiddleware: true,
        });
    },
};

export default paymentApi;
