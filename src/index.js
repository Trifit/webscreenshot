// TODO: add file system support

const puppeteer = require('puppeteer-core');

const domain = 'cltsenvironments.loyaltytravelservices.com';
const subdomain = 'SSOSimulator';
const protocol = 'http';
const url = `${protocol}://${domain}/${subdomain}`;
const ssoSelection = {
  environment: 'QA',
  client: 'US Bank',
  program: '1289',
  theme: 'usbank',
  languange: 'English (United States)',
  points: '100000',
  user: '999999B'
}; 

(async () => {
  const select = async (context, selection, val) => {
    var selectorValue = [selection, val];
    await context.waitForSelector( selectorValue[0] + ' > div:nth-child(2) > div > div > ul', { timeout: 100000 }).then(() => console.log('got it'));
    await context.click(`${selectorValue[0]} > div:nth-child(2) > div > button > span.filter-option`);
    await context.type(`${selectorValue[0]} > div:nth-child(2) > div > div > div > input`, val);
    await context.keyboard.press('Enter');
    console.log('\x1b[36m', 'Element triggered: ', selectorValue.val,'\x1b[0m');
  };
  const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        ignoreDefaultArgs: ['--disable-extensions'],
        headless: false,
        args: [
            '--start-maximized'
        ]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  await page.goto(url, {waitUntil: 'domcontentloaded',timeout: 100000});

  let pageTitle = await page.title();
  console.log(`Page loaded: ${pageTitle}`);

  await page.screenshot({path: `./screenshots/${domain}-${pageTitle}.png`});
  console.log(`Screenshot created in: ./screenshots/${domain}-${pageTitle}.png`);
  const metrics = await page.metrics();
  console.log(metrics);

  // const input = await page.waitForSelector('body > div > div:nth-child(6) > div:nth-child(2) > div > button > span.filter-option');
  // await input.click('body > div > div:nth-child(6) > div:nth-child(2) > div > button > span.filter-option');
  // await input.type('t3');
  // await page.keyboard.press('Enter');
  await select(page, 'body > div > div:nth-child(6)', ssoSelection.environment);
  await select(page, 'body > div > div:nth-child(7)', ssoSelection.client);
  await select(page, 'body > div > div:nth-child(8)', ssoSelection.program);
  await select(page, 'body > div > div:nth-child(9)', ssoSelection.theme);

  // await browser.close();
})();