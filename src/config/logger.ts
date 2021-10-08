import { Request, Response} from 'express';

interface LogProps {
    req?: Request;
    res?: Response;
    logType?: string;
    isRes?: boolean;
    message?: string;
}

class Logger {
    private static status_text = ', REQUEST';
    private static warn_color_code = '\x1b[33m%s\x1b[0m';
    private static error_color_code = '\x1b[31m%s\x1b[0m';
    private static message_color_code = '\x1b[34m%s\x1b[0m';

    constructor() {}

    getTimeStamp = (): string => {
        return new Date().toISOString();
    };

    log({req, res, logType, isRes = false, message = ''}: LogProps): void {
        if (isRes) {
            Logger.status_text = `, STATUS - [${res?.statusCode}]`;
        }

        switch(logType) {
            case 'i': 
                console.log(`[${this.getTimeStamp()}] [INFO], HOST-  [${req?.hostname}], METHOD - [${req?.method}], URL - [${req?.url}], IP - [${req?.socket.remoteAddress}]${Logger.status_text}`); break;
            case 'w':
                console.warn(Logger.warn_color_code, `[${this.getTimeStamp()}] [WARNING], HOST-  [${req?.hostname}] METHOD - [${req?.method}], URL - [${req?.url}], IP - [${req?.socket.remoteAddress}]${Logger.status_text}`); break;
            case 'e':
                console.error(Logger.error_color_code, `[${this.getTimeStamp()}] [ERROR], HOST-  [${req?.hostname}] METHOD - [${req?.method}], URL - [${req?.url}], IP - [${req?.socket.remoteAddress}]${Logger.status_text}`); break;
            case 'm':
                console.error(Logger.message_color_code, `[${this.getTimeStamp()}] [${message}]`); break;
            case 'h':
                console.error(Logger.error_color_code, `[${this.getTimeStamp()}] [${message}]`); break;
            default: break;
        }
    }
}

export default Logger;