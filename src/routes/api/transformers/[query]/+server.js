import { pipeline, env } from '@xenova/transformers';
// import { fileURLToPath } from 'url';
// import path from 'path';

// // Get the directory name of the current module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log(__filename)
// console.log(__dirname)
// console.log(`/var/task/.netlify/server/entries`)

env.allowLocalModels = false;
env.allowRemoteModels = true;

// env.allowLocalModels = true;
// env.localModelPath = 'https://local-llms-test.netlify.app/models/';
// env.allowRemoteModels = false;

export async function GET({ locals, params }) {

    try {
        const prompt = params.query;

        const generator = await pipeline(
            "text2text-generation",
            "xenova/lamini-flan-t5-248m",
        );

        const generatorOutput = await generator(
            prompt,
            {
                temperature: 2,
                max_new_tokens: 150,
                repetition_penalty: 1.5,
                no_repeat_ngram_size: 3,
                num_beams: 2,
                num_return_sequences: 1,
            },
        );

        const rephraseObject = {
            response: generatorOutput[0].generated_text
        }

        return new Response(JSON.stringify(rephraseObject))

    } catch (err) {
        console.log(err)
    }
}
