import {prepareClientAndLogin} from "./login";
import {initListenerManager} from "./ListenerManager";
import {createLog} from "../utils";
import {initWelcomeListener} from "./WelcomeListener";
import {ClientEvents, Message} from "discord.js";
import {DiscordListener} from "./types";

interface DiscordApiManagerProps {
    discordAPIToken: string;
}

export const runDiscordApiManager = ({discordAPIToken}: DiscordApiManagerProps) => {
    const listenerManager = initListenerManager();
    listenerManager.addListener(initWelcomeListener() as DiscordListener<keyof ClientEvents>);

    const client = prepareClientAndLogin(listenerManager.getIntents(), discordAPIToken);

    listenerManager.getAllListeners().forEach(listener => {
        client.on(listener.event, listener.method);
        createLog.info(`Discord subscribed to ${listener.name}`);
    });

};