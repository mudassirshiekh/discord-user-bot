export interface Trigger {
    name: string;
    executorName: string;
    nextDateTimestamp: number;
    nextDayGenerator: () => number;
    run: () => void;
}

export interface Executor {
    name: string;
    executor: unknown;
    typeName: string;
}

export interface TriggerManager {
    registerExecutor: (executor: Executor) => void;
    registerTrigger: (trigger: Trigger) => void;
    runAll: () => void;
}

export const getTriggerManager = (): TriggerManager => {
    const executorMap: Map<string, Executor> = new Map<string,Executor>();
    const triggerMap: Map<string, Trigger> = new Map<string, Trigger>();

    const registerExecutor = (executor: Executor) => {
        executorMap.set(executor.name, executor);
    };
    const registerTrigger = (trigger: Trigger) => {
        if (executorMap.get(trigger.executorName)) {
            triggerMap.set(trigger.name, trigger);
        } else {
            throw `Executor "${trigger.executorName}" doesn't exist. You should register executor first.`;
        }
    };
    const runAll = () => {
        triggerMap.forEach(trigger => {
            trigger.run();
        });
    };
    
    return {
        registerExecutor,
        registerTrigger,
        runAll
    };
};
