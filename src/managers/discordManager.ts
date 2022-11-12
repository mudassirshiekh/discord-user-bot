import { createLog } from './../helpers/logger';
import { ListenerManager } from './listenersManager';
import { BitFieldResolvable, Client, IntentsString } from "discord.js";

export interface DiscordManager {
    login: () => void;
    getDiscordClient: () => Client;
}

export const getDiscordManager = (listenerManager: ListenerManager): DiscordManager => {
    const intents: BitFieldResolvable<IntentsString, number> = listenerManager.getAllIntents();

    const client = new Client({intents});
    listenerManager.runAll(client);

    const onReadyClient = () => {
        createLog.info("Discord client is ready.");
    }

    client.on("ready", onReadyClient);
    
    const login = (): void => {
        createLog.info("Bot is logging to discord...")
        client.login(process.env.DISCORD_BOT_TOKEN);
    };

    const getDiscordClient = (): Client => {
        return client;
    }

    return {
        login,
        getDiscordClient,
    };
};