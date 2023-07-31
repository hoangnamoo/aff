const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const getLazadaProduct = async (url) => {
    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage();
    try {
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
        });

        await page.waitForSelector(
            '#module_product_price_1 > div > div > span'
        );

        const data = await page.evaluate(() => {
            const title = document.querySelector(
                '#module_product_title_1 > div > div > h1'
            );
            const category = document.querySelector(
                '#J_breadcrumb > li:nth-child(1) > span > a > span'
            );

            const price = document.querySelector(
                '#module_product_price_1 > div > div > span'
            );
            return {
                title: title.innerText,
                category: category.innerText,
                price: price.innerText
                    .split('-')
                    .map((el) => el.replace(/[^0-9]/g, '')),
            };
        });

        //price: price.split('-').map((el) => el.replace(/[^0-9]/g, '')),

        await browser.close();
        return data;
    } catch (error) {
        console.log(error);
        await browser.close();
        return null;
    }
};

module.exports = getLazadaProduct;
