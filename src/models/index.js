const DB = require('../configs/dbConfig');
const Campaign = require('./Campaign');
const Conversion = require('./Conversion');
const Item = require('./Item');
const Order = require('./Order');

//Setup Relationship
Campaign.hasMany(Conversion, {
    foreignKey: 'campId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Conversion.hasMany(Order, {
    foreignKey: 'conversionId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Order.hasMany(Item, {
    foreignKey: 'orderId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Conversion.belongsTo(Campaign, {
    foreignKey: 'campId',
});
Order.belongsTo(Conversion, {
    foreignKey: 'conversionId',
});
Item.belongsTo(Order, {
    foreignKey: 'orderId',
});

//Midleware

Conversion.beforeBulkCreate(async (conversions) => {
    for (const conversion of conversions) {
        const campaign = await Campaign.findByPk(conversion.campId);
        const userCommission =
            conversion.commission * (1 - campaign.tax) * campaign.userRate;
        conversion.userCommission = userCommission;
    }
});

Item.beforeBulkCreate(async (items) => {
    for (const item of items) {
        const conversionId = item.conversionId;
        const conversion = await Conversion.findByPk(conversionId, {
            include: {
                model: Campaign,
            },
        });

        item.itemUserCommission =
            conversion.Campaign.userRate *
            (1 - conversion.Campaign.tax) *
            item.itemTotalCommission;
    }
});

DB.sync({ force: false, alter: true });

module.exports = {
    Campaign,
    Conversion,
    Order,
    Item,
};
