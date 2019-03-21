const puppeteer = require('puppeteer')
const id = ""
const pw = ""

;(async () => {
  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()
  await page.goto('https://www.mcdelivery.co.kr')

  await page.evaluate((id, pw) => {
    document.querySelector('#form_login_masthead_username').value = id
    document.querySelector('#form_login_masthead_password').value = pw
    $('.form-actions').eq(0).find('button').click()
  }, id, pw)

  await page.waitForNavigation({ waitUntil: 'load' })
  await page.goto('https://www.mcdelivery.co.kr/kr/menu.html?daypartId=1&catId=11#add/1330')
  await page.evaluate(() => {
    $('.item-quantity-picker').eq(1).find('button').eq(1).click()
    $('.action-saveorder').click()
  })
  await page.goto('https://www.mcdelivery.co.kr/kr/menu.html?daypartId=1&catId=13#add/1402')
  await page.evaluate(() => {
    $('.item-quantity-picker').eq(2).find('button').eq(1).click()
    $('.action-saveorder').click()
  })
  await page.waitForNavigation({ waitUntil: 'load' })
  await page.goto('https://www.mcdelivery.co.kr/kr/order-review-confirmation.html')
  await page.evaluate(() => {
    $('.form-actions').eq(0).find('button').click()
  })

  await page.waitForNavigation({ waitUntil: 'load' })
  await page.click('#form_order_payment_type_creditcard')
  await page.evaluate(() => {
    $('.iradio').eq(4).find('ins').click()
  })
  await page.click('#confirmBtn')
  await page.waitForNavigation({ waitUntil: 'load' })
  await browser.close()
})()