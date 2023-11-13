const fs = require('fs');
const http = require('http');
const superagent = require('superagent');

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + file, 'utf-8', (error, data) => {
      if (error) reject('Did not find a file to read'); // available in .catch(error)
      resolve(data); // available in .then(data)
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + file, data, 'utf-8', (error) => {
      if (error) reject('Did not find a file to write');
      resolve(data);
    });
  });
};

const server = http.createServer((req, res) => {
  const baseURL = `http://${req.headers.host}`;
  const requestURL = new URL(req.url, baseURL);
  const pathName = requestURL.pathname;

  if (pathName === '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    readFilePromise('/dog.txt')
      .then((data) => superagent.get(`https://dog.ceo/api/breed/${data}/images/random`))
      .then((data) => writeFilePromise('/dog-image-url.txt', data.body.message))
      .then((data) => {
        const html = `<img src="${data}"/>`;
        res.end(html);
      })
      .catch((error) => {
        console.log('Something went wrong:', error);
      });
  }
});

server.listen(4000);
