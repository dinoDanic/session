import { writable } from 'svelte/store';
import type { GetSessionsResponse } from '../../be/api';

export type SessionStore = GetSessionsResponse;

type Direction = 'left' | 'right' | 'up' | 'down';

const initStore = () => {
	const initialStore: SessionStore = {
		sessions: []
	};

	const { subscribe, update, set } = writable(initialStore);

	return {
		subscribe,
		setSessions: (value: GetSessionsResponse) => set(value),
		updateHover: (sessionId: string, direction: Direction) => {
			return update((store) => {
				const updateSession = store.sessions.map((s) => {
					if (s.id === sessionId) {
						const currentPaneId = s.hover.id;
						const currentPaneIndex = s.panels.findIndex((p) => p.id === currentPaneId);
						const panesAmount = Math.floor(s.panels.length);
						const rowsAmount = panesAmount / 3;

						const currentRow = Math.floor(currentPaneIndex / 3 + 1);
						const isOnFirstRow = currentRow === 1;
						const isOnLastRow = rowsAmount === currentRow;
						const isOnLastPane = currentPaneIndex + 1 === panesAmount;
						const isOnFirstPane = currentPaneIndex + 1 === 1;
						// const haveRowAbove = false

						console.log('currentPaneId', currentPaneId);
						console.log('currentPaneIndex', currentPaneIndex);
						console.log('panesAmount', panesAmount);
						console.log('rowsAmount', rowsAmount);
						console.log('currentRow', currentRow);
						console.log('isOnFirstRow', isOnFirstRow);
						console.log('isOnLastRow', isOnLastRow);
						console.log('isonLastPane', isOnLastPane);
						console.log('isonFirstPane', isOnFirstPane);

						if (direction === 'left') {
							if (isOnFirstPane) {
								const lastPane = s.panels.at(panesAmount - 1);
								if (lastPane?.id) {
									return {
										...s,
										hover: {
											type: s.hover.type,
											id: lastPane.id
										}
									};
								}
								return s;
							}
							const paneBeforeCurrent = s.panels.at(currentPaneIndex - 1);
							if (paneBeforeCurrent?.id) {
								return {
									...s,
									hover: { type: s.hover.type, id: paneBeforeCurrent.id }
								};
							}
							return s;
						} else if (direction === 'right') {
							if (isOnLastPane) {
								const firstPane = s.panels.at(0);
								return {
									...s,
									hover: {
										type: s.hover.type,
										id: firstPane?.id
									}
								};
							}
							const paneBeforeCurrent = s.panels.at(currentPaneIndex + 1);
							if (paneBeforeCurrent?.id) {
								return {
									...s,
									hover: { type: s.hover.type, id: paneBeforeCurrent.id }
								};
							}
							return s;
						} else if (direction === 'up' && !isOnFirstRow) {
							const pane3Before = s.panels.at(currentPaneIndex - 3);
							if (pane3Before) {
								return {
									...s,
									hover: { type: s.hover.type, id: pane3Before.id }
								};
							}
							return s;
						} else if (direction === 'down' && !isOnLastRow) {
							const pane3After = s.panels.at(currentPaneIndex + 3);
							if (pane3After) {
								return {
									...s,
									hover: { type: s.hover.type, id: pane3After.id }
								};
							} else {
								const pane2After = s.panels.at(currentPaneIndex + 2);
								if (pane2After?.id) {
									return {
										...s,
										hover: { type: s.hover.type, id: pane2After.id }
									};
								}
								return s;
							}
						}
						return s;
					}
					return s;
				});
				return { sessions: updateSession };
			});
		}
	};
};

export const sessionStore = initStore();
