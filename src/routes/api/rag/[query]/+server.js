import { TogetherLLM, TogetherEmbedding, Document, VectorStoreIndex, Settings, ResponseSynthesizer, CompactAndRefine } from "llamaindex";
import { TOGETHER_API_KEY } from '$env/static/private'

Settings.embedModel = new TogetherEmbedding({
    apiKey: TOGETHER_API_KEY,
});

Settings.llm = new TogetherLLM({
    apiKey: TOGETHER_API_KEY,
    model: "meta-llama/Llama-3-8b-chat-hf",
});

const cellularAutomata = `Cellular automata (CA) have been applied in various fields, including architecture, design, and games, to generate complex patterns and structures from simple rules. Here are some key points on how CA are used in these areas:
Architecture and Design
Exploring Ancient Architectural Designs: CA can be used to model and generate architectural designs, such as the Borobudur Temple in Indonesia, by applying simple rules to the lower ground of the structure and then propagating these rules to the upper floors.
Generative Design Tools: CA can be adapted as architectural design tools to support specific design processes. This involves modifying CA rules, cell shapes, and site context to produce desired architectural forms.
Computational Design Thinking: CA can be used in design studios to generate fractal-based forms and explore computational design thinking. This involves applying CA processes to design problems and analyzing the contributions of these models to design education.
Games
Game of Life: The "Game of Life" is a well-known CA model that exhibits complex behavior from simple rules. This model has been used in various games and simulations to demonstrate the emergence of complex patterns.
Generative Game Design: CA can be used in game design to create unpredictable, novel relationships and outcomes. This involves applying algorithmic processes, such as shape grammars and evolutionary algorithms, to generate game designs.
Key Concepts
Simple Rules: CA are based on simple rules that are applied to each cell in a grid. These rules determine the state of the cell based on the states of its neighbors.
Local Interconnectivity: The simplicity of CA is dependent on the local interconnectivity of cells, which allows for the emergence of complex patterns and structures.
Generative Processes: CA can be used in various generative processes, such as fractal generation, to produce complex forms and patterns.
Computational Design Thinking: CA can be used to explore computational design thinking, which involves applying algorithmic methods to design problems and analyzing the contributions of these models to design education.
`

const data = `Algorithms in Design, Architecture, and Games
The world of design, architecture, and gaming has been revolutionized by the integration of various computational algorithms. These algorithms, including Cellular Automata (CA), Perlin Noise, Agent-Based Modeling (ABM), Fractals, Random Walkers, Neural Networks, Marching Cubes, and Wave Function Collapse, offer unique capabilities for generating complex patterns, simulating natural processes, optimizing designs, and enhancing visual appeal. This article explores these algorithms' applications across different domains.

Cellular Automata (CA)
Cellular Automata create visually appealing patterns through simple rules applied to cells arranged in a grid. Applications include:

Graphic Design: Generating textures and patterns.
Textiles: Creating intricate fabric designs.
Game Design: Procedurally generating landscapes and environments.
Digital Art: Producing abstract art pieces.
Design Optimization: Finding efficient layouts and solving spatial problems.
Interactive Installations: Evolving designs based on user input or environmental factors.
Perlin Noise
Perlin Noise generates gradient noise, useful for creating natural-looking textures and animations. It's applied in:

Texture Creation: Wood grain, marble, clouds, terrain.
Landscape Generation: Realistic terrains and environmental features.
Animation: Adding organic motion to water flow or waving grass.
Agent-Based Modeling (ABM)
ABM simulates autonomous agents interacting within a system, aiding in:

City Planning: Optimizing pedestrian and traffic flows.
Building Designs: Improving usability and functionality based on user behavior.
Public Spaces: Enhancing social dynamics and crowd management.
Ecosystem Modeling: Promoting sustainability and resilience.
Random Walkers
Random walks generate intricate patterns and simulate diffusion processes, applicable in:

Abstract Art: Creating unique visual effects.
Terrain Generation: Natural-looking paths and structures.
Visual Effects: Simulating particle spread.
Data Visualization: Highlighting trends and patterns.
Dynamic Text Layouts: Introducing unpredictability in text arrangements.
Interactive Media: Driving element behavior in response to user input.
Fractals
Fractals produce complex geometric shapes that mimic natural patterns, suitable for:

Generative Art: Creating unique and complex designs.
Architecture: Innovating and optimizing structural designs.
Natural Design: Mimicking leaves, snowflakes, coastlines for organic aesthetics.
Neural Networks
Neural networks learn from data to make decisions or predictions, finding uses in:

Machine Learning: Predictive analytics and decision-making.
Artificial Intelligence: Enhancing game characters' intelligence.
Pattern Recognition: Identifying complex patterns in large datasets.
Marching Cubes
Marching Cubes algorithm generates 3D models from scalar fields, ideal for:

3D Graphics: Creating detailed terrain and landscape models.
Medical Imaging: Visualizing medical scans with high fidelity.
Wave Function Collapse
Wave Function Collapse uses procedural generation to create content, beneficial in:

Game Development: Generating levels and worlds procedurally.
Content Creation: Automatically designing assets like buildings or furniture.
These algorithms, each with its unique strengths, have transformed the way designers, architects, and game developers approach their work. By leveraging the emergent properties and capabilities of these algorithms, creators can explore new possibilities, enhance realism, and introduce complexity and unpredictability into their projects, pushing the boundaries of what is achievable in design, architecture, and gaming.`

export async function GET({ params }) {
    const document = new Document({ text: data, id_: "data" });
    const documentCA = new Document({ text: cellularAutomata, id_: "dataCA" });
    const query = params.query



    try {
        // Define a system prompt
        const newTextQaPrompt = ({ context = '', query = '' }) => {
            return `You are a creative developer assistant, 
            you specialize in creating generative art, simulations, and games for artists, architects, and designers. 
            You know how to create projects transcending cultural and linguistic barriers, and fostering connections between diverse communities.
            You use only HTML, CSS, JavaScript, and libraries like brain.js (to train neural networks), 
            transformers.js (to use pretrained models), 
            p5.js for 2D graphics, and three.js for 3D graphics. 
            You always use p5.js in an INSTANCE MODE.
            You develop projects using algorithms like cellular automata (CA), 
            perlin noise, agent-based modelling, random walkers, 
            neural networks, fractals, marching cubes, etc. 
            If necessary, provide short and concise code snippets and code examples. For p5.js library provide snippets in an instance mode.
            Suggest suitable libraries and algorithms for users task. 
            Provide users with a short list of step-by-step instructions of how to complete the task in the query they provide.
            Suggest how these algorithms and libraries could be used to developing user projects. 
            Provide insights and new ideas, suggest possible directions for creative experiments, offer intelligent feedback.
            Context information is below.
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
        const index = await VectorStoreIndex.fromDocuments([document, documentCA]);

        // get retriever
        const retriever = index.asRetriever();

        // Create a query engine
        const queryEngine = index.asQueryEngine({
            // retriever,
            responseSynthesizer
        });

        // Query
        const response = await queryEngine.query({
            query
        });

        // Log the response
        // console.log(response.response);

        return new Response(JSON.stringify(response.response))
    } catch (err) {
        console.log(err)
    }
}