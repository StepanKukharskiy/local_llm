import { pipeline, env } from '@xenova/transformers';

// env.allowLocalModels = false;
// env.allowRemoteModels = true;

env.allowLocalModels = true;
//env.localModelPath = "$lib/models";
env.allowRemoteModels = false;

export async function GET({ locals, params }) {

    try {
        const prompt = params.query;

        const generator = await pipeline(
            "text2text-generation",
            "Xenova/LaMini-Flan-T5-248M",
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
