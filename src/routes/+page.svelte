<script>
	let query = '';
	let messages = [],
		queries = [];
	async function generateAnswer() {
		buttonIsDisabled = true
		const message = await fetch(`/api/transformers/${query}`);
		console.log(message)
		const messageObject = await message.json();
		console.log(messageObject)
		queries = [...queries, query];
		messages = [...messages, messageObject];
		buttonIsDisabled = false
	}

	let buttonIsDisabled = false
</script>

<div class="container">
	<textarea bind:value={query}></textarea>
	<button on:click={generateAnswer} disabled={buttonIsDisabled}>Generate</button>
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
		white-space: pre-wrap; 
	}
	.query {
		padding: 10px;
		border: 1px solid #1a1a1a;
		border-radius: 10px;
		background-color: rgb(240, 240, 240);
		margin: 5px;
	}
</style>
