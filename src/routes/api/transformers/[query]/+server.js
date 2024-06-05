// import { pipeline, env } from '@xenova/transformers';
import Together from "together-ai";
import { TOGETHER_API_KEY } from '$env/static/private'

// env.allowLocalModels = false;
// env.allowRemoteModels = true;


export async function GET({ locals, params }) {

    try {
        const prompt = params.query;

        // const generator = await pipeline(
        //     "text2text-generation",
        //     "Xenova/LaMini-Flan-T5-783M",
        // );

        // const generatorOutput = await generator(
        //     prompt,
        //     {
        //         temperature: 2,
        //         max_new_tokens: 150,
        //         repetition_penalty: 1.5,
        //         no_repeat_ngram_size: 3,
        //         num_beams: 2,
        //         num_return_sequences: 1,
        //     },
        // );

        // const rephraseObject = {
        //     response: generatorOutput[0].generated_text
        // }

        const together = new Together({
            apiKey: TOGETHER_API_KEY,
        });

        const response = await together.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a frontend developer specialized in creating generative art, simulations, and games for artists, architects, and designers. Your expertise lies in HTML, CSS, JavaScript, and libraries such as brain.js, p5.js, and three.js. Do not write code. Provide a short and concise list detailed, step-by-step instructions to guide users through the process of developing projects in these areas.",
                }, {
                    role: "user",
                    content: prompt
                }
            ],
            model: "meta-llama/Llama-3-8b-chat-hf",
            max_tokens: 512
        });
        // console.log(response.choices[0].message.content)

        return new Response(JSON.stringify(response.choices[0].message.content))

    } catch (err) {
        console.log(err)
    }
}
