import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '',
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
