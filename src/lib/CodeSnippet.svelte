<script>
	export let language = '';
	export let content = '';
</script>

<div>
	<p>{language}</p>
        {@html content}
</div>

<style>
	div {
		border: 1px solid black;
		border-radius: 10px;
		background-color: #f9f9f9;
        width: fit-content;
	}
	code {
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
		text-wrap: wrap;
		word-break: normal;
		overflow-x: auto;
		padding: 0 5px;
		background-color: #91c1ff;
	}
</style>
