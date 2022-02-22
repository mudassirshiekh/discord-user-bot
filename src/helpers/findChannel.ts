import { AnyChannel, Client, VoiceChannel, TextChannel, ThreadChannel } from 'discord.js';

export const findAnyChannelByName = (channelName: string, client: Client): AnyChannel | undefined => {
    let result: AnyChannel | undefined = undefined;
    client.channels.cache.forEach(ch => {
        if (!result && ch && ch.isText() && (ch as TextChannel).name === channelName) {
            result = ch;
        } else if (!result && ch && ch.isThread() && (ch as ThreadChannel).name === channelName) {
            result = ch;
        } else if (!result && ch && ch.isVoice() && (ch as VoiceChannel).name === channelName) {
            result = ch;
        }
    });

    return result;
};

export const findAnyChannelById = (id: string, client: Client): AnyChannel | undefined => {
    return client.channels.cache.get(id);
};

export const findTextChennelByName = (channelName: string, client: Client): TextChannel | undefined => {
    const channel = findAnyChannelByName(channelName, client);

    return channel && channel.isText()? channel as TextChannel : undefined;
};
