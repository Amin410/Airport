import pupeteer from "puppeteer";
import fs from "fs";

const scrape = async () => {
  const browser = await pupeteer.launch({headless: false});
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
  await sleep(9000);
  
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



