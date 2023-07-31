const shopeeApi = require('../api/shopeeApi');
const { Campaign } = require('../models');
const catchAsync = require('../utils/catchAsync');
const getShopeeProduct = require('../utils/getShopeeProduct');

exports.getLinkShopee = catchAsync(async (req, res, next) => {
    //input req.body.link

    const query = `mutation {
        generateShortLink (input: {
          originUrl: "${req.body.link}"
          subIds: ["${req.body.userId}"]
        }) {
          shortLink
        }
      }`;

    const { data } = await shopeeApi.callApi(query);

    const productId = await getShopeeProduct(req.body.link);

    const queryProduct = `{
        productOfferV2(itemId: ${productId}){
          nodes {
              itemId
            shopId
            productName
            shopName
            price
            shopeeCommissionRate
            sellerCommissionRate
            commissionRate
            commission
            imageUrl
            }
          }
      }
      `;

    const response = await shopeeApi.callApi(queryProduct);
    const productInfo = response.data.productOfferV2.nodes[0];
    const campaign = await Campaign.findByPk('shopee');

    const { price, shopeeCommissionRate, sellerCommissionRate, imageUrl } =
        productInfo;

    const shopeeCommission =
        shopeeCommissionRate * price > 15000
            ? 15000
            : shopeeCommissionRate * price;

    const sellerCommisson = sellerCommissionRate * price;

    const commission = (shopeeCommission + sellerCommisson) * campaign.userRate;
    res.status(200).json({
        status: 'suceess',
        data,
        productInfo: {
            ...productInfo,
            price,
            shopeeCommissionRate,
            sellerCommissionRate,
            imageUrl,
            shopeeCommission,
            sellerCommisson,
            commission,
        },
    });
});
