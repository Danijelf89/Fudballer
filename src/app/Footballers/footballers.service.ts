import { Injectable } from "@angular/core";
import { IFootballers } from "./footballers.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Club } from "../Clubs/club";
import { environment } from "src/environments/environment";

@Injectable({
     providedIn: 'root'
})
export class FootballersService {

     constructor(private HttpClient: HttpClient) { }

     getFootballers(): Observable<IFootballers[]> {
          return this.HttpClient.get<IFootballers[]>(environment.getFootballerUrl);
     }

     deleteFootballer(id: number): Observable<any> {

          return this.HttpClient.delete(environment.deleteFootballerURL + id);
     }

     addNewFootballer(fotballer: IFootballers): Observable<any> {
          return this.HttpClient.post<IFootballers>(environment.addFootballerUrl, fotballer);
     }

     updateFootballer(footballer: IFootballers) {
          return this.HttpClient.put<IFootballers>(environment.updateFootballerUrl, footballer)
     }

     //clubs service
     getClubs(): Observable<Club[]> {
          return this.HttpClient.get<Club[]>(environment.getClubsUrl);
     }

     deleteClub(id: number): Observable<any> {

          return this.HttpClient.delete(environment.deleteClubUrl + id);
     }

     addNewClub(club: Club): Observable<Club> {
          return this.HttpClient.post<Club>(environment.addClubUrl, club);
     }

     updateClub(club: Club) {
          return this.HttpClient.put<Club>(environment.updateClubUrl, club)
     }
}