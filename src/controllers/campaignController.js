const { Campaign } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.newCampaign = catchAsync(async (req, res, next) => {
    //req.body.camp_id | camp_name
    let newCampaign = await Campaign.bulkCreate(req.body.campaignList, {
        ignoreDuplicates: true,
    });

    res.status(200).json({
        status: 'success',
        data: newCampaign,
    });
});
