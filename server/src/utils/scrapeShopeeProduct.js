const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const scrapeShopeeProduct = async (url) => {
    puppeteer.use(StealthPlugin());
    const requestKey = 'item_id';
    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage();
    try {
        await page.goto(url);
        await page.reload();
        const response = await page.waitForRequest(
            (res) => {
                return res.url().includes(requestKey);
            },
            {
                timeout: 10000,
            }
        );
        const productUrl = response.url();

        const regex = /item_id=(\d+)/;

        const itemId = productUrl.match(regex)[1];
        await browser.close();
        return itemId;
    } catch (error) {
        await browser.close();
        return null;
    }
};

module.exports = scrapeShopeeProduct;
