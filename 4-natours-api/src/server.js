const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: '.env.development' });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server has start running on PORT ${PORT}`);
});
