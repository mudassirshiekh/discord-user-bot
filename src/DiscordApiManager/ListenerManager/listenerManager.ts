import {ClientEvents, ClientOptions} from "discord.js";
import {getAllIntents} from "./utils";
import {DiscordListener} from "../";

export const initListenerManager = () => {
    const listeners: DiscordListener<keyof ClientEvents>[] = [];

    return {
        addListener: (listener: DiscordListener<keyof ClientEvents>) => {
            listeners.push(listener);
        },
        getAllListeners: (): DiscordListener<keyof ClientEvents>[] => {
            return listeners;
        },
        getIntents: (): ClientOptions['intents'] => {
            return getAllIntents(listeners);
        },
    };
};