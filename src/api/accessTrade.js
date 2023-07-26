const axios = require('axios');
const { formatISO } = require('date-fns');

const baseURL = process.env.AT_URL;

const accessTradeAxios = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.AT_TOKEN}`,
    },
});

const accessTradeApi = {
    getLinkAff: (data) => {
        const baseURL = 'product_link/create';
        return accessTradeAxios.post(baseURL, data);
    },
    getCampCommission: (data) => {
        const baseURL = `commission_policies?camp_id=${data.campId}&month=${data.month}`;
        return accessTradeAxios.get(baseURL);
    },
    getTransaction: (data) => {
        const baseURL = `transactions?since=${formatISO(
            data.startDate
        )}&until=${formatISO(data.endDate)}`;
        return accessTradeAxios.get(baseURL);
    },
};

module.exports = accessTradeApi;
