import { writable } from 'svelte/store';
import type { GetSessionsResponse } from '../../be/api';
import { updateFocus, type Direction, newPanel, removePanel } from './helpers/store';

export type SessionStore = GetSessionsResponse;

const initStore = () => {
	const initialStore: SessionStore = {
		sessions: []
	};

	const { subscribe, update, set } = writable(initialStore);

	return {
		subscribe,
		setSessions: (value: GetSessionsResponse) => set(value),
		updateFocus: (sessionId: string, direction: Direction) =>
			update((store) => ({ sessions: updateFocus(store.sessions, sessionId, direction) })),
		newPanel: (sessionId: string) =>
			update((store) => ({ sessions: newPanel(store.sessions, sessionId) })),
		removePanel: (sessionId: string) =>
			update((store) => ({ sessions: removePanel(store.sessions, sessionId) }))
	};
};

export const sessionStore = initStore();
