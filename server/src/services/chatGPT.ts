import OpenAI from 'openai';
import { getConfig } from './config';

const backupOpenai = new OpenAI({
    apiKey: getConfig().backupChatGPTApiKey,
});

const openai = new OpenAI({
    apiKey: getConfig().chatGPTApiKey,
});

export const sendMessageToGPT = ({ prompt, retry }: { prompt: string; retry?: boolean }) => {
    if (retry) {
        return backupOpenai.chat.completions.create({
            model: 'gpt-4o-mini',
            store: true,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });
    } else {
        return openai.chat.completions.create({
            model: 'gpt-4o-mini',
            store: true,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });
    }
};
