<script>
	let query = '';
	let messages = [],
		queries = [];
	let parsedMessageArray = [];
	async function generateAnswer() {
		buttonIsDisabled = true;
		const message = await fetch(`/api/transformers/${query}`);
		console.log(message);
		const messageObject = await message.json();
		// const html = marked(messageObject)
		// const html = convertToHTML(messageObject);
		console.log(messageObject);
		console.log(parseText(messageObject));
		parsedMessageArray = parseText(messageObject);
		queries = [...queries, query];
		messages = [...messages, parsedMessageArray];
		buttonIsDisabled = false;
	}

	function parseText(input = '') {
		const lines = input.split('\n');
    const result = [];
    let currentCodeBlock = null;

    lines.forEach(line => {
        if (line.startsWith('**')) {
            result.push({
                type: 'heading',
                content: line.replace('**', '').trim()
            });
        } else if (line.startsWith('*')) {
            result.push({
                type: 'text',
                content: line.replace('*', '').trim()
            });
        } else if (line.startsWith('```')) {
            if (currentCodeBlock) {
                currentCodeBlock.content = currentCodeBlock.content.trim();
                result.push(currentCodeBlock);
                currentCodeBlock = null;
            } else {
                currentCodeBlock = {
                    type: 'code',
                    language: line.replace('```', '').trim(),
                    content: ''
                };
            }
        } else if (currentCodeBlock) {
            currentCodeBlock.content += line + '\n';
        } else if (line.trim()) {
            result.push({
                type: 'text',
                content: line.trim()
            });
        }
    });

    // If there's an unclosed code block at the end, close it
    if (currentCodeBlock) {
        currentCodeBlock.content = currentCodeBlock.content.trim();
        result.push(currentCodeBlock);
    }

    return result;

	}

	let buttonIsDisabled = false;
</script>

<div class="container">
	<textarea bind:value={query}></textarea>
	<button on:click={generateAnswer} disabled={buttonIsDisabled}>Generate</button>
	{#each messages as messageArray, i}
		<p style="margin: 10px 0 0 0;">query</p>
		<p class="query">{queries[i]}</p>
		<p style="margin: 10px 0 0 0;">answer</p>
		<div class="response">
			{#each messageArray as message}
				{#if message.type === 'heading'}
					<h2>{message.content}</h2>
				{:else if message.type === 'text'}
					<p>{message.content}</p>
				{:else if message.type === 'code'}
					<div style='margin: 10px 0; border: 1px solid black; border-radius: 10px; padding: 10px; box-sizing: border-box;'><pre><code>{message.content}</code></pre></div>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	.container {
		display: grid;
	}
	.response {
		padding: 10px;
		border: 1px solid #1a1a1a;
		border-radius: 10px;
		background-color: rgb(215, 242, 253);
		margin: 5px;
		white-space: pre-wrap;
	}
	.response p {
		margin: 0;
	}
	p {
		margin: 0;
	}
	pre,
	code {
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
	}
	.query {
		padding: 10px;
		border: 1px solid #1a1a1a;
		border-radius: 10px;
		background-color: rgb(240, 240, 240);
		margin: 5px;
	}
</style>
