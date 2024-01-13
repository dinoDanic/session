<script lang="ts">
	import { type Session } from '../../be/api';
	import PanelBuilder from '../../features/panel/panel-builder.svelte';
	export let data: Session | undefined;
	$: panels = data?.panels || [];
</script>

<PanelBuilder {panels} />
