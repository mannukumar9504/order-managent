require('dotenv').config();
const https = require('https');
const fs = require('fs');
const app = require('./main-api');

const key = fs.readFileSync('./ssl/localhost.key');
const cert = fs.readFileSync('./ssl/localhost.crt');

const port = process.env.PORT;

const db = require('./DB/models');

const server = https.createServer({ key, cert }, app);

// eslint-disable-next-line no-unused-vars
db.sequelize.sync().then((req) => {
    server.listen(port, () => { // listening
        console.log(`server runs at port: ${port}`);
    });
});
