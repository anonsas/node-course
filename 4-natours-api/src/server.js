require('dotenv').config({ path: '.env.development' });
const app = require('./index');

console.log('environment', process.env.NODE_ENV);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server has start running on PORT ${PORT}`);
});
