import { getDiscordManager } from './managers/discordManager';
import { getListenerManager } from './managers/listenersManager';

require('dotenv').config();

console.log("Bot is starting...");
const listenerManager = getListenerManager();

const discordManager = getDiscordManager(listenerManager);
discordManager.login();