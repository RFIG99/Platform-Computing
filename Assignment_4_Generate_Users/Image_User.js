const { Builder, By, Key, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');

async function countElem( driver, tagName){
    let elements = await driver.findElements(By.tagName(tagName));
    // console.log(pageSource.toLowerCase())
    return elements.length;
}

async function main() {
    const driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options())
        .build();

    //try{
        await driver.get('http://localhost:3000/');
        let rewardTime = 10;
        let totalRewardTime = 0;
        const tags = ["img"];

        for (let tag of tags) {
            let numImages = await countElem(driver, tag);
            totalRewardTime += rewardTime * numImages;
            await new Promise(resolve => setTimeout(resolve, rewardTime * 1000));
        }
    //}
    //finally{
        await driver.quit();
    //}
    
    console.log('Presence Time:', totalRewardTime);
}

if (require.main === module){
    main();
}