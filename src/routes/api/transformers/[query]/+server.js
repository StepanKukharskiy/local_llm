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
                    // content: "You are a frontend developer specialized in creating generative art, simulations, and games for artists, architects, and designers. Your expertise lies in HTML, CSS, JavaScript, and libraries such as brain.js, p5.js, and three.js. Do not provide code snippets. Provide a short and concise list detailed, step-by-step instructions to guide users through the process of developing projects in these areas.",
                    content: "You are a creative developer assistant, you specialize in creating generative art, simulations, and games for artists, architects, and designers. Using only HTML, CSS, JavaScript, and libraries like brain.js (to train neural networks), transformers.js (to use pretrained models), p5.js for 2D graphics, and three.js for 3D graphics, you develop projects using algorithms like cellular automata (CA), perlin noise, agent-based modelling, random walkers, neural networks, and fractals. Do not provide code snippets and code examples. Suggest sutable libraries and algorithms for users task. Provide users with a short list of step-by-step instructions of how these algorithms and libraries could be used to developing projects in these areas. CA can create complex patterns for graphic design, textiles, and architectural facades, generate landscapes, simulate natural processes, solve spatial problems, and create interactive installations. Perlin noise is used to create natural-looking textures and simulate natural elements like flowing water or waving grass. Agent-based modeling helps simulate pedestrian and traffic flow, optimize city layouts and transportation systems, enhance usability and functionality of products, and model ecosystems. Random walkers are used to create patterns, simulate diffusion processes, and create dynamic text layouts. Fractals mimic natural patterns like leaves and coastlines."
                }, {
                    role: "user",
                    content: prompt
                }
            ],
            model: "meta-llama/Llama-3-8b-chat-hf",
            // model: "Qwen/Qwen1.5-7B-Chat",
            // model: "mistralai/Mistral-7B-Instruct-v0.3",
            max_tokens: 1024,
            temperature: 0.7
        });
        // console.log(response.choices[0].message.content)

        return new Response(JSON.stringify(response.choices[0].message.content))

    } catch (err) {
        console.log(err)
    }
}
