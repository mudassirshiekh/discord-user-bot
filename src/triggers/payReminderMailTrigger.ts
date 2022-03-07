import { Executor, Trigger } from "../managers/triggerManager";
import schedule from "node-schedule";
import { MailingManager } from "../managers/mailingManager";

export const getPayReminderMailTrigger = (): Trigger => {
    const name = "PayReminderMsg";
    const executorName = "MailingExecutor";
    const nextDate = "00 10 5 * *";
    let mailingManager: MailingManager;

    const method = () => {
        if (!mailingManager) {
            throw `Not found MailingManager in "${name}"`;
        }
        if (!process.env.MAILERLITE_MG_REMINDER_GROUP_NAME) {
            throw `Not found value for "MAILERLITE_MG_REMINDER_GROUP_NAME" enviroment.`
        }
        
        mailingManager.sendPayReminderMail(process.env.MAILERLITE_MG_REMINDER_GROUP_NAME);
    };
    
    const run = (executor: Executor) => {
        if (executor.name !== executorName) {
            throw `Trigger "${name}" can't be run by "${executor.name}" executor.`;
        }
        mailingManager = executor.executor as MailingManager;
        schedule.scheduleJob(nextDate, () => {
            method();
        });
    };
    
    return {
        name,
        executorName,
        nextDate,
        run,
    };
};