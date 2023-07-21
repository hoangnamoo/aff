const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

//https://shp.ee/spckew4

const getShopeeProduct = async (url) => {
    const startTime = Date.now();
    const browser = await puppeteer.launch({
        headless: 'new',
    });

    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector(
        '#main > div > div:nth-child(3) > div:nth-child(1) > div > div > div.container > div.flex.items-center.RnKf-X.page-product__breadcrumb > a:nth-child(3)'
    );
    let data = await page.evaluate(() => {
        const productName = document.querySelector(
            '#main > div > div:nth-child(3) > div:nth-child(1) > div.ndOSOO > div > div.container > div.product-briefing.flex.card.s9-a-0 > div.flex.flex-auto.RBf1cu > div > div._44qnta > span'
        ).innerHTML;

        const catalog = document.querySelector(
            '#main > div > div:nth-child(3) > div:nth-child(1) > div > div > div.container > div.flex.items-center.RnKf-X.page-product__breadcrumb > a:nth-child(3)'
        ).href;

        const price = document.querySelector(
            '#main > div > div:nth-child(3) > div:nth-child(1) > div > div > div.container > div.product-briefing.flex.card.s9-a-0 > div.flex.flex-auto.RBf1cu > div > div:nth-child(3) > div > div > div:nth-child(1) > div > div.flex.items-center > div.pqTWkA'
        ).innerHTML;

        return {
            productName,
            catalog: catalog.split('.')[catalog.split('.').length - 1] * 1,
            price: price.split('-').map((el) => el.replace(/[^0-9]/g, '')),
        };
    });

    console.log({
        end: Date.now() - startTime,
    });
    await browser.close();

    return data;
};

module.exports = getShopeeProduct;
