//part 1 start session
//driver = await new Builder().forBrowser(Browser.CHROME).build();

//part 2 take action on bowser 
//await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

//part 3 request browser information
//let title = await driver.getTitle();

// part 4 establish waiting strategy
//await driver.manage().setTimeouts({implicit: 500});

// part 5 an element
//let textBox = await driver.findElement(By.name('my-text'));
//let submitButton = await driver.findElement(By.css('button'));
//const {By, Builder, Browser} = require('selenium-webdriver');
//const assert = require("assert");

// part 6 Take action on element
//await textBox.sendKeys('Selenium');
//await submitButton.click();

// part 7 request element information
//let value = await message.getText();

//part 8 End thhe session
//await driver.quit();
 
const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

(async function firstTest() {
  let driver;
  
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
  
    let title = await driver.getTitle();
    assert.equal("Web form", title);
  
    await driver.manage().setTimeouts({implicit: 500});
  
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));
  
    await textBox.sendKeys('Selenium');
    await submitButton.click();
  
    let message = await driver.findElement(By.id('message'));
    let value = await message.getText();
    assert.equal("Received!", value);
  } catch (e) {
    console.log(e)
  } finally {
    //await driver.quit();

  }
}())