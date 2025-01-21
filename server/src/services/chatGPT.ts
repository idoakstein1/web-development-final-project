import OpenAI from 'openai';
import { getConfig } from './config';

const openai = new OpenAI({
    apiKey: getConfig().chatGPTApiKey,
});

export const sendMessageToGPT = (prompt: string) => {
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
};
