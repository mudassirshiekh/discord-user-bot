import {ClientEvents, ClientOptions} from "discord.js";
import {DiscordListener} from "../types";

export const getAllIntents = (listeners: DiscordListener<keyof ClientEvents>[]): ClientOptions['intents'] => {
    const result: string[] = [];
    listeners.forEach(listener => {
        (listener.intents as string[]).forEach(intent => {
            if (!result.find(p => p === intent)) {
                result.push(intent);
            }
        });
    });

    return (result as ClientOptions['intents']);
};