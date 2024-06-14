import morgan from 'morgan';
import winston from 'winston';

import config from './config.js';

const { format } = winston;
const { combine, json, timestamp } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    return config.app.env === 'dev' ? 'debug' : 'info';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

const stdoutLogger = winston.createLogger({
    level: level(),
    levels,
    transports: [
        new winston.transports.Console({
            format: combine(timestamp(), json()),
        }),
    ],
});

const debug = (msg: any) => {
    stdoutLogger.debug(msg.replace(/[\n\r]/g, ''));
};

const info = (msg: any) => {
    stdoutLogger.info(msg.replace(/[\n\r]/g, ''));
};

const warning = (msg: any) => {
    stdoutLogger.warn(msg.replace(/[\n\r]/g, ''));
};

const error = (msg: any, err: any) => {
    if (err) {
        stdoutLogger.error(msg, { message: `: ${err.message}` });
    } else {
        stdoutLogger.error(msg, { message: `: ${err}` });
    }
};

const stream = {
    // Use the http severity
    write: (message: any) => stdoutLogger.http(message),
};

const vanligFormat = ':method :url :status :res[content-length] - :response-time ms';

const morganMiddleware = morgan(vanligFormat, { stream });

export default {
    debug,
    info,
    warning,
    error,
    logger: stdoutLogger,
    morganMiddleware,
};
