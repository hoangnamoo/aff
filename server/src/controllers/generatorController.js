const axios = require('axios');
const shopeeApi = require('../api/shopeeApi');
const { Campaign } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const getLinkShopee = require('../utils/getLinkShopee');

exports.getLinkAffiliate = catchAsync(async (req, res, next) => {
    //input req.body: {link, userId, type}

    const campSupportedLink = await Campaign.findAll({
        where: {
            campType: 'e-commerce',
        },
    });
    const checkLink = await axios.get(req.body.link, { maxRedirects: 3 });
    const finalUrl = checkLink.request.res.responseUrl;
    const campOfLink = campSupportedLink.find((el) =>
        finalUrl.includes(el.campId)
    );

    if (!campOfLink)
        return next(
            new AppError(
                `Link không hợp lệ, các link hỗ trợ: ${campSupportedLink
                    .map((el) => el.merchant)
                    .join(' | ')}`,
                400
            )
        );

    switch (campOfLink.campId) {
        case 'shopee':
            getLinkShopee(req, res, next, campOfLink);
            break;

        default:
            next(new AppError('Link không hỗ trợ, vui lòng kiểm tra lại'));
            break;
    }
});
