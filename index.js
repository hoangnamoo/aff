//https://shp.ee/spckew4

const getShopeeProduct = require('./src/utils/shopee');

const shopeeURL = 'https://shp.ee/spckew4';

getShopeeProduct(shopeeURL).then((data) => {
    console.log(data);
});
