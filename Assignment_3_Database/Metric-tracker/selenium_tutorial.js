//part 1 start session
//driver = await new Builder().forBrowser(Browser.CHROME).build();

//part 2 take action on bowser 
//await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

//part 3 request browser information
//let title = await driver.getTitle();

// part 4 establish waiting strategy
//await driver.manage().setTimeouts({implicit: 500});

// part 5 find an element
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
    //part 1 starts the session
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    //part 2 take action on bowser or navagating to the web page
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    
    //part 3 requesting browser information or elements
    let title = await driver.getTitle();
    assert.equal("Web form", title);
    
    // part 4 establish waiting strategy or Synchronizing the code with the web page to 
    // make sure that the elemebts are in an interatable stare 
    await driver.manage().setTimeouts({implicit: 500});
    
    // part 5 find an element so that you can interact with it
    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));
  
    // part 6 Take action on element such as clicking, sending keys, clearing, subiting and selecting
    await textBox.sendKeys('Selenium');
    await submitButton.click();
    
    // part 7 request element information
    let message = await driver.findElement(By.id('message'));
    let value = await message.getText();
    assert.equal("Received!", value);
  } catch (e) {
    console.log(e)
  } finally {
    // 8. End the session had to comment out so that screanshot could be taken
    //await driver.quit();

  }
}())