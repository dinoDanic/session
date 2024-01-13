import { writable } from 'svelte/store';
import { get_sessions, type Session } from '../../be/api';

type SessionStore = {
	sessions: Session[];
};

// export const sessionStore = writable<SessionStore>({ sessions: get_sessions, activeSession: 0, });
