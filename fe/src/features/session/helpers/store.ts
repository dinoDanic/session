import { v4 } from 'uuid';
import type { PanelType, Session } from '../../../be/api';
import type { Focus } from 'lucide-svelte';

export type Direction = 'left' | 'right' | 'up' | 'down';

export const newPanel = (sessions: Session[], sessionId: string): Session[] =>
	sessions.map((s) => {
		if (s.id === sessionId) {
			const id = v4();
			const panelsAmount = s.panels.length;

			return {
				...s,
				panels: [
					...s.panels,
					{ name: `panel ${panelsAmount + 1}`, id: id, position: panelsAmount + 1 }
				],
				focus: { type: 'panel', id: id }
			};
		} else return s;
	});

export const removePanel = (sessions: Session[], sessionId: string): Session[] =>
	sessions.map((s) => {
		if (s.id === sessionId) {
			const currentPaneId = s.focus.id;
			const currentPaneIndex = s.panels.findIndex((p) => p.id === currentPaneId);
			let newPanel: PanelType | undefined;

			const nextPanel = s.panels.at(currentPaneIndex + 1);
			const prevPanel = s.panels.at(currentPaneIndex - 1);

			if (nextPanel?.id) newPanel = nextPanel;
			else if (prevPanel?.id) newPanel = prevPanel;

			if (newPanel?.id) {
				return {
					...s,
					panels: s.panels.filter((p) => p.id !== s.focus.id),
					focus: { type: 'panel', id: newPanel.id }
				};
			} else return s;
		} else return s;
	});

export const updateFocus = (
	sessions: Session[],
	sessionId: string,
	direction: Direction
): Session[] =>
	sessions.map((s) => {
		if (s.id === sessionId) {
			const currentPaneId = s.focus.id;
			const currentPaneIndex = s.panels.findIndex((p) => p.id === currentPaneId);
			const panesAmount = Math.floor(s.panels.length);
			const rowsAmount = panesAmount / 3;

			const currentRow = Math.floor(currentPaneIndex / 3 + 1);
			const isOnFirstRow = currentRow === 1;
			const isOnLastRow = rowsAmount === currentRow;
			const isOnLastPane = currentPaneIndex + 1 === panesAmount;
			const isOnFirstPane = currentPaneIndex + 1 === 1;

			if (direction === 'left') {
				if (isOnFirstPane) {
					const lastPane = s.panels.at(panesAmount - 1);
					if (lastPane?.id) {
						return {
							...s,
							focus: {
								type: s.focus.type,
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
						focus: { type: s.focus.type, id: paneBeforeCurrent.id }
					};
				}
				return s;
			} else if (direction === 'right') {
				if (isOnLastPane) {
					const firstPane = s.panels.at(0);
					if (firstPane?.id) {
						return {
							...s,
							focus: {
								type: s.focus.type,
								id: firstPane.id
							}
						};
					}
					return s;
				}
				const paneBeforeCurrent = s.panels.at(currentPaneIndex + 1);
				if (paneBeforeCurrent?.id) {
					return {
						...s,
						focus: { type: s.focus.type, id: paneBeforeCurrent.id }
					};
				}
				return s;
			} else if (direction === 'up' && !isOnFirstRow) {
				const pane3Before = s.panels.at(currentPaneIndex - 3);
				if (pane3Before) {
					return {
						...s,
						focus: { type: s.focus.type, id: pane3Before.id }
					};
				}
				return s;
			} else if (direction === 'down' && !isOnLastRow) {
				let paneAfter: PanelType | undefined;
				const pane1After = s.panels.at(currentPaneIndex + 1);
				const pane2After = s.panels.at(currentPaneIndex + 2);
				const pane3After = s.panels.at(currentPaneIndex + 3);

				if (pane3After?.id) paneAfter = pane3After;
				else if (pane2After?.id) paneAfter = pane2After;
				else if (pane1After?.id) paneAfter = pane1After;

				if (paneAfter?.id) {
					return {
						...s,
						focus: { type: s.focus.type, id: paneAfter.id }
					};
				}
			}
			return s;
		}
		return s;
	});
