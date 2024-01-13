<script lang="ts">
	import type { PanelType } from '../../be/api';
	import Panel from '../panel/panel.svelte';

	export let panels: PanelType[];
	$: panelsCount = panels.length;
</script>

<div class="flex h-full flex-wrap gap-1">
	{#each panels as panel, index (panel.id)}
		<Panel {panel} {index} {panelsCount} />
	{/each}
</div>
