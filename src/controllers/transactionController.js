const { endOfToday, startOfDay } = require('date-fns');
const accessTradeApi = require('../api/accessTrade');
const transApiFake = require('../dev-data/transactionResponse');
const { Transaction, Commission } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.updateTransactions = catchAsync(async (req, res, next) => {
    const endDate = endOfToday();
    const startDate = startOfDay(
        new Date(endDate.getFullYear(), endDate.getMonth() - 6, 1)
    );

    try {
        const { data } = await accessTradeApi.getTransaction({
            endDate,
            startDate,
        });

        console.log(data);
    } catch (error) {
        console.log(error);
    }

    const tranFake = await transApiFake();

    const allTrans = await Promise.all(
        tranFake.data.map(async (el) => {
            //Get ratio user
            const user_fixed_ratio = await Commission.findOne({
                where: {
                    product_category: el.product_category,
                    platform: 'shopee',
                    customer_type: el.customer_type || null,
                },
            });

            const currentTransaction = await Transaction.findOne({
                where: {
                    conversion_id: el.conversion_id,
                    payed_to_user: 0,
                },
            });

            let payed_to_user = 0;
            //Create newTran if currentTransaction not found
            if (!currentTransaction) {
                if (el.is_confirmed === 1) {
                    //handle + cash
                    payed_to_user = 1;
                }

                return Transaction.create({
                    ...el,
                    platform: el.utm_campaign,
                    user_id: el.utm_source,
                    user_com:
                        user_fixed_ratio?.user_fixed_ratio *
                            1 *
                            el.transaction_value || 0,
                    payed_to_user,
                });
            }

            if (currentTransaction) {
                if (el.is_confirmed === 1) {
                    //handle + cash
                    payed_to_user = 1;
                }
                return Transaction.update(
                    {
                        ...el,
                        payed_to_user,
                    },
                    {
                        where: {
                            conversion_id: el.conversion_id,
                        },
                    }
                );
            }
        })
    );

    res.status(200).json({
        status: 'success',
        data: allTrans,
    });
});
