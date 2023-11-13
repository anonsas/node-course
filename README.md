api - a service from which we can request a data.

Creating a Promise (Producing code):

```javascript
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + file, 'utf-8', (error, data) => {
      if (error) reject('Did not find a file to read'); // available in .catch(error)
      resolve(data); // available in .then(data)
    });
  });
};
```

Consuming a Promise (Consuming code) with .then().catch().finally():

```javascript
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
```

Inline:

```javascript
Promise.resolve('Success').then((data) => res.end(data));
Promise.reject('Error').catch((error) => res.end(error));
```

"async and await make promises easier to write"
async makes a function return a Promise
await makes a function wait for a Promise
