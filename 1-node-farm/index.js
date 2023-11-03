const fs = require('fs');
const http = require('http');
const x = require('./modules/replaceTemplate');
const slugify = require('slugify');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const overviewTemplate = fs.readFileSync(__dirname + '/templates/overview.html', 'utf-8');
const productTemplate = fs.readFileSync(__dirname + '/templates/product.html', 'utf-8');
const cardTemplate = fs.readFileSync(__dirname + '/templates/card.html', 'utf-8');

const server = http.createServer((req, res) => {
  const baseURL = `http://${req.headers.host}`;
  const requestURL = new URL(req.url, baseURL);
  const pathName = requestURL.pathname;
  const query = requestURL.searchParams.get('id');

  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHTML = dataObj.map((product) => x.replaceTemplate(cardTemplate, product)).join('');
    const output = overviewTemplate.replace('{%PRODUCT_CARDS%}', cardsHTML);
    res.end(output);
  } else if (pathName === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const productById = dataObj.find((product) => slugify(product.productName, { lower: true }) === query);
    const cardsHTML = x.replaceTemplate(productTemplate, productById);
    res.end(cardsHTML);
  } else {
    res.end('Lost in Routes');
  }
});

server.listen(4000, () => {
  console.log('Server has started!');
});
