import { v4 } from 'uuid';

export type Session = {
	name: string;
	id: string;
	panels: PanelType[];
};

export type PanelType = {
	name: string;
	id: string;
	position: number;
};

export const get_sessions: Session[] = [
	{
		id: '1',
		name: 'personal',
		panels: [
			{ id: '1', name: 'panel 1', position: 1 },
			{ id: '2', name: 'panel 2', position: 2 },
			{ id: '3', name: 'panel 3', position: 3 },
			{ id: '4', name: 'panel 4', position: 4 },
			{ id: '5', name: 'panel 5', position: 5 }
		]
	},
	{
		id: '2',
		name: 'job',
		panels: [
			{ id: '1', name: 'panel 1', position: 1 },
			{ id: '2', name: 'panel 2', position: 2 },
			{ id: '3', name: 'panel 3', position: 3 }
		]
	}
];
