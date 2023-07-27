const { format } = require('date-fns');
const { Commission, Campaign } = require('../models');
const accessTradeApi = require('../api/accessTrade');

const autoUpdateCommission = async () => {
    const allCampaign = await Campaign.findAll();
    const allCOM = await Commission.findAll();
    const thisMonth = format(new Date(), 'MM-yyyy');

    let allCamCom = await Promise.all(
        allCampaign.map((camp) => {
            return new Promise(async (resolve) => {
                const { data } = await accessTradeApi.getCampCommission({
                    campId: camp.camp_id,
                    month: thisMonth,
                });
                resolve(data.category);
            });
        })
    );

    allCamCom = allCamCom.reduce((acc, cur) => {
        return acc.concat(cur);
    }, []);

    await Promise.all(
        allCOM.map((el) => {
            const dataUpdate = allCamCom.find(
                (el2) =>
                    el2?.category_id === el.product_category &&
                    el2?.customer_type === el.customer_type
            );

            return el.update({
                user_ratio: dataUpdate?.sales_ratio || 0,
                real_ratio: dataUpdate?.sales_ratio || 0,
                update_at: new Date(),
            });
        })
    );

    console.log('update success');
};

module.exports = autoUpdateCommission;
