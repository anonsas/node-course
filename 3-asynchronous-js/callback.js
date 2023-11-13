const fs = require('fs');
const http = require('http');
const superagent = require('superagent');

const server = http.createServer((req, res) => {
  const baseURL = `http://${req.headers.host}`;
  const requestURL = new URL(req.url, baseURL);
  const pathName = requestURL.pathname;

  if (pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    fs.readFile(__dirname + '/dog.txt', 'utf-8', (error, data) => {
      if (error) return console.log('Error in reading the file', error.message);
      superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((error, response) => {
        if (error) return console.log('Error in fetching data', error.message);
        const imageUrl = response.body.message;
        const html = `<img src="${imageUrl}"/>`;

        fs.writeFile('dog-image-url.txt', imageUrl, (error) => {
          if (error) return console.log('Error in writing the file', error.message);
          res.end(html);
        });
      });
    });
  }
});

server.listen(4000);
