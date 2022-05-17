import { Injectable } from "@angular/core";
import { IFootballers } from "./footballers.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Club } from "../Clubs/club";

@Injectable({
     providedIn: 'root'
})
export class FootballersService {

     constructor(private HttpClient: HttpClient) { }

     getFootballers(): Observable<IFootballers[]> {
          return this.HttpClient.get<IFootballers[]>('https://localhost:44307/footballer/Getfootballers');
     }

     deleteFootballer(id: number): Observable<any> {

          return this.HttpClient.delete('https://localhost:44307/footballer/DeleteFootballer/' + id);
     }

     addNewFootballer(fotballer: IFootballers): Observable<any> {
          return this.HttpClient.post<IFootballers>('https://localhost:44307/footballer/AddNewFootballer', fotballer);
     }

     updateFootballer(footballer: IFootballers) {
          return this.HttpClient.put<IFootballers>('https://localhost:44307/footballer/UpdateFootballer', footballer)
     }

     //clubs service
     getClubs(): Observable<Club[]> {
          return this.HttpClient.get<Club[]>('https://localhost:44307/clubs/GetClubs');
     }

     deleteClub(id: number): Observable<any> {

          return this.HttpClient.delete('https://localhost:44307/clubs/DeleteClub/' + id);
     }

     addNewClub(club: Club): Observable<Club> {
          return this.HttpClient.post<Club>('https://localhost:44307/clubs/AddNewClub', club);
     }

     updateClub(club: Club) {
          return this.HttpClient.put<Club>('https://localhost:44307/clubs/UpdateClub', club)
     }
}