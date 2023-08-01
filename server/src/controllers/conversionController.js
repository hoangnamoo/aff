const { all } = require('axios');
const catchAsync = require('../utils/catchAsync');
const { Conversion, Order, Item } = require('../models');
const shopeeApi = require('../api/shopeeApi');

exports.updateShopeeConversion = catchAsync(async (req, res, next) => {
    let scrollId = '';

    while (true) {
        let query = `{
            conversionReport (limit: 100, scrollId: "${scrollId}"){
              nodes {
                purchaseTime
                clickTime
                conversionId
                shopeeCommissionCapped
                sellerCommission
                totalCommission
                utmContent
                referrer
                conversionStatus
                orders {
                  orderId
                  orderStatus
                  shopType
                  items {
                    completeTime
                    shopId
                    shopName
                    itemId
                    itemName
                    itemPrice
                    actualAmount
                    qty
                    imageUrl
                    itemTotalCommission
                    itemSellerCommission
                    itemSellerCommissionRate
                    itemShopeeCommissionRate
                    itemShopeeCommissionCapped
                    fraudStatus
                    refundAmount
                    itemNotes
                  }
                }
              }
              pageInfo {
                hasNextPage
                scrollId
              }
            }
          }
          `;

        let { data } = await shopeeApi.callApi(query);

        let conversion = [];
        let orders = [];
        let items = [];

        data.conversionReport.nodes.forEach((el) => {
            //Fitler Conversions
            conversion.push({
                conversionId: el.conversionId,
                campId: 'shopee',
                purchaseTime: el.purchaseTime,
                clickTime: el.clickTime,
                completeTime: el.completeTime,
                merchant: 'shopee',
                userId: el.utmContent.split('-')[0],
                commission: el.totalCommission,
            });

            //Filter Orders
            el.orders.forEach((el2) => {
                orders.push({
                    orderId: el2.orderId,
                    conversionId: el.conversionId,
                    orderStatus: el2.orderStatus,
                    shopType: el2.shopType,
                });

                //Fitler Items
                el2.items.forEach((el3) => {
                    items.push({
                        orderItemId: `${el2.orderId}@${el3.itemId}@${el3.itemPrice}`,
                        orderId: el2.orderId,
                        conversionId: el.conversionId,
                        itemId: el3.itemId,
                        itemName: el3.itemName,
                        shopId: el3.shopId,
                        shopName: el3.shopName,
                        itemPrice: el3.itemPrice,
                        actualAmount: el3.actualAmount,
                        qty: el3.qty,
                        imageUrl: el3.imageUrl,
                        itemTotalCommission: el3.itemTotalCommission,
                        itemNotes: el3.itemNotes,
                        refundAmount: el3.refundAmount,
                        fraudStatus: el3.fraudStatus,
                        completeTime: el3.completeTime,
                    });
                });
            });
        });

        await Conversion.bulkCreate(conversion, {
            updateOnDuplicate: ['clickTime'],
        });
        await Order.bulkCreate(orders, {
            updateOnDuplicate: ['orderStatus'],
        });
        await Item.bulkCreate(items, {
            updateOnDuplicate: [
                'itemNotes',
                'itemUserCommission',
                'itemTotalCommission',
            ],
        });
        if (data.conversionReport.pageInfo.hasNextPage) {
            scrollId = data.conversionReport.pageInfo.scrollId;
        } else {
            break;
        }
    }

    res.status(200).json({
        status: 'success',
    });
});
