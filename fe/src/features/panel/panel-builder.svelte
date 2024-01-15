<script lang="ts">
	import type { PanelType } from '../../be/api';
	import Panel from '../panel/panel.svelte';

	export let panels: PanelType[];
	export let sessionId: string;
</script>

<div class="flex h-full flex-wrap gap-1">
	{#each panels as panel (panel.id)}
		<Panel {panel} {sessionId} />
	{/each}
</div>
