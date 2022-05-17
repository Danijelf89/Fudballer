import { Club } from "../Clubs/club";

export interface IFootballers {
        id: number,
        name: string,
        surname: string,
        position: string,
        dateOfBirth: string,
        rating: number,
        price: number,
        clubId: number;
        club: Club;
        status: string;
}