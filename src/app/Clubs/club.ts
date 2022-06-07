import { IFootballers } from "../Footballers/footballers.model";

export interface Club {
    id : number,
    clubName : string;
    city : string;
    budget : number;
    founded : string;
    owner : string
    isDefault : boolean
    creationDate : Date
    pictureUrl : string
}
