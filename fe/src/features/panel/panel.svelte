<script lang="ts">
	import type { PanelType } from '../../be/api';
	export let panel: PanelType;
	export let index: number;
	export let panelsCount: number;
</script>

<div style="order: {panel.position}" class="flex-1 min-w-[33%] border">{panel.name}</div>
