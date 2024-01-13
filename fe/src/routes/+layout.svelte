<script lang="ts">
	import '../app.pcss';
	import type { Session } from '../be/api';
	import SessionBar from '../features/session/components/session-bar.svelte';

	export let data: {
		sessions: Session[];
		currentSessionId: string;
	};
</script>

<div class="grid h-[100vh] grid-cols-1 grid-rows-[1fr_20px] overflow-auto p-1">
	<slot />
	<SessionBar currentSessionId={data.currentSessionId} sessions={data.sessions} />
</div>
