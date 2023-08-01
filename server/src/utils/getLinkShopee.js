const shopeeApi = require('../api/shopeeApi');
const AppError = require('./AppError');
const scrapeShopeeProduct = require('./scrapeShopeeProduct');

const getLinkShopee = async (req, res, next, campOfLink) => {
    const query = `mutation {
        generateShortLink (input: {
          originUrl: "${req.body.link}"
          subIds: ["${req.body.userId}"]
        }) {
          shortLink
        }
      }`;

    const { data } = await shopeeApi.callApi(query);

    const productId = await scrapeShopeeProduct(req.body.link);

    if (!productId) {
        return next(
            new AppError(
                'Không tìm thấy sản phẩm, Vui lòng kiểm tra lại link',
                400
            )
        );
    }

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
    const { price, shopeeCommissionRate, sellerCommissionRate, imageUrl } =
        productInfo;

    const shopeeCommission =
        shopeeCommissionRate * price > campOfLink.cap
            ? campOfLink.cap
            : shopeeCommissionRate * price;

    const sellerCommisson = sellerCommissionRate * price;

    const commission =
        (shopeeCommission + sellerCommisson) * campOfLink.userRate;
    res.status(200).json({
        status: 'suceess',
        data: {
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
            linkAffiliate: data.generateShortLink,
        },
    });
};

module.exports = getLinkShopee;
