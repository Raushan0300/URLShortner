const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

require('./connection');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/', require('./routes/urlRoute'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});