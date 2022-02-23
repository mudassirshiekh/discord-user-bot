import { ListenerManager } from './listenersManager';
import { BitFieldResolvable, Client, Intents, IntentsString } from "discord.js";
import { logText } from '../helpers/logger';

export interface DiscordManager {
    login: () => void;
}

export const getDiscordManager = (listenerManager: ListenerManager): DiscordManager => {
    const intents: BitFieldResolvable<IntentsString, number> = listenerManager.getAllIntents();

    const client = new Client({intents});
    listenerManager.runAll(client);

    const onReadyClient = () => {
        logText("Discord client is ready.");
    }

    client.on("ready", onReadyClient);
    
    const login = (): void => {
        client.login(process.env.DISCORD_BOT_TOKEN);
    };

    return {
        login
    }
};