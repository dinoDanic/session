import type { SessiontPageParams } from '.';
import { get_sessions } from '../../be/api';

export async function load({ params }: SessiontPageParams) {
	const findSessionById = get_sessions.find((session) => session.id === params.session_id);
	return  findSessionById
}
