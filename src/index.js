// TODO: add file system support

const puppeteer = require('puppeteer-core');

const domain = 'cltsenvironments.loyaltytravelservices.com';
const subdomain = 'SSOSimulator';
const protocol = 'http';
const url = `${protocol}://${domain}/${subdomain}`;

(async () => {
  const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        ignoreDefaultArgs: ['--disable-extensions']
  });
  const page = await browser.newPage();

  await page.goto(url);
  await page.screenshot({path: `./screenshots/${domain}-${page.title()}.png`});

  await browser.close();
})();