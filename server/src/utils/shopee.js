const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

//https://shopee.vn/api/v4/item/get?shopid=155343961&itemid=2355017281

//https://shopee.vn/api/v2/add_on_deal/get_main_item_info

//https://shopee.vn/api/v4/pdp/get_pc?shop_id=155343961&item_id=2355017281\

//https://shopee.vn/api/v2/add_on_deal/get_main_item_info
const getShopeeProduct = async (url) => {
    const GET_MAIN_ITEM_INFO_URL = 'https://shopee.vn/api/v4/pdp/get_pc';
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
        });
        const page = await browser.newPage();
        await page.goto(url);
        const response = await page.waitForResponse(
            (res) =>
                res.url().startsWith(GET_MAIN_ITEM_INFO_URL) &&
                res.status() === 200,
            {
                timeout: 15000,
            }
        );

        const data = await response.json();
        await browser.close();
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// getShopeeProduct('https://shp.ee/sdi2hby');

// module.exports = getShopeeProduct;
