import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export async function getLabirint(request) {
    const shopTitle = 'Labirint'
    const link = `https://www.labirint.ru/search/${request}/?stype=0&display=table&available=1&paperbooks=1`

    const bookTitle = 'div.b-search-page-content > div.content-block > table > tbody > tr > td.col-sm-4 > div > a'
    const bookPrice = 'div.b-search-page-content > div.content-block > table > tbody > tr > td.products-table__price.col-sm-1 > div > div > span.price-val > span'
    const bookImage = 'div.b-search-page-content > div.content-block > table > tbody > tr > td.products-table__buy.col-sm-2 > div > div > div.fleft.product-icons-outer > div > div > a.icon-compare.track-tooltip.js-open-actions-block'

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(link)

    // await page.waitForSelector(bookPrice)

    const htmlContent = await page.content()

    const $ = cheerio.load(htmlContent);

    await browser.close();

    // Массив названий книг
    const bookTitleArr = []
    for (let title of $(bookTitle)) {
        bookTitleArr.push(title.attribs.title)
    }

    // Массив цен книг
    const bookPriceArr = []
    for (let price of $(bookPrice)) {
        bookPriceArr.push(parseInt((price.children[0].data).split(/\s+/).join("")))
    }

    // Массив изображений и ссылок на книгу
    const bookImageArr = []
    const bookLinkArr = []
    for (let image of $(bookImage)) {
        bookImageArr.push(image.attribs['data-image'])
        bookLinkArr.push(image.attribs['data-url'])
    }

    //Финальный массив со всеми данными
    const finalArr = []
    for (let i = 0; i < bookTitleArr.length; i++) {
        finalArr.push([bookTitleArr[i], bookPriceArr[i], bookLinkArr[i], bookImageArr[i], shopTitle])
    }

    // Сортировка массива по цене
    finalArr.sort((a, b) => a[1] - b[1])

    return finalArr
};

// console.log(await getLabirint())
