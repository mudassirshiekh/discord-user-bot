import { Executor } from './../managers/triggerManager';
import { Trigger } from "../managers/triggerManager";
import { Client } from 'discord.js';
import { findTextChennelByName } from '../helpers/findChannel';
import schedule from "node-schedule";
import { MonthEnum } from '../consts/monthEnum';

export const getPayReminderMsgTrigger = (): Trigger => {
    const name = "PayReminderMsg";
    const executorName = "DiscordClient";
    const nextDate = "00 10 5 * *";
    let discordClient: Client;

    const method = () => {
        if (!discordClient) {
            throw `Not found DiscordClient in "${name}"`;
        }
        if (!process.env.NEWS_CHANNEL_NAME) {
            throw "You don't have value for NEWS_CHANNEL_NAME in your enviroments.";
        }

        const generalChannel = findTextChennelByName(process.env.NEWS_CHANNEL_NAME, discordClient);
        if (generalChannel) {
            const nextPaymentTime = new Date();
            nextPaymentTime.setDate(10);
            generalChannel.send(`Cześć @everyone @here, chciałem przypomnieć iż do ${nextPaymentTime.toLocaleDateString()} jest termin wpłat składki za ${MonthEnum[(nextPaymentTime.getMonth()) % 12]}. ` +
            `Osoby które do tego czasu nie wpłacą pieniędzy utracą swój dostęp i posiadaną zniżkę.\n\n` +
            `Link do płatności: https://zrzutka.pl/3ejjf8 \n\n` +
            `W przypadku jakiś problemów z płatnością zapraszam do kontaktu na priv z ${process.env.CONTACT_USER_ID ? `<@!${[process.env.CONTACT_USER_ID]}>` : "Ugz'em"}`);
        } else {
            throw `"${process.env.NEWS_CHANNEL_NAME}" channel not found.`;
        }
    }

    const run = (executor: Executor) => {
        if (executor.name !== executorName) {
            throw `Trigger "${name}" can't be run by "${executor.name}" executor.`;
        }
        discordClient = executor.executor as Client;
        schedule.scheduleJob(nextDate, () => {
            method();
        });
    };

    return {
        name,
        executorName,
        nextDate,
        run
    };
};
