import * as cheerio from 'cheerio';
import axios from 'axios';

export async function getChitaiGorod(request) {
    const shopTitle = 'Chitai Gorod';

    const result = [];
    const response = await axios.get(`https://www.chitai-gorod.ru/search?phrase=${encodeURIComponent(request)}&onlyAvailable=1`);
    const $ = cheerio.load(response.data);
    const cards = $('article.product-card');
    for (const card of cards) {
        const price = $(card).attr('data-chg-product-price');
        const a = $(card).find('>a');
        const link = $(a).attr('href');
        const imageUrl = $(a).find('img').attr('data-src') || $(a).find('img').attr('src');
        const author = $(card).find('.product-title__author').text().trim();
        const title = $(card).find('.product-title__head').text().trim();
        result.push([
            title,
            price,
            link,
            imageUrl,
            shopTitle,
        ]);
    }

    result.sort((a, b) => a[1] - b[1]);

    return result;
}
