import express from 'express';
import cookieParser from 'cookie-parser';
import logger from './config/logger';

const app: express.Application = express();

import indexRouter from './routes/index';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    logger(req, res, 'i');

    res.on('finish', () => {
        if (res.statusCode === 404) {
            logger(req, res, 'w', true);
        } else if (res.statusCode >= 500) {
            logger(req, res, 'e', true);
        } else {
            logger(req, res, 'i', true);
        }
    });

    next();
});
app.use('/', indexRouter);

module.exports = app;
