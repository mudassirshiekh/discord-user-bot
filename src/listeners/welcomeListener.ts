import { GuildMember, Awaitable, ClientEvents, Client, IntentsString } from "discord.js";
import { findTextChennelByName } from "../helpers/findChannel";
import { EventsStrings, Listener } from "./../managers/listenersManager";

export const getWelcomeListener = (): Listener => {
    const name = "WelcomeListener";
    const event: EventsStrings = "guildMemberAdd";
    const privilages: IntentsString[] = ["GUILD_MEMBERS"];

    const method = (member: GuildMember) => {
        // TODO
        // Przenieść "powitalnia" do dotenv
        const channel = findTextChennelByName("powitalnia", member.client);
        channel?.send(`Witaj <@!${member.id}>\n` +
            `Witaj w naszej społeczności. Mamy nadzieje, że materiały przez nas przygotowywane oraz spotkania pomogą w Twoim rozwoju.\n\n` +
            `Rozgość się z ulubioną herbatą lub kawą, a na początek mam też kilka pytań na które możesz odpowiedzieć aby dać nam się lepiej poznać:\n` +
            `- Kim jesteś?\n` +
            `- Czym się interesujesz?\n` +
            `- Czym się zajmujesz?\n` +
            `- Czego chcesz się nauczyć?\n` +
            `- Jakie tematy chciał byś poruszyć na spotkaniach?\n`
        );
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
