<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Session } from '../../../be/api';

	export let session: Session;
	export let currentSessionId: string;
	export let index: number;

	$: isActive = session.id === currentSessionId;
</script>

<div class="flex items-center justify-center gap-2">
	<div
		class={cn(
			'flex w-8  items-center justify-center bg-accent text-primary-foreground',
			isActive && 'bg-primary'
		)}
	>
		<p class="text-sm">{index}</p>
	</div>
	<div>{session.name}</div>
</div>
