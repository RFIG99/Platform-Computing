const { Builder } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');

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
        metrics['Presence time (Seconds)'] = metrics['Presence time (Seconds)'] || [];
        metrics['Presence time (Seconds)'].push(presence_time);

        const scroll_height = await driver.executeScript('return document.body.scrollHeight');
        const current_scroll = await driver.executeScript('return window.pageYOffset');
        console.log(`Scrolled ${current_scroll}/${scroll_height} pixels`);
        metrics['Scrolling (PIxels)'] = metrics['Scrolling (PIxels)'] || [];
        metrics['Scrolling (PIxels)'].push(current_scroll / scroll_height);

        count += 1;
        await driver.sleep(2000);
    }

    await driver.quit();
    console.log(metrics);
    await writeToCSV('metrics.csv', metrics);
    
    /*
    var mysql = require('mysql');

    var con = mysql.createConnection(
        {
         host: "localhost",
         user: "root",
         password: "Password12345",
         database: "assighment3"
        });

    
    con.connect(function(err) 
    {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO customers (Presence time (Seconds), Scrolling (PIxels)) VALUES ('Company Inc', 'Highway 37')";
        con.query(sql, function (err, result) 
        {
          if (err) throw err;
          console.log("1 record inserted");
        });
      });
      */
}

main();