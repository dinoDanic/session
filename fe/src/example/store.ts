import { writable } from 'svelte/store';

export interface Counter {
	apples: number;
	bananas: number;
}

const initStore = () => {
	const initialCounter: Counter = {
		apples: 0,
		bananas: 0
	};

	const { subscribe, set, update } = writable(initialCounter);

	return {
		subscribe,
		incBanana: () =>
			update(({ bananas, ...rest }) => ({
				...rest,
				bananas: bananas + 1
			})),
		decBanana: () =>
			update(({ bananas, ...rest }) => ({
				...rest,
				bananas: bananas - 1
			})),
		reset: () => set(initialCounter)
	};
};

export const counter = initStore();
