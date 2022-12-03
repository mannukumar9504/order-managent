const express = require('express');
const path = require('path');
const log4js = require('log4js');
const compression = require('compression');
const cors = require('cors');
const expressSanitizer = require('express-sanitizer');

const app = express();

app.use(require('./utilities/middleware/api-response'));
require('./config/dbConnectionManger');

global.__basedir = __dirname;
// db connection
const router = express.Router();
const initiateRoutes = require('./app');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

initiateRoutes(router);
app.use('/api/v1', router);
app.use(['/api/v1'], require('./utilities/middleware/err-handler'));

log4js.configure(path.join(__dirname, './config/log-config.json'));

app.use(compression());
app.use(expressSanitizer());

module.exports = app;
