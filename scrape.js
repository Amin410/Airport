
// const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require('puppeteer')
// const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')


import { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } from "puppeteer";
import fs from "fs"
import puppeteer from 'puppeteer-extra' 

import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import Adblocker from 'puppeteer-extra-plugin-adblocker';
const scrape = async () => {
  puppeteer.use(
    AdblockerPlugin({
      // Optionally enable Cooperative Mode for several request interceptors
      interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY
    })
  )
  
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const url = "https://www.avionio.com/fr";
  await page.goto(url);
  await page.click("#header-menu a")
  const xp =  '::-p-xpath(//*[@id="content"]/div[2]/div[1]/p[4]/a)'
  const el = await page.waitForSelector(xp);
  await el.click();

  await sleep(5000);
  const xp2 =  '::-p-xpath(//*[@id="content"]/div[2]/div[2]/div/div/a[1])'
  const el2 = await page.waitForSelector(xp2);
  await el2.click();
  await sleep(4000);
  
  // await page.click(".ns-fclpr-e-8 span")
  // await page.click(".ns-fi4p9-e-1 span")
  
// const xp3 =  '::-p-xpath(//*[@id="dismiss-button"]/div/span)'
// const el3 = await page.waitForSelector(xp3);
// await el3.click();
//*[@id="dismiss-button"]/div/span

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, 7000);
    });
  }
  const books = await page.evaluate(() => {
    const flights = document.querySelectorAll(".container table tr td");
    let list = []
    flights.forEach((book) => {
      list.push(book.innerText)
    })
      return list
    });
    const jsonData = JSON.stringify(books, null, 2);
  fs.writeFileSync("data.json", jsonData);
    console.log(books);
    await browser.close();
  };
  scrape();



