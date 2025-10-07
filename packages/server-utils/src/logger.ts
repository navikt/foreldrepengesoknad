import morgan from 'morgan';
import winston from 'winston';

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
    const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    return isDevelopment ? 'debug' : 'info';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

const uppercaseLevel = format((info) => {
    info.level = info.level.toUpperCase();
    return info;
});

const stdoutLogger = winston.createLogger({
    level: level(),
    levels,
    transports: [
        new winston.transports.Console({
            format: combine(timestamp(), uppercaseLevel(), json()),
        }),
    ],
});

const debug = (msg: string) => {
    stdoutLogger.debug(msg.replaceAll(/[\n\r]/g, ''));
};

const info = (msg: string) => {
    stdoutLogger.info(msg.replaceAll(/[\n\r]/g, ''));
};

const warning = (msg: string) => {
    stdoutLogger.warn(msg.replaceAll(/[\n\r]/g, ''));
};

const error = (msg: string, err?: unknown) => {
    if (err instanceof Error) {
        stdoutLogger.error(msg, { message: `: ${err.message}` });
    } else {
        stdoutLogger.error(msg, { message: `: ${err}` });
    }
};

const skip = () => process.env.NODE_ENV === 'production';

const vanligFormat = ':method :url :status :res[content-length] - :response-time ms';

const morganMiddleware = morgan(vanligFormat, {
    stream: {
        // Use the http severity
        write: (message) => stdoutLogger.http(message),
    },
    skip,
});

// eslint-disable-next-line import/no-default-export
export default {
    debug,
    info,
    warning,
    error,
    logger: stdoutLogger,
    morganMiddleware,
};
