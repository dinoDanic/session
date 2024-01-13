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
		name: 'session 1',
		panels: [
			{ id: v4(), name: 'panel 1', position: 1 },
			{ id: v4(), name: 'panel 2', position: 2 },
			{ id: v4(), name: 'panel 3', position: 3 },
			{ id: v4(), name: 'panel 4', position: 4 },
			{ id: v4(), name: 'panel 5', position: 5 },
		]
	}
];
