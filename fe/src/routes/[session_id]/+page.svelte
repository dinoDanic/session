<script lang="ts">
	import { type Session } from '../../be/api';
	import PanelBuilder from '../../features/panel/panel-builder.svelte';
	import type { SessionByIdPageResponse } from './+page';

	export let data: SessionByIdPageResponse;
	$: panels = data?.session?.panels || [];
</script>

<PanelBuilder sessionId={data.params.session_id} {panels} />
