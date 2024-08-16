import path from "node:path";
import * as fs from "node:fs";

import {Configuration} from "./types";

import {createLog} from "../utils/logger";

const tryReadEnvFile = () => {
    const envFilePath = path.resolve(process.cwd(), ".env");

    if (fs.existsSync(envFilePath)) {
        createLog.info('Loading data from ".env" file.');
        require("dotenv").config({path: envFilePath});
    } else {
        createLog.warn('".env" file not found, bot will working without it.')
    }
};

export const getConfiguration = (): Configuration => {
    tryReadEnvFile();
    createLog.info("Preparing configuration object...");

    return {
        discordAPIToken: process.env.DISCORD_TOKEN || "",
        welcomeChannelName: process.env.WELCOME_CHANNEL_NAME || "",
    };
};
