import {ClientEvents, ClientOptions} from "discord.js";

export interface DiscordListener<Event extends keyof ClientEvents> {
    name: string;
    intents: ClientOptions['intents'];
    event: Event;
    method: (...args: ClientEvents[Event]) => void;
}
