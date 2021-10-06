import express from 'express';
import cookieParser from 'cookie-parser';
import logger from './config/logger';

import indexRouter from './routes/index';
class App {
    public app: express.Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.connectRoutes();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());

        this.app.use((req, res, next) => {
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
    }

    private connectRoutes(): void {
        this.app.use('/', indexRouter);
    }
}

module.exports = new App().app;
