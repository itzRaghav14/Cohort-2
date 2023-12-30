const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
const db = require('./config/mongoose');

app.use(bodyParser.json());
app.use('/', require('./routes'));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
