<script>
	import CodeSnippet from './CodeSnippet.svelte';
	export let htmlContent = '';
	console.log(htmlContent);

	function splitCodeIntoChunks(htmlCode = '') {
		const chunks = htmlCode.split(/<pre>|<\/pre>/);

		return chunks.map((chunk) => {
			if (chunk.startsWith('<code')) {
				// return { type: 'code', content: chunk };
				const language = chunk.match(/class="language-(\w+)"/);
				return { type: 'code', language: language ? language[1] : '', content: chunk };
			} else {
				return { type: 'text', content: chunk };
			}
		});

		// const result = [];

		// for (let i = 0; i < chunks.length; i++) {
		// 	if (chunks[i].startsWith('<code')) {
		// 		const language = chunks[i].match(/class="language-(.*?)"/)[1];
		// 		result.push({ type: 'code', language: language, content: chunks[i + 1] });
		// 		i++; // Skip the next element
		// 	} else {
		// 		result.push({ type: 'text', content: chunks[i] });
		// 	}
		// }

		// return result;
		// return htmlCode.split(/<pre>|<\/pre>/);
		// return htmlCode.split(/(<pre>|<\/pre>)/);
		// return htmlCode.match(/<pre>.*?<\/pre>/gs);
	}

	const chunks = splitCodeIntoChunks(htmlContent);

	console.log(chunks);
</script>

<div>
	<!-- {@html htmlContent} -->

	{#each chunks as chunk}
		{#if chunk.type === 'code'}
			<CodeSnippet language={chunk.language} content={chunk.content} />
		{:else}
			{@html chunk.content}
		{/if}
	{/each}
</div>

<style>
	div :global(h1),
	div :global(h2),
	div :global(p),
	div :global(ul),
	div :global(ol),
	div :global(li) {
		font-family: sans-serif;
		margin: 0;
		padding-top: 0;
		/* display: grid; */
	}
	div :global(br) {
		padding: 0;
	}
	div :global(pre) {
		border: 1px solid black;
		border-radius: 10px;
		background-color: #f9f9f9;
	}
	div :global(code) {
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
		text-wrap: wrap;
		word-break: normal;
		overflow-x: auto;
		padding: 0 5px;
		background-color: #f9f9f9;
	}
</style>
