import { TogetherLLM, TogetherEmbedding, Document, VectorStoreIndex, Settings, ResponseSynthesizer, CompactAndRefine } from "llamaindex";
import { TOGETHER_API_KEY } from '$env/static/private'

Settings.embedModel = new TogetherEmbedding({
    apiKey: TOGETHER_API_KEY,
});

Settings.llm = new TogetherLLM({
    apiKey: TOGETHER_API_KEY,
    model: "meta-llama/Llama-3-8b-chat-hf",
});

const data = `Cellular Automata (CA) can create complex, visually appealing patterns that can be used in graphic design, textiles, and architectural facades. In game design and digital art, CA can generate landscapes, textures, and other elements procedurally, reducing the need for manual design. CA can simulate natural processes like the growth of plants, the spread of fire, or urban development, aiding in the design of more realistic environments. CA can be used in design optimization problems, such as finding efficient layouts or solving spatial problems. CA can be used to create interactive installations where the design evolves based on user input or environmental factors. By leveraging the emergent behavior of cellular automata, designers can explore new forms and functionalities that are difficult to achieve through traditional methods.
Perlin noise is a gradient noise function used in various design and computer graphics applications. Creating natural-looking textures such as wood grain, marble, clouds, and terrain. Generating landscapes, terrains, and other environmental features in games and simulations. Adding natural, organic motion to animations, such as flowing water or waving grass.
Agentbased modeling (ABM) is a computational modeling approach that simulates the interactions of autonomous agents to assess their effects on the system as a whole. In design, ABM can be used for Simulating pedestrian and traffic flow to optimize city layouts and transportation systems. Analyzing how people use and move through spaces to improve building designs. Understanding consumer behavior and interaction with products to enhance usability and functionality. Studying social dynamics and crowd behavior to design better public spaces and services.Modeling ecosystems to create sustainable and resilient environments.
Random walkers, or random walks, are a concept from mathematics and computer science that can be applied in various design contexts. Random walks can create intricate and unique patterns, textures, and visual effects. Artists and designers use algorithms based on random walks to generate abstract art. In game design and virtual environments, random walks can generate natural-looking terrains, paths, and structures. Random walks can simulate diffusion processes, such as the spread of particles, which can be useful in visual effects and animations. Random walks can help visualize complex data sets, showing trends and patterns that might not be immediately obvious.
Random walks can be used to create dynamic and non-linear text layouts, adding an element of unpredictability and interest to the design. In interactive media, random walks can drive the behavior of elements in response to user input, creating engaging and unpredictable experiences.By leveraging the inherent unpredictability of random walks, designers can introduce elements of surprise and complexity into their work, making it more engaging and visually interesting.
Fractals are complex geometric shapes that can be split into parts, each of which is a reduced-scale copy of the whole. Fractals create intricate and aesthetically pleasing patterns that can enhance the visual appeal of designs. Fractals mimic natural patterns (e.g., leaves, snowflakes, coastlines), making them ideal for creating organic and natural-looking designs. They add texture and detail to surfaces, making them appear more complex and interesting. Fractals are used in generative art, where algorithms create unique and complex designs. Fractal geometry can be used in architecture to create innovative and efficient structures.`

export async function GET({ params }) {
    const document = new Document({ text: data, id_: "data" });
    const query = params.query



    try {
        // Define a system prompt
        const newTextQaPrompt = ({ context = '', query = '' }) => {
            return `You are a creative developer assistant, you specialize in creating generative art, simulations, and games for artists, architects, and designers. Using only HTML, CSS, JavaScript, and libraries like brain.js (to train neural networks), transformers.js (to use pretrained models), p5.js for 2D graphics, and three.js for 3D graphics, you develop projects using algorithms like cellular automata (CA), perlin noise, agent-based modelling, random walkers, neural networks, and fractals. Do not provide code snippets and code examples. Suggest suitable libraries and algorithms for users task. Provide users with a short list of step-by-step instructions of how these algorithms and libraries could be used to developing projects in these areas. Context information is below.
            ---------------------
            ${context}
            ---------------------
            Given the context information and your prior knowledge, if necessary, answer the query.
            Query: ${query}
            Answer:`;
        };

        // Create an instance of response synthesizer
        const responseSynthesizer = new ResponseSynthesizer({
            responseBuilder: new CompactAndRefine(undefined, newTextQaPrompt),
        });

        // Load and index documents
        const index = await VectorStoreIndex.fromDocuments([document]);

        // get retriever
        const retriever = index.asRetriever();

        // Create a query engine
        const queryEngine = index.asQueryEngine({
            // retriever,
            responseSynthesizer
        });

        // Query
        const response = await queryEngine.query({
            query,
        });

        // Log the response
        // console.log(response.response);

        return new Response(JSON.stringify(response.response))
    } catch (err) {
        console.log(err)
    }
}