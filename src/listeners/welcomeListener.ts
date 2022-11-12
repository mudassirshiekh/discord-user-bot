import { GuildMember, Client, IntentsString } from "discord.js";
import { findTextChennelByName } from "../helpers/findChannel";
import { EventsStrings, Listener } from "./../managers/listenersManager";
import {createLog} from "../helpers/logger";

export const getWelcomeListener = (): Listener => {
    const name = "WelcomeListener";
    const event: EventsStrings = "guildMemberAdd";
    const privilages: IntentsString[] = ["GUILDS", "GUILD_MEMBERS"];

    const method = (member: GuildMember) => {
      if (process.env.WELCOME_CHANNEL_NAME) {
        const channel = findTextChennelByName(process.env.WELCOME_CHANNEL_NAME, member.client);
        channel?.send(`Witaj <@!${member.id}>\n` +
            `Witaj w naszej społeczności. Mamy nadzieje, że materiały przez nas przygotowywane oraz spotkania pomogą w Twoim rozwoju.\n\n` +
            `Rozgość się z ulubioną herbatą lub kawą, a na początek mam też kilka pytań na które możesz odpowiedzieć aby dać nam się lepiej poznać:\n` +
            `- Kim jesteś?\n` +
            `- Czym się interesujesz?\n` +
            `- Czym się zajmujesz?\n` +
            `- Czego chcesz się nauczyć?\n` +
            `- Jakie tematy chciał byś poruszyć na spotkaniach?\n`
        );

        createLog.info("Welcome message was send.");
      }
    };

    const run = (client: Client) => {
        client.on(event, method)
    };

  return {
    name,
    event,
    privilages,
    run,
  };
};
