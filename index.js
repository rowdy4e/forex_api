const express = require('express');
const checkToken = require('./middleware');
const { scrapeForexFactory } = require('./scrapers');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/scrape/forexfactory', checkToken, async (req, res) => {
    const body = await scrapeForexFactory();

    res.status(200).json(body);
});

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});