const axios = require('axios');
const crypto = require('crypto');
const getShopeeProductAff = require('./testShopee');

const getLinkShopeeAff = async (url) => {
    const itemId = await getShopeeProductAff(url);
    const API_URL = 'https://open-api.affiliate.shopee.vn/graphql';
    const AppID = 17377110099;
    const APIkey = 'F3SNQ4AALDLHI7XL4TRS5XECVZRP3OUD';

    const query = `{
      productOfferV2(itemId: ${itemId}){
        nodes {
          commissionRate
          productName
          shopName
          offerLink
          productCatIds
          imageUrl
          shopeeCommissionRate
          sellerCommissionRate
          appNewRate
          appExistRate
          price
        }
        pageInfo {
          page
          hasNextPage
        }
      }
    }
    
  `;

    //Authorization: SHA256 Credential=123456, Timestamp=1599999999, Signature=9bc0bd3ba6c41d98a591976bf95db97a58720a9e6d778845408765c3fafad69d.

    const timestamps = Math.round(Date.now() / 1000);
    const dataToHash = `${AppID}${timestamps}${JSON.stringify({
        query,
    })}${APIkey}`;
    const signature = crypto
        .createHash('sha256')
        .update(dataToHash)
        .digest('hex');
    const { data } = await axios.post(
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
    );

    console.log(data.data.productOfferV2.nodes);
};

getLinkShopeeAff(
    'https://shopee.vn/Kem-ch%E1%BB%91ng-n%E1%BA%AFng-l%C3%A2u-tr%C3%B4i-innisfree-Intensive-Long-Lasting-Sunscreen-SPF50-PA-60ml-(New-2023)-i.155343961.2712731941?xptdk=7e187c3f-2e05-40d7-b846-1eeaa8f7dedc'
);
