import { Client } from "discord.js";
import { Executor } from "../managers/triggerManager";

export const getDiscordClientExecutors = (discordClient: Client): Executor => {
    const name = "DiscordClient";
    const executor = discordClient;
    const typeName = typeof discordClient;
    
    return {
        name,
        executor,
        typeName
    };
};