import express from "express";
import cookieParser from "cookie-parser";
import Logger from "@config/logger";

import indexRouter from "./routes/index";
const PREFIX = process.env.APP_PREFIX || "/api/v1/";
class App {
    public app: express.Application;
    logger;

    constructor() {
        this.app = express();
        this.logger = new Logger();
        this.config();
        this.connectRoutes();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());

        this.app.use((req, res, next) => {
            this.logger.log({ req, res, logType: "i" });

            res.on("finish", () => {
                if (res.statusCode === 404) {
                    this.logger.log({ req, res, logType: "w", isRes: true });
                } else if (res.statusCode >= 500) {
                    this.logger.log({ req, res, logType: "e", isRes: true });
                } else {
                    this.logger.log({ req, res, logType: "i", isRes: true });
                }
            });

            next();
        });
    }

    private connectRoutes(): void {
        this.app.use(PREFIX, indexRouter);
    }
}

export default App;
