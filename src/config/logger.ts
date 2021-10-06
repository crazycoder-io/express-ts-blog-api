import { Request, Response} from 'express'

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

class Logger {
    private static status_text = ', REQUEST';
    private static warn_color_code = '\x1b[33m%s\x1b[0m';
    private static error_color_code = '\x1b[31m%s\x1b[0m';

    constructor() {}

    log(req: Request, res: Response, logType: string, isRes: boolean = false): void {
        if (isRes) {
            Logger.status_text = `, STATUS - [${res.statusCode}]`;
        }

        switch(logType) {
            case 'i': 
                console.log(`[${getTimeStamp()}] [INFO], HOST-  [${req.hostname}], METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]${Logger.status_text}`); break;
            case 'w':
                console.warn(Logger.warn_color_code, `[${getTimeStamp()}] [WARNING], HOST-  [${req.hostname}] METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]${Logger.status_text}`); break;
            case 'e':
                console.error(Logger.error_color_code, `[${getTimeStamp()}] [ERROR], HOST-  [${req.hostname}] METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]${Logger.status_text}`); break;
            default: break;
        }
    }
}

export default new Logger().log;