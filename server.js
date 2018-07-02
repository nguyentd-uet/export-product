const express = require('express')
const app = express()
const puppeteer = require('puppeteer');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.get('/postlink', async (req, res) => {
    try {
        const browser = await puppeteer.launch({timeout: 0});
        const page = await browser.newPage();
        await page.goto(req.query.link);
        const data = await page.evaluate(() => meta);
        
        await browser.close();
        return res.send({data: data});
    } catch (err) {
        console.error(err);
    }
    
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
