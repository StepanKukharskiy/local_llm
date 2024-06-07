<script>
	import { marked } from 'marked';

	import StyledResponse from '../lib/StyledResponse.svelte';
	let query = '';
	let messages = [],
		queries = [];

	async function generateAnswer() {
		buttonIsDisabled = true;
		const message = await fetch(`/api/transformers/${query}`);
		console.log(message);
		const messageObject = await message.json();
		const html = await marked(messageObject);
		// console.log(messageObject);
		queries = [...queries, query];
		messages = [...messages, html];
		buttonIsDisabled = false;
	}

	let buttonIsDisabled = false;
	let textarea

	function updateTextareaHeight(){
		textarea.style.height = `auto`
      	textarea.style.height = `${textarea.scrollHeight}px`;
	}
</script>

<div class="container">
	
	{#each messages as messageData, i}
		<p style="margin: 10px 0 0 0;">query</p>
		<p class="query">{queries[i]}</p>
		<p style="margin: 10px 0 0 0;">answer</p>
		<div class="response">
			<StyledResponse htmlContent={messageData} />
		</div>
	{/each}

	<textarea bind:this={textarea} bind:value={query} on:input={updateTextareaHeight} ></textarea>
	<button on:click={generateAnswer} disabled={buttonIsDisabled}>Generate</button>
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
