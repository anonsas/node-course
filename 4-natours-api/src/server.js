const app = require('./index');

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server has start running on PORT ${PORT}`);
});
