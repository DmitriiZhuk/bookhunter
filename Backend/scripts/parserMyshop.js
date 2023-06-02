import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export async function getMyShop(request) {
    const shopTitle = 'MyShop'
    const link = `https://my-shop.ru/shop/search/a/sort/a/page/1.html?f14_39=3&f14_16=4&f14_6=${request}&next=1&p38=1`


    const bookTitle = 'div > div.wrap.product-list > div > div.list-pane > div.article > div > div > div > div.top > div > div.item__title__container > a.item__title'
    const bookPrice = 'div > div > div.wrap.product-list > div > div.list-pane > div.article > div > div > div > div.top > div > div.item__price > div > span.price.rubl'
    const bookLink = 'div > div > div.wrap.product-list > div > div.list-pane > div.article > div > div > div > div.top > div > div.item__title__container > a.item__title'
    const bookImage = 'div > div > div.wrap.product-list > div > div.list-pane > div.article > div > div > div > div.top > div.item__img > a > picture > img'

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(link)

    // await page.waitForSelector(bookPrice)

    const htmlContent = await page.content()

    const $ = cheerio.load(htmlContent);

    await browser.close();

    // Получаю массив названий книг
    const bookTitleArr = ($(bookTitle).text().split("\n").map(name => name.trim()))
    bookTitleArr.shift();

    // Получаю массив цен книг
    const bookPriceArr = []
    for (let price of $(bookPrice)) {
        bookPriceArr.push(parseInt((price.children[0].data).split(/\s+/).join("")))
    }

    // Получаю массив ссылок книг
    const bookLinkArr = []
    for (let link of $(bookLink)) {
        bookLinkArr.push('https://my-shop.ru' + link.attribs.href)
    }

    // Получаю массив изображений книг
    const bookImageArr = []
    for (let image of $(bookImage)) {
        bookImageArr.push('https:' + image.attribs.src)
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
// console.log(await getMyShop())
