const axios = require('axios');
const crypto = require('crypto');

const shopeeApi = {
    callApi: async (query) => {
        const SHOPEE_URL = process.env.SHOPEE_URL;
        const SHOPEE_APP_ID = process.env.SHOPEE_APP_ID;
        const SHOPEE_API_KEY = process.env.SHOPEE_API_KEY;
        const timestamps = Math.round(Date.now() / 1000);

        const dataToHash = `${SHOPEE_APP_ID}${timestamps}${JSON.stringify({
            query,
        })}${SHOPEE_API_KEY}`;
        const signature = crypto
            .createHash('sha256')
            .update(dataToHash)
            .digest('hex');
        const { data } = await axios.post(
            SHOPEE_URL,
            {
                query,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `SHA256 Credential=${SHOPEE_APP_ID}, Timestamp=${timestamps}, Signature=${signature}`,
                },
            }
        );
        return data;
    },
};

module.exports = shopeeApi;
