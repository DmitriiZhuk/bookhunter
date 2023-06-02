// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';

async function run() {
    const link = "https://book24.ru/search/?q=%D0%BA%D0%BE%D1%80%D1%87%D0%B0%D0%BA%20%D0%BA%D0%B0%D0%BA%20%D0%BB%D1%8E%D0%B1%D0%B8%D1%82%D1%8C%20%D1%80%D0%B5%D0%B1%D0%B5%D0%BD%D0%BA%D0%B0&available=2"
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(link)

    // await page.screenshot({ path: "example.png", fullPage: true });
    // await page.pdf({ path: "example.pdf", format:"A3" });

    const htmlContent = await page.content()
    // console.log(htmlContent)

    const text = await page.evaluate(() => document.body.innerText);
    // console.log(text)

    const testSpan = 'main > div > div.catalog.search-page__catalog > div.catalog__content._adjusted-width > div.catalog__product-list-holder > div > div:nth-child > article > div.product-card__content > div.product-card-price.product-card__price > div.product-card-price__current > span'
    const links = await page.evaluate(() => Array.from(document.querySelectorAll(testSpan), (e) =>e))
    console.log(links)
    // const selector = "#main > div > div.catalog.search-page__catalog > div.catalog__content._adjusted-width > div.catalog__product-list-holder > div > div:nth-child(1) > article > div.product-card__image-holder > a > picture > img"

    // const links = await page.evaluate(() => Array.from(document.querySelectorAll(selector), (e) => ({
    //     title: e.querySelector('.product-card__name smartLink').innerText
    // })))
    // console.log(links)

    await browser.close();
};

run();

