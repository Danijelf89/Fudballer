import { Injectable } from "@angular/core";
import { IFootballers } from "./footballers.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Club } from "../Clubs/club";
import { environment } from "src/environments/environment";
import { User } from "../users/user";

@Injectable({
     providedIn: 'root'
})
export class FootballersService {

     constructor(private HttpClient: HttpClient) { }

     getFootballers(): Observable<IFootballers[]> {
          return this.HttpClient.get<IFootballers[]>(environment.getFootballerUrl);
     }

     deleteFootballer(id: number): Observable<any> {
          console.log('http client', this.HttpClient.request);
          return this.HttpClient.delete(environment.deleteFootballerURL + id);
     }

     addNewFootballer(fotballer: IFootballers): Observable<any> {
          return this.HttpClient.post<IFootballers>(environment.addFootballerUrl, fotballer);
     }

     updateFootballer(footballer: IFootballers): Observable<any> {
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

     updateClub(club: Club): Observable<any> {
          return this.HttpClient.put<Club>(environment.updateClubUrl, club)
     }

     getClubsFootballers(clubId: number): Observable<IFootballers[]> {
          return this.HttpClient.get<IFootballers[]>(environment.getClubsFootbalersUrl + clubId);
     }

     getAuthorisation(data: any): Observable<any> {
          return this.HttpClient.post<any>("https://localhost:44307/auth/login", data);
     }

     //users
     getUsers(): Observable<User[]> {
          return this.HttpClient.get<User[]>(environment.getUsersUrl);
     }
     addNewUser(user: User): Observable<User> {
          console.log('na servisu add', user);
          return this.HttpClient.post<User>(environment.addNewUserUrl, user);
     }
     updateUser(user: User): Observable<any> {
          return this.HttpClient.put<User>(environment.updateUser, user)
     }

     deleteUser(id: number): Observable<any> {

          return this.HttpClient.delete(environment.deleteUser + id);
     }

}