import { createLog } from './utils/logger';
import {getConfiguration} from "./Configuration";
import {runDiscordApiManager} from "./DiscordApiManager";

const config = getConfiguration();
createLog.trace(config);

createLog.info("Bot is starting...");
runDiscordApiManager({
    discordAPIToken: config.discordAPIToken
});