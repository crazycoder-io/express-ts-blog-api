import { Request, Response} from 'express'

const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const logger = (req: Request, res: Response, logType: string, isRes: boolean = false): void => {

    // Logger function
    let 
        status_text = ', REQUEST', 
        warn_color_code = '\x1b[33m%s\x1b[0m',
        error_color_code = '\x1b[31m%s\x1b[0m';

    if (isRes) {
        status_text = `, STATUS - [${res.statusCode}]`;
    }

    switch(logType) {
        case 'i': 
            console.log(`[${getTimeStamp()}] [INFO], HOST-  [${req.hostname}], METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]${status_text}`); break;
        case 'w':
            console.warn(warn_color_code, `[${getTimeStamp()}] [WARNING], HOST-  [${req.hostname}] METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]${status_text}`); break;
        case 'e':
            console.error(error_color_code, `[${getTimeStamp()}] [ERROR], HOST-  [${req.hostname}] METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]${status_text}`); break;
        default: break;
    }
};

export default logger;