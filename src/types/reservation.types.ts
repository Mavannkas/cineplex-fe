export interface ReservationParams {
    type: number;
    screening_id: number;
    seat: `${string},${string}`;
    owner: string;
}

export interface TicketType {
    type: string;
}