const { Builder, By, Key, until} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');

async function findKeyword( driver, keyword){
    let pageSource = await driver.getPageSource();
    // console.log(pageSource.toLowerCase())
    return pageSource.toLowerCase().includes(keyword.toLowerCase());
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
        const keyword = ["batman"];
        for (let key of keyword) {
            if (await findKeyword(driver, key)) {
                totalRewardTime += rewardTime;
                // await driver.sleep(rewardTime * 1000);
                await new Promise(resolve => setTimeout(resolve, rewardTime * 1000));
        }
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