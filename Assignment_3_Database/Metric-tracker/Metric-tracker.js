
const CSV = require('csv.js');

const {By, Builder} = require('selenium-webdriver');
const assert = require("assert");

(async function firstTest() {
  let driver;
  
  // Initialize browser
  driver = await new Builder().forBrowser('Firefox').build();
  
  // Navigate to your website
  await driver.get('http://localhost:3000');
  
  //INitialize varables
  metrics = collections.defaultdict(list)
  SAMPLE_SIZE = 2
  count = 0
  var start_time = performance.now();

  while (count < sample_size) {
    
    // presence_time = start_time
    var current_time = performance.now();
    var presence_time = current_time - start_time;
    console.log("Presence time: {presence_time} miliseconds")
    metrics["Presence time (Seconds)"].append(presence_time)
    
    //const CSV = require('csv.js');
    
    //const csv = new CSV();
    //csv.parse("your,csv,data,here", function(err, data) {
    //console.log(data);
    //});
    
    // Track scrolling
    const scroll_height = driver.execute_script("return document.body.scrollHeight;")  
    const current_scroll = driver.execute_script("return window.pageYOffset;")
    console.log("Scrolled {current_scroll}/{scroll_height} pixels")
    metrics["Scrolling (PIxels)"].append(current_scroll/scroll_height)

    count += 1
    time.sleep(2) 
  }
  
  await driver.quit();
  print(metrics)
  writeToCSV("metrics.csv", metrics)

}())