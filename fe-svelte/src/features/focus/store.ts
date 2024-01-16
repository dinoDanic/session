import { writable } from 'svelte/store';

export interface FocusStore {
	focusedElement: string | null;
}

const initStore = () => {
	const initialCounter: FocusStore = {
		focusedElement: null
	};

	const { subscribe, set } = writable(initialCounter);

	return {
		subscribe,
		setFocusedElement: (element: string) => set({ focusedElement: element })
	};
};

export const focusStore = initStore();
