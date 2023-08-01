const { default: axios } = require('axios');
const accessTradeApi = require('../api/accessTrade');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const getShopeeProduct = require('../utils/shopee');
const { Campaign, Commission } = require('../models');
const getLazadaProduct = require('../utils/lazada');
const { Op } = require('sequelize');

exports.getLinkShopee = catchAsync(async (req, res, next) => {
    //req.body.link req.body.campId

    //1, check URL
    const campSupportedLink = await Campaign.findAll({
        where: {
            camp_type: 'e-commerce',
        },
    });
    const response = await axios.get(req.body.link, { maxRedirects: 3 });
    const finalUrl = response.request.res.responseUrl;
    let campaign = campSupportedLink.find((el) => finalUrl.includes(el.name));
    if (!campaign)
        return next(
            new AppError(
                `Link không hợp lệ, các link hỗ trợ: ${campSupportedLink
                    .map((el) => el.name)
                    .join(' | ')}`,
                400
            )
        );

    //2, Create Aff Link
    const { data } = await accessTradeApi.getLinkAff({
        campaign_id: campaign.camp_id,
        urls: [req.body.link],
        utm_source: 'user_id',
        utm_campaign: campaign.name,
    });

    if (data.data.error_link.length > 0)
        return next(new AppError(`Link không được hỗ trợ`, 400));

    //3, Get Product Info
    const getProductInfo = (platform) => {
        switch (platform) {
            case 'shopee':
                return getShopeeProduct;
            case 'lazada':
                return getLazadaProduct;
            default:
                return null;
        }
    };

    const productInfo = await getProductInfo(campaign.name)(
        data.data.success_link[0].short_link
    );

    let user_ratio;
    if (productInfo) {
        if (campaign.name === 'shopee') {
            const comission = await Commission.findAll({
                where: { category_id: productInfo.item.cat_id },
            });

            user_ratio = comission;
        }

        if (campaign.name === 'lazada') {
            const comission = await Commission.findAll({
                where: {
                    [Op.or]: [
                        {
                            category_id: productInfo.category,
                        },
                    ],
                },
            });

            user_ratio = comission;
        }
    }

    res.status(200).json({
        status: 'sucess',
        data: {
            aff_link: data.data.success_link[0],
            productInfo,
            user_ratio,
        },
    });
});

exports.updateShopeeCommission = catchAsync(async (req, res, next) => {
    console.log('OK');

    res.status(200).json('OK');
});
