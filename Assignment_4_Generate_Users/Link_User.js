const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const time = require('selenium-webdriver/lib/promise').sleep;

async function findKeyword(driver, keyword) {
    let pageSource = await driver.getPageSource();
    // console.log(pageSource.toLowerCase());
    return pageSource.toLowerCase().includes(keyword.toLowerCase());
}

async function countElem(driver, tagName) {
    let elements = await driver.findElements(By.tagName(tagName));
    return elements.length;
}

async function userAction(action, driver, rewardTime, reqList) {
    let totalRewardTime = 0;
    if (action.toUpperCase() === "KEYWORD") {
        for (let keyword of reqList) {
            if (await findKeyword(driver, keyword)) {
                console.log("found ", keyword);
                // await time(rewardTime * 1000); // Selenium WebDriver's sleep function expects milliseconds
                await new Promise(resolve => setTimeout(resolve, rewardTime * 1000));
                totalRewardTime += rewardTime;
            } else {
                console.log(keyword, " not found");
            }
        }
    } else if (action.toUpperCase() === "IMAGE") {
        let numImages = await countElem(driver, reqList[0]);
        totalRewardTime = rewardTime * numImages;
        // await time(totalRewardTime * 1000);
        await new Promise(resolve => setTimeout(resolve, rewardTime * 1000));
    }
    return totalRewardTime;
}

async function clickLink(driver, rewardTime) {
    let totalRewardTime = 0;
    let links = await driver.findElements(By.tagName('a'));
    for (let link of links) {
        await link.click();
        totalRewardTime += rewardTime;
        await new Promise(resolve => setTimeout(resolve, rewardTime * 1000));
    }
    return totalRewardTime;
}

async function main() {
    const driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options())
    .build();

    await driver.get('http://localhost:3000/');
    let rewardTime = 10;
    let tagName = "img";
    let totalRewardTime = await userAction("KEYWORD", driver, rewardTime, ["batman", "game"]);
    totalRewardTime += await userAction("IMAGE", driver, rewardTime, [tagName]); 
    totalRewardTime += await clickLink(driver, rewardTime);
    await driver.quit();

    console.log("Presence Time:", totalRewardTime);
}

main();