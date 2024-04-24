const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');
//const mysql = require('mysql');
//const mysql = require('mysql2');

async function writeToCSV(filename, metrics) {
    const header = Object.keys(metrics);
    const rows = [metrics];
    const csv = [header.join(',')];
    rows.forEach(row => {
        const values = header.map(key => row[key]);
        csv.push(values.join(','));
    });
    await fs.promises.writeFile(filename, csv.join('\n'));
}

async function main() {
    const driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(new firefox.Options())
        .build();

    await driver.get('http://localhost:3000/');

    const metrics = {};
    const SAMPLE_SIZE = 2;
    let count = 0;
    const start_time = Date.now();
    while (count < SAMPLE_SIZE) {
        const current_time = Date.now();
        const presence_time = (current_time - start_time) / 1000;
        console.log(`Presence time: ${presence_time} seconds`);
        metrics['Presence_time_(Seconds)'] = metrics['Presence_time_(Seconds)'] || [];
        metrics['Presence_time_(Seconds)'].push(presence_time);

        const scroll_height = await driver.executeScript('return document.body.scrollHeight');
        const current_scroll = await driver.executeScript('return window.pageYOffset');
        console.log(`Scrolled ${current_scroll}/${scroll_height} pixels`);
        metrics['Scrolling_(PIxels)'] = metrics['Scrolling_(PIxels)'] || [];
        metrics['Scrolling_(PIxels)'].push(current_scroll / scroll_height);

        count += 1;
        await driver.sleep(2000);
    }

    await driver.quit();
    console.log(metrics);
    await writeToCSV('metrics.csv', metrics);
    
    var mysql = require('mysql2');

    var con = mysql.createConnection(
        {
         host: "127.0.0.1",
         user: "root",
         password: "",
         database: "assighment_3"
        });

    
    con.connect(function(err) 
    {
        if (err) throw err;
        console.log("Connected!");
        
        var sql = "INSERT INTO metrics (time, Scrolling) VALUES (?, ?)"; 
        const time = metrics.Presence_time_(Seconds)[1];
        const scroll = metrics.Scrolling_(PIxels)[1];
        const records = time.map((time, index) => [time, scroll[index]]);
        //  const records = [time, scroll];
        // data.push
        //([
        //    time,
        //    scroll,
        //]);
        con.query(sql, [records], function (err, result) 
        {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
}

main();