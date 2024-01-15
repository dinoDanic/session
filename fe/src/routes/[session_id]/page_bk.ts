import type { SessionPageParams } from '.';
import { get_sessions, type Session } from '../../be/api';

export type SessionByIdPageResponse = {
  session?: Session;
} & SessionPageParams;

export async function load({ params }: SessiontPageParams): Promise<SessionByIdPageResponse> {
  const res = await get_sessions();
  const findSessionById = res.sessions.find((session) => session.id === params.session_id);
  return {
    session: findSessionById,
    params: params
  };
}
