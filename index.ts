"use strict";

import "tsconfig-paths/register"; // For alias import

import App from "./src/app"; // new server
const  { Database } = require("./src/config/database");
import Logger from "./src/config/logger";
require("dotenv").config(); // ENV config

const PORT = process.env.PORT || 5000;

(() => {
    const logger = new Logger();
    const database = new Database();
    
    database.connectDB()
        .then((dbStatus: boolean) => {
            const app = new App().app; // create new server

            // If db connected successfully start server
            if (dbStatus) {
                app.listen(PORT, () => {
                    logger.log({logType: 'm', message: `Server has started on ${PORT} PORT 🚀`});
                });
            }
        });
})();
