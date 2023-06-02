import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export async function getBook24(request) {
    const shopTitle = 'Book24';
    const link = `https://book24.ru/search/?q=${request}&available=2`;

    const bookTitle = 'div.product-card__content > a';
    const bookLink = 'article > div.product-card__image-holder > a';
    const bookPrice = 'article > div.product-card__content > div.product-card-price.product-card__price > div.product-card-price__current > span';
    const bookImage = 'article > div.product-card__image-holder > a > picture > img';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(link);

    await page.waitForSelector(bookPrice);

    const htmlContent = await page.content();

    const $ = cheerio.load(htmlContent);

    await browser.close();

    // Массив названий книг
    const bookTitleArr = [];
    for (let title of $(bookTitle)) {
        bookTitleArr.push(title.attribs.title);
    }

    // Массив ссылок книг
    const bookLinkArr = [];
    for (let link of $(bookLink)) {
        bookLinkArr.push('https://book24.ru' + link.attribs.href);
    }

    // Массив цен книг
    const bookPriceArr = [];
    for (let price of $(bookPrice)) {
        let parsedPrice = (price.children[0].data).replace(/\s/g, '');
        bookPriceArr.push(parseInt(parsedPrice));
    }

    // Массив цен книг
    const bookImageArr = [];
    for (let image of $(bookImage)) {
        if (image.attribs['data-src'].startsWith('http')) {
            bookImageArr.push(image.attribs['data-src']);
        } else { bookImageArr.push('https:' + image.attribs['data-src']); }

    }

    //Финальный массив со всеми данными
    const finalArr = [];
    for (let i = 0; i < bookTitleArr.length; i++) {
        finalArr.push([bookTitleArr[i], bookPriceArr[i], bookLinkArr[i], bookImageArr[i], shopTitle]);
    }

    // Сортировка массива по цене
    finalArr.sort((a, b) => a[1] - b[1]);

    return finalArr;
}

// console.log(await getBook24())
