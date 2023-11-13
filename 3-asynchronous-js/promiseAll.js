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
    const consumePromise = async () => {
      try {
        const dogBreed = await readFilePromise('/dog.txt');
        const dogImageUrl1 = superagent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
        const dogImageUrl2 = superagent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);
        const dogImageUrl3 = superagent.get(`https://dog.ceo/api/breed/${dogBreed}/images/random`);

        const all = await Promise.all([dogImageUrl1, dogImageUrl2, dogImageUrl3]);
        const imagesUrls = all.map((el) => el.body.message);

        await writeFilePromise('/dog-image-url.txt', imagesUrls.join('\n'));

        let html = ``;
        imagesUrls.forEach((el) => (html += `<img src="${el}" height="200px" width="200px" />`));
        res.end(html);
      } catch (error) {
        console.log('Error is catched:', error);
      }

      return '2: Ready 🐶';
    };

    (async () => {
      try {
        console.log('1: Trying to get dog pictures');
        const response = await consumePromise();
        console.log(response);
        console.log('3: Finished the job');
      } catch (error) {
        console.log('Error 💥');
      }
    })();
  }
});

server.listen(4000);
