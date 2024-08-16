import logger from "pino";
import "pino-pretty";

export const createLog = logger({
    level: process.env.LOG_LEVEL || 'debug',
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            ignore: "hostname,pid",
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l"
        }
    }
});
