import { BitFieldResolvable, Client, IntentsString } from "discord.js";

export interface IDiscordManager {
    login: () => void;
}

export const DiscordManager = (): IDiscordManager => {
    const intents: BitFieldResolvable<IntentsString, number> = 0;
    const client = new Client({intents});
    
    const login = (): void => {
        client.login(process.env.DISCORD_BOT_TOKEN);
    };

    return {
        login
    }
};