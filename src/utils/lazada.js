const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const getLazadaProduct = async (url) => {
    const GET_MAIN_ITEM_INFO_URL =
        'https://www.lazada.vn/products/chi-217-tang-qua-don-349kquan-short-nam-the-thao-7-function-thuong-hieu-coolmate-i1943737446-s8926764164.html?';
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
        });
        const page = await browser.newPage();
        await page.goto(
            'https://www.lazada.vn/products/ao-thun-teelab-x-tgod-local-brand-unisex-gameboy-ts155-i2077192817-s9728487983.html?spm=a2o4n.home.flashSale.3.51d63bdcbqFTuS&search=1&mp=1&c=fs&clickTrackInfo=rs%3A0.02654690109193325%3Bfs_item_discount_price%3A169.000%3Bitem_id%3A2077192817%3Bpctr%3A0.02654690109193325%3Bcalib_pctr%3A0.0%3Bmt%3Ai2i%3Bfs_utdid%3A-1%3Bfs_item_sold_cnt%3A2%3Babid%3A287818%3Bfs_item_price%3A350.000%3Bpvid%3Ac508940b-0f12-4941-9173-f1d8fe79dd3e%3Bfs_min_price_l30d%3A0%3Bdata_type%3Aflashsale%3Bfs_pvid%3Ac508940b-0f12-4941-9173-f1d8fe79dd3e%3Btime%3A1690470909%3Bfs_biz_type%3Afs%3Bscm%3A1007.17760.287818.%3Bchannel_id%3A0000%3Bfs_item_discount%3A52%25%3Bcampaign_id%3A233308&scm=1007.17760.287818.0',
            {
                waitUntil: 'domcontentloaded',
            }
        );

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
                price: price.innerText,
            };
        });

        //price: price.split('-').map((el) => el.replace(/[^0-9]/g, '')),

        console.log(data);

        await browser.close();
    } catch (error) {
        console.log(error);
        return null;
    }
};

getLazadaProduct();

module.exports = getLazadaProduct;
