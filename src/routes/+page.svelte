<script>
	import { marked } from 'marked';

	import StyledResponse from '../lib/StyledResponse.svelte';
	let query = '';
	let messages = [],
		queries = [];
	let parsedMessageArray = [];

	async function generateAnswer() {
		buttonIsDisabled = true;
		const message = await fetch(`/api/transformers/${query}`);
		console.log(message);
		const messageObject = await message.json();
		const html = await marked(messageObject);
		// const html = snarkdown(messageObject);
		// const converter = new showdown.Converter()
		// const html = converter.makeHtml(messageObject);
		// console.log(html);
		// const html = convertToHTML(messageObject);
		console.log(messageObject);
		// console.log(parseText(messageObject));
		// parsedMessageArray = parseText(messageObject);
		queries = [...queries, query];
		// messages = [...messages, parsedMessageArray];
		messages = [...messages, html];
		buttonIsDisabled = false;
	}

	function parseText(input = '') {
    const lines = input.split('\n');
    const result = [];
    let currentCodeBlock = null;

    lines.forEach((line) => {
        if (line.startsWith('**')) {
            result.push({
                type: 'heading',
                content: line.replace('**', '').trim().slice(0, -2)
            });
        } else if (line.startsWith('*')) {
            result.push({
                type: 'text',
                content: line.replace('*', '').trim()
            });
        } else if (line.startsWith('+')) {
            result.push({
                type: 'list',
                content: line.replace('+', '').trim()
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

        // Check for inline code elements
        const inlineCodeMatch = line.match(/`([^`]+)`/);
        if (inlineCodeMatch) {
            result.push({
                type: 'code',
                content: inlineCodeMatch[1]
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


	function parseMarkdown(text) {
		const lines = text.split('\n');
		const result = [];
		let inCodeBlock = false;
		let codeLanguage = '';

		lines.forEach((line) => {
			if (inCodeBlock) {
				if (line.startsWith('```')) {
					inCodeBlock = false;
				} else {
					result.push({ type: 'code', language: codeLanguage, content: line });
				}
			} else if (line.startsWith('```')) {
				inCodeBlock = true;
				codeLanguage = line.slice(3).trim();
			} else if (line.startsWith('**')) {
				result.push({ type: 'heading', content: line.replace(/\*\*/g, '').trim() });
			} else if (/^\d+\./.test(line)) {
				result.push({ type: 'orderedlist', content: line.trim() });
			} else if (/^[\*\+\-]/.test(line)) {
				result.push({ type: 'unorderedlist', content: line.replace(/^[\*\+\-]\s*/, '').trim() });
			} else if (/`[^`]+`/.test(line)) {
				const codeContent = line.match(/`([^`]+)`/)[1];
				result.push({ type: 'code', content: codeContent });
			} else if (line.trim()) {
				result.push({ type: 'text', content: line.trim() });
			}
		});

		return result;
	}

	let buttonIsDisabled = false;
</script>

<div class="container">
	<textarea bind:value={query}></textarea>
	<button on:click={generateAnswer} disabled={buttonIsDisabled}>Generate</button>
	{#each messages as messageData, i}
		<p style="margin: 10px 0 0 0;">query</p>
		<p class="query">{queries[i]}</p>
		<p style="margin: 10px 0 0 0;">answer</p>
		<div class="response">
			<StyledResponse htmlContent={messageData} />
			<!-- {@html messageData} -->
			<!-- {#each messageData as message}
				{#if message.type === 'heading'}
					<h2>{message.content}</h2>
				{:else if message.type === 'text'}
					<p>{message.content}</p>
				{:else if message.type === 'list'}
					<li>{message.content}</li>
				{:else if message.type === 'code'}
					<div
						style="margin: 10px 0; border: 1px solid black; border-radius: 10px; padding: 10px; box-sizing: border-box;"
					>
						<pre><code>{message.content}</code></pre>
					</div>
				{/if}
			{/each} -->
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
	div :global(p) {
		margin: 0;
	}
	p {
		margin: 0;
	}
	div :global(pre) {
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
		text-wrap: wrap;
		word-break: break-word;
		overflow-x: auto;
	}
	.query {
		padding: 10px;
		border: 1px solid #1a1a1a;
		border-radius: 10px;
		background-color: rgb(240, 240, 240);
		margin: 5px;
	}
</style>
