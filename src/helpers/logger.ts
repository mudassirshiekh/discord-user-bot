export enum LoggerState {
    fatal,
    error,
    warn,
    info,
    debug,
    trace
}

export const logText = (msg: string, state: LoggerState = LoggerState.info) => {
    const date = new Date();
    if (process.env.SHOW_LOGS_IN_CONSOLE === "true")
        console.log(`[${date.toLocaleString()}]:[${LoggerState[state]}] ${msg}`);
};

export const logObject = (obj: object, state: LoggerState = LoggerState.info) => {
    const date = new Date();
    if (process.env.SHOW_LOGS_IN_CONSOLE === "true")
        console.log(`[${date.toLocaleString()}]:[${LoggerState[state]}] ${JSON.stringify(obj)}`);
};