const { format } = require('date-fns');
const { Commission } = require('../models');
const catchAsync = require('../utils/catchAsync');
const accessTradeApi = require('../api/accessTrade');

exports.createCommistion = catchAsync(async (req, res, next) => {
    //input req.body.platform
    const newCom = await Commission.bulkCreate(req.body.commissionList);

    res.status(200).json({
        status: 'success',
        data: newCom,
    });
});

exports.updateCommission = catchAsync(async (req, res, next) => {
    //input req.body.campId
    const { campId } = req.body;

    const thisMonth = format(new Date(), 'MM-yyyy');
    console.log(thisMonth);

    const campInfo = await accessTradeApi.getCampCommission({
        campId,
        month: thisMonth,
    });

    const allCOM = await Commission.findAll();

    const comUpdate = await Promise.all(
        allCOM.map((el) => {
            const dataUpdate = campInfo.data.category.find(
                (el2) =>
                    el2.category_id === el.category_name &&
                    el2.customer_type === el.customer_type
            );

            return el.update({
                user_fixed_com: dataUpdate?.sales_ratio || 0,
            });
        })
    );

    const newCom = await Commission.findAll();

    res.status(200).json({
        status: 'success',
        data: newCom,
    });
});
