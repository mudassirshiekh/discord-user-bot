import {DiscordListener} from "../types";
import {Message, MessageType} from "discord.js";
import {createLog} from "../../utils";
import {getRandomItemFromArray} from "./utils";
import {WELCOME_MESSAGES, WelcomeMessagesParams} from "./data";

export const initWelcomeListener = (): DiscordListener<'messageCreate'> => {
    return {
        name: "WelcomeListener",
        event: "messageCreate",
        method: (message: Message) => {
            try {
                if (message.type === MessageType.UserJoin) {
                    let replyContent = getRandomItemFromArray(WELCOME_MESSAGES);
                    replyContent = replyContent.replace(WelcomeMessagesParams.userName, message.author.toString());
                    message.reply(replyContent);

                    createLog.info("Welcome message was send.");
                }
            } catch (e) {
                createLog.error(e);
            }
        },
        intents: ['Guilds', 'GuildMessages']
    }
};