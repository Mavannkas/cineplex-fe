export interface RoomCreateParams {
    number: number,
    seating_capacity: number,
    seat_arrangement: number[][],
    location: number,
}

export enum SeatStatus {
    NO_SEAT = 0,
    FREE_SEAT = 1,
    BOOKED_SEAT = 2,
    RESERVED_SEAT = 3,
}