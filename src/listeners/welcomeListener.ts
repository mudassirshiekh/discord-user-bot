import {GuildMember, Client, IntentsString, Message, MessageEmbed} from "discord.js";
import { findTextChennelByName } from "../helpers/findChannel";
import { EventsStrings, Listener } from "./../managers/listenersManager";
import {createLog} from "../utils/logger";

type SensitivityOptions = "NewMember" | "MessageNewMember";

export const getWelcomeListener = (sensitivity: SensitivityOptions = "MessageNewMember"): Listener => {
    const name = "WelcomeListener";
    const event: EventsStrings = sensitivity === "NewMember"? "guildMemberAdd": "messageCreate";
    const privilages: IntentsString[] = ["GUILDS", "GUILD_MEMBERS"];



    const actionForNewMember = (member: GuildMember) => {
      if (process.env.WELCOME_CHANNEL_NAME) {
        const channel = findTextChennelByName(process.env.WELCOME_CHANNEL_NAME, member.client);
        channel?.send(`Witaj <@!${member.id}>\n` +
            `Witaj w naszej społeczności. Mamy nadzieje, że materiały przez nas przygotowywane oraz wydażenia pomogą w Twoim rozwoju.\n\n` +
            `Rozgość się z ulubioną herbatą lub kawą, a na początek mam też kilka pytań na które możesz odpowiedzieć aby dać nam się lepiej poznać:\n` +
            `- Kim jesteś?\n` +
            `- Czym się interesujesz?\n` +
            `- Czym się zajmujesz?\n` +
            `- Czego chcesz się nauczyć?\n` +
            `- Jeśli masz jakieś social media lub prowadzisz jakieś inicjatywy dla IT pochwal się nimi ;)`
        );

        createLog.info("Welcome message was send.");
      }
    };

    const actionForMessageNewMember = (msg: Message) => {
        if (msg.type === "GUILD_MEMBER_JOIN" && process.env.WELCOME_CHANNEL_NAME && msg.member) {
            actionForNewMember(msg.member);
        }
    };

    const run = (client: Client) => {
        if (event === "messageCreate") {
            client.on("messageCreate", actionForMessageNewMember);
        } else {
            client.on("guildMemberAdd", actionForNewMember);
        }
    };

  return {
    name,
    event,
    privilages,
    run,
  };
};
