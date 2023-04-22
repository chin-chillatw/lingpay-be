const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors')

const app = express();
const { chromium } = require('playwright');

// var corsOptions = {
//   origin: 'http://localhost:5173/merchant?cur=twd&name=my_store&addr=0x0b2DaD722fe9e63821230d268aD09Abb3B9D4301',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.get('/api/price', cors(),async (req, res) => {
  console.log('SERVER side here!')
  const browser = await chromium.launch({
    headless: true
  });
  const page = await browser.newPage();
  // await page.goto('https://github.com/topics/javascript');
  await page.goto('https://www.okx.com/hk/convert/usdt-to-twd?amount=1');

  await page.waitForSelector('.fiat-or-quote-number')
  const price = await page.$$eval('.fiat-or-quote-number', (priceNode) => {
    return priceNode[0].innerText
  });

  console.log('price test', price)

  res.json({
    price
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
