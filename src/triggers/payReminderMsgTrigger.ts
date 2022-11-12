import { replaceParams } from './../helpers/replaceParams';
import { loadFile } from './../helpers/loadFile';
import { Executor } from './../managers/triggerManager';
import { Trigger } from "../managers/triggerManager";
import { Client } from 'discord.js';
import { findTextChennelByName } from '../helpers/findChannel';
import schedule from "node-schedule";
import { AssetPathMap } from '../consts/assetPathMap';
import { preparePayReminderParams } from '../helpers/payReminderHelpers';
import { createLog } from '../helpers/logger';

export const getPayReminderMsgTrigger = (): Trigger => {
    const name = "PayReminderMsg";
    const executorName = "DiscordClient";
    const nextDate = process.env.PAY_REMINDER_SCHEDULE || "0 10 5 * *";
    let discordClient: Client;

    const method = () => {
        loadFile(AssetPathMap.payReminderMessageTxt).then(file => {
            if (!discordClient) {
                throw `Not found DiscordClient in "${name}"`;
            }
            if (!process.env.NEWS_CHANNEL_NAME) {
                throw "You don't have value for NEWS_CHANNEL_NAME in your enviroments.";
            }
    
            const generalChannel = findTextChennelByName(process.env.NEWS_CHANNEL_NAME, discordClient);
            if (generalChannel) {
                const content = replaceParams(file, preparePayReminderParams());
                generalChannel.send(content);

                createLog.info("Message with payment reminder was send via discord.");
            } else {
                throw `"${process.env.NEWS_CHANNEL_NAME}" channel not found.`;
            }
        }).catch(err => {
            createLog.error(err);
        });
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
