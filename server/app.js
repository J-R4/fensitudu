if (process.env.NODE_ENV === `development`) {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const router = require('./routes/index.js');

const errHandler = require('./middlewares/errHandler.js');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use(errHandler);

app.listen(port, (_) => {
    console.log(`app is listening on http://localhost:${port}`);
});
