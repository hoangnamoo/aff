const accessTradeApi = require('../api/accessTrade');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const getShopeeProduct = require('../utils/shopee');

exports.getLinkShopee = catchAsync(async (req, res, next) => {
    //req.body.link
    const { data } = await accessTradeApi.getLinkAff({
        campaign_id: '4751584435713464237',
        urls: [req.body.link],
        utm_source: 'user_id',
        utm_campaign: 'shopee',
        utm_content: 'catalogId',
    });

    if (data.data.error_link.length > 0)
        return next(new AppError('Link không hợp lệ', 400));

    const productInfo = await getShopeeProduct(
        data.data.success_link[0].url_origin
    );

    res.status(200).json({
        status: 'sucess',
        data: {
            aff_link: data.data.success_link[0],
            productInfo,
        },
    });
});
