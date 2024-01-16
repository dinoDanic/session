<script lang="ts">
	import { page } from '$app/stores';
	import type { Session } from '../../be/api';
	import PanelBuilder from '../../features/panel/panel-builder.svelte';
	import { sessionStore, type SessionStore } from '../../features/session/store';

	$: sessionId = $page.params?.session_id;

	let sessions: Session[] = [];

	sessionStore.subscribe((store) => {
		sessions = store.sessions;
	});

	$: currentSession = sessions.find((s) => s.id === sessionId);
	$: panels = currentSession?.panels || [];
</script>

<PanelBuilder sessionId={$page.params.session_id} {panels} />
