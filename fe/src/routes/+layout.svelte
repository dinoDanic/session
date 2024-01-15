<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.pcss';
	import SessionBar from '../features/session/components/session-bar.svelte';
	import { sessionStore } from '../features/session/store';
	import { isStringANumber } from '../helpers/numbers';
	import { goto } from '$app/navigation';
	import type { MainLayoutResponse } from './+layout';

	export let data: MainLayoutResponse;

	onMount(() => {
		sessionStore.setSessions({ sessions: data.sessions });
	});

	$: currentSession = data.sessions.find((s) => s.id === data.params.session_id);

	const _onkeyDown = (e: KeyboardEvent) => {
		const { key } = e;
    console.log('key', key)
		if (isStringANumber(key)) {
			goto(key);

		} else {
			if (!currentSession) return;
			if (key === 'h' || key === "ArrowLeft") {
				sessionStore.updateHover(currentSession?.id, 'left');
			} else if (key === 'l' || key === "ArrowRight") {
				sessionStore.updateHover(currentSession?.id, 'right');
			} else if (key === 'k' || key === "ArrowUp") {
				sessionStore.updateHover(currentSession?.id, 'up');
			} else if (key === "j" || key === "ArrowDown") {
				sessionStore.updateHover(currentSession?.id, 'down');
      }
		}
	};
</script>

<div class="grid h-[100vh] grid-cols-1 grid-rows-[1fr_20px] overflow-auto p-1">
	<slot />
	<SessionBar currentSessionId={data.params.session_id} />
</div>

<svelte:window on:keydown|preventDefault={_onkeyDown} />
