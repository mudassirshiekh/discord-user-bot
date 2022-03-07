import { getMailingManager } from "../managers/mailingManager";
import { Executor } from "../managers/triggerManager";

export const getMailingExecutor = (): Executor => {
    const name = "MailingExecutor";
    const executor = getMailingManager();
    const typeName = typeof executor;
    
    return {
        name,
        executor,
        typeName
    };
};