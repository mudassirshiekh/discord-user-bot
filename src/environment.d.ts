declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_BOT_TOKEN: string;
            WELCOME_CHANNEL_NAME: string;
            SHOW_LOGS_IN_CONSOLE: "true" | "false";
        }
    }
}

export {}