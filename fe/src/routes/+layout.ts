import { get_sessions } from '../be/api';

export function load({ params }) {
	const sessions = get_sessions;
	return {
		sessions: sessions,
		currentSessionId: params.session_id
	};
}
