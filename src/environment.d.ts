declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_BOT_TOKEN: string;
            WELCOME_CHANNEL_NAME: string;
            NEWS_CHANNEL_NAME: string;
            CONTACT_USER_ID: string;
            MAILERLITE_API_KEY: string;
            MAILERLITE_MG_REMINDER_GROUP_NAME: string;
        }
    }
}

export {}