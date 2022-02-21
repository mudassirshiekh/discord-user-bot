declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_BOT_TOKEN: string;
            PERMISSIONS_INTEGER: number;
        }
    }
}

export {}