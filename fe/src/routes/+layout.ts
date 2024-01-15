import { get_sessions, type GetSessionsResponse } from '../be/api';

type SessionPageParams = {
	params: {
		session_id: string;
	};
};

export type MainLayoutResponse = GetSessionsResponse & SessionPageParams;

export async function load({ params }: SessionPageParams): Promise<MainLayoutResponse> {
	const res = await get_sessions();
	return {
		sessions: res.sessions,
		params: params
	};
}
