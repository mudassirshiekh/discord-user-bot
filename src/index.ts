import { createLog } from './helpers/logger';
import { getWaveHelloListener } from './listeners/waveHelloListener';
import { getWelcomeListener } from './listeners/welcomeListener';
import { getDiscordManager } from './managers/discordManager';
import { getListenerManager } from './managers/listenersManager';

require('dotenv').config();

createLog.info("Bot is starting...");
const listenerManager = getListenerManager();
listenerManager.registerListener(getWelcomeListener());
listenerManager.registerListener(getWaveHelloListener());

const discordManager = getDiscordManager(listenerManager);
discordManager.login();