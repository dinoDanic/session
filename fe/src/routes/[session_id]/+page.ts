import type { SessiontPageParams } from '.';

export async function load({ params }: SessiontPageParams) {
	return { params };
}
