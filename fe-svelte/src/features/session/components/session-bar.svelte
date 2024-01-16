<script lang="ts">
	import { get_sessions, type Session } from '../../../be/api';
	import SessionBarItem from './session-bar-item.svelte';
	import { sessionStore } from '../store';

	export let currentSessionId: string;

	let sessions: Session[] = [];

	sessionStore.subscribe((store) => {
		sessions = store.sessions;
	});
</script>

<div class="flex gap-2 bg-secondary">
	{#each sessions as session, index}
		<a href={session.id}>
			<SessionBarItem {session} {currentSessionId} index={index + 1} />
		</a>
	{/each}
</div>
