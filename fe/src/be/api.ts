export type Session = {
  name: string;
  id: string;
  panels: PanelType[];
  focus: Focus;
};

export type PanelType = {
  name: string;
  id: string;
  position: number;
};

export type FocusType = 'panel';

export type Focus = {
  type: FocusType | null;
  id: string | null;
};

export type GetSessionsResponse = {
  sessions: Session[];
};

export const get_sessions: () => Promise<GetSessionsResponse> = async () => {
  // await new Promise((res) => setTimeout(() => res(''), 1000));
  return {
    sessions: [
      {
        id: '1',
        name: 'personal',
        focus: { type: 'panel', id: '1-5' },
        panels: [
          { id: '1-1', name: 'panel 1', position: 1 },
          { id: '1-2', name: 'panel 2', position: 2 },
          { id: '1-3', name: 'panel 3', position: 3 },
          { id: '1-4', name: 'panel 4', position: 4 },
          { id: '1-5', name: 'panel 5', position: 5 }
        ]
      },
      {
        id: '2',
        name: 'free form',
        focus: { type: 'panel', id: '2-2' },
        panels: [
          { id: '2-1', name: 'panel 1', position: 1 },
          { id: '2-2', name: 'panel 2', position: 2 },
          { id: '2-3', name: 'panel 3', position: 3 },
          { id: '2-4', name: 'panel 4', position: 4 },
          { id: '2-5', name: 'panel 5', position: 5 }
        ]
      },
      {
        id: '3',
        name: 'job',
        focus: { type: 'panel', id: '3-2' },
        panels: [
          { id: '3-1', name: 'panel 1', position: 1 },
          { id: '3-2', name: 'panel 2', position: 2 },
          { id: '3-3', name: 'panel 3', position: 3 },
          { id: '3-4', name: 'panel 4', position: 4 },
          { id: '3-5', name: 'panel 5', position: 5 },
          { id: '3-6', name: 'panel 6', position: 6 },
          { id: '3-7', name: 'panel 7', position: 7 },
          { id: '3-8', name: 'panel 8', position: 8 },
          { id: '3-9', name: 'panel 9', position: 9 },
          { id: '3-10', name: 'panel 10', position: 10 },
          { id: '3-11', name: 'panel 11', position: 11 },
          { id: '3-12', name: 'panel 12', position: 12 }
        ]
      }
    ]
  };
};
