"use strict";

const mongoose = require("mongoose"); // Mongoose module
import Logger from "@config/logger";
// eslint-disable-next-line import/no-extraneous-dependencies
// const { MongoMemoryServer } = require("mongodb-memory-server");

export class Database {
    dbString: string;
    dbOptions;
    server: any;
    logger;

    constructor(dbString = process.env.DB_STRING) {
        this.dbString = dbString!;
        this.dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        this.logger = new Logger();
    }

    connectDB = () => new Promise((resolve, reject) => {
        mongoose.connect(this.dbString || "mongodb://127.0.0.1:27017/blog-api", this.dbOptions); // Connect to the db
    
        mongoose.connection.on("open", () => {
            // Connection is successful
            this.logger.log({ logType: 'm', message: "MongoDB Connection is Successful 🏎" });
            resolve(true);
        });
        mongoose.connection.on("error", (err: any) => {
            // Connection is unsuccessful
            this.logger.log({ logType: 'h', message:  "😱 MongoDB Error: " + err });
            reject(false);
        });
    
        mongoose.Promise = global.Promise;
    });

    // createDB = async () => {
        //     try {
        //         server = await MongoMemoryServer.create();
        //         const url = `${server.getUri()}perfanalytics_test`;
        //         await mongoose.connect(url);
        //     } catch (err) {
        //         console.log(err);
        //         throw err;
        //     }
        // };

        // destroyDatabase = async () => {
        //     await mongoose.connection.dropDatabase();
        //     await mongoose.connection.db.collections();
        //     await mongoose.connection.close();
        //     await server.stop();
        // };
}