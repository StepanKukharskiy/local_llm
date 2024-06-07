import Together from "together-ai";
import { TOGETHER_API_KEY } from '$env/static/private'


export async function GET({ locals, params }) {

    try {
        const prompt = params.query;

        const together = new Together({
            apiKey: TOGETHER_API_KEY,
        });

        const response = await together.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a frontend developer specialized in creating generative art, simulations, and games for artists, architects, and designers. Your expertise lies in HTML, CSS, JavaScript, and libraries such as brain.js, p5.js, and three.js. Do not provide code snippets. Provide a short and concise list detailed, step-by-step instructions to guide users through the process of developing projects in these areas.",
                }, {
                    role: "user",
                    content: prompt
                }
            ],
            model: "meta-llama/Llama-3-8b-chat-hf",
            // model: "mistralai/Mistral-7B-Instruct-v0.1",
            max_tokens: 512
        });
        // console.log(response.choices[0].message.content)

        return new Response(JSON.stringify(response.choices[0].message.content))

    } catch (err) {
        console.log(err)
    }
}
