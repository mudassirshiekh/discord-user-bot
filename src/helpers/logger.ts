export const logText = (msg: string) => {
    const date = new Date();
    if (process.env.SHOW_LOGS_IN_CONSOLE === "true")
        console.log(`[${date.toLocaleString()}]: ${msg}`);
};

export const logObject = (obj: object) => {
    const date = new Date();
    if (process.env.SHOW_LOGS_IN_CONSOLE === "true")
        console.log(`[${date.toLocaleString()}]: ${JSON.stringify(obj)}`);
};