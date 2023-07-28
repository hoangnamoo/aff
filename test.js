const axios = require('axios');
const crypto = require('crypto');

const API_URL = 'https://open-api.affiliate.shopee.vn/graphql';

const AppID = 17377110099;
const APIkey = 'F3SNQ4AALDLHI7XL4TRS5XECVZRP3OUD';

const query = `{
    shopeeOfferV2(limit: 20) {
      nodes {
        commissionRate
        categoryId
      }
      pageInfo {
        page
      }
    }
  }
  `;

//Authorization: SHA256 Credential=123456, Timestamp=1599999999, Signature=9bc0bd3ba6c41d98a591976bf95db97a58720a9e6d778845408765c3fafad69d.

const timestamps = Math.round(Date.now() / 1000);
const dataToHash = `${AppID}${timestamps}${JSON.stringify({ query })}${APIkey}`;
const signature = crypto.createHash('sha256').update(dataToHash).digest('hex');

axios
    .post(
        API_URL,
        {
            query,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `SHA256 Credential=${AppID}, Timestamp=${timestamps}, Signature=${signature}`,
            },
        }
    )
    .then((response) => {
        const data = response;
        // Handle the data here
        console.log(data.data.data.shopeeOfferV2);
    })
    .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error.extensions);
    });
