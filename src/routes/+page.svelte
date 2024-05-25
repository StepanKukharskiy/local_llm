<script>
	let query = '';
	let messages = [],
		queries = [];
	async function generateAnswer() {
		const message = await fetch(`/api/transformers/${query}`);
		const messageObject = await message.json();
		queries = [...queries, query];
		messages = [...messages, messageObject.response];
	}
</script>

<div class="container">
	<textarea bind:value={query}></textarea>
	<button on:click={generateAnswer}>Generate</button>
	{#each messages as message, i}
		<p style='margin: 10px 0 0 0;'>query</p>
		<p class="query">{queries[i]}</p>
		<p style='margin: 10px 0 0 0;'>answer</p>
		<p class="response">{messages[i]}</p>
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
	}
	.query {
		padding: 10px;
		border: 1px solid #1a1a1a;
		border-radius: 10px;
		background-color: rgb(240, 240, 240);
		margin: 5px;
	}
</style>
