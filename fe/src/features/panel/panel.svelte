<script lang="ts">
	import { cn } from '$lib/utils';
	import type { PanelType } from '../../be/api';
	import { sessionStore } from '../session/store';

	export let panel: PanelType;
	export let sessionId: string;

	let isFocused = false;
	sessionStore.subscribe((store) => {
		const session = store.sessions.find((s) => s.id === sessionId);
		if (session) {
			if (session.hover.id === panel.id && session.hover.type === 'panel') {
				isFocused = true;
			} else isFocused = false;
		}
	});
</script>

<div
	style="order: {panel.position}"
	class={cn(
		'flex min-w-[33%] flex-1 items-center justify-center border',
		isFocused && 'border-primary'
	)}
>
	{panel.name}
</div>
