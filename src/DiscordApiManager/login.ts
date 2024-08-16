import {Client, ClientOptions, Events} from "discord.js";
import {createLog} from "../utils";

export const prepareClientAndLogin = (intents: ClientOptions['intents'], discordToken: string): Client<boolean> => {
    const client = new Client({ intents: intents});

    client.once(Events.ClientReady, readyClient => {
        createLog.info(`Discord ready! Logged in as ${readyClient.user.tag}`);
    });

    client.login(discordToken);

    return client;
};
