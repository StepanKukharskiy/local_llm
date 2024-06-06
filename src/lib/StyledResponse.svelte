<script>
	export let htmlContent = '';
</script>

<div>
	{@html htmlContent}
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
    div :global(br){
        padding: 0;
    }
	div :global(pre) {
        border: 1px solid black;
        border-radius: 10px;
    }
	div :global(code) {
		font-family: 'Courier New', Courier, monospace;
		margin: 0;
		text-wrap: wrap;
		word-break: break-word;
		overflow-x: auto;
		padding: 0 5px;
		background-color: #f9f9f9;
	}
</style>
