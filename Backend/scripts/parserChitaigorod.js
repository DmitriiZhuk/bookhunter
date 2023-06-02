import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export async function getChitaiGorod(request) {
    const shopTitle = 'Chitai Gorod'
    const link = `https://www.chitai-gorod.ru/search?phrase=${request}&onlyAvailable=1`

    puppeteer.use(StealthPlugin())

    const bookTitle = `div.product-card__text.product-card__row > a > div > div.product-title__head`
    const bookPrice = `div.product-card__price.product-card__row > div > div.product-price__value`
    const bookLink = `div.product-card__text.product-card__row > a`
    const bookImage = `a.product-card__picture.product-card__row > picture > img`

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(link)
    // await page.waitForNavigation()

    const htmlContent = await page.content()

    const $ = cheerio.load(htmlContent);
    
    await browser.close();

    // Массив названия книг
    const bookTitleArr = []
    for (let titleName of $(bookTitle)) {
        let title = titleName.children[0].data.replace(/(\r\n|\n|\r)/gm, '').trimLeft().trimRight()
        bookTitleArr.push(title)
    }

    // console.log(bookTitleArr)

    // Массив цен книг
    const bookPriceArr = []
    for (let price of $(bookPrice)) {
        let parsedPrice = (price.children[1].data).replace(/(\r\n|\n|\r) /gm, '').trimLeft().trimRight().replace(/\s/g, '')
        bookPriceArr.push(parseInt(parsedPrice))
    }

    // Массив ссылки на книгу
    const bookLinkArr = []
    for (let link of $(bookLink)) {
        bookLinkArr.push('https://www.chitai-gorod.ru' + link.attribs.href)
    }

    // Массив изображения на книгу
    const bookImageArr = []
    for (let image of $(bookImage)) {
        bookImageArr.push(image.attribs['data-src'])
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

// console.log(await getChitaiGorod())
