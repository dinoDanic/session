<script lang="ts">
	import type { Session } from '../../../be/api';
	import SessionBarItem from './session-bar-item.svelte';
	export let sessions: Session[];
	export let currentSessionId: string;

	function onKeyDown(e: KeyboardEvent) {
		console.log(e, 'eeeeeeeeeeee');
		window.location = sessions.at(e.key - 1)?.id || '';
	}
</script>

<div class="flex gap-2 bg-secondary">
	{#each sessions as session, index}
		<a href={session.id}>
			<SessionBarItem {session} {currentSessionId} index={index + 1} />
		</a>
	{/each}
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />
