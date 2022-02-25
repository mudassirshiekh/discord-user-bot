declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_BOT_TOKEN: string;
            WELCOME_CHANNEL_NAME: string;
        }
    }
}

export {}