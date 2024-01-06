import { PUBLIC_API_ENDPOINT } from '$env/static/public';
import type { SeatStatus } from '../../../types/room.types';

export async function load({ params }: { params: { id: string } }): Promise<{ data?: SeatStatus[][], error?: string }> {
	try {
		const result = await fetch(`${PUBLIC_API_ENDPOINT}/screening/${params.id}/seats_status`);
		if (!result.ok) {
			throw new Error(`Error fetching screening ${params.id}`);
		}

		console.log(result.status);
		return { data: await result.json() };
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		return { error: "Not existing screening" };
	}

} 
