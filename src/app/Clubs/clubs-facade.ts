import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs"
import { IFootballers } from "../Footballers/footballers.model"
import { FootballersService } from "../Footballers/footballers.service"
import { SpinnerComponentComponent } from "../shared/spinner-component/spinner-component.component"
import { Club } from "./club"

export interface ClubsState{
    clubs:Club[],
    footballers:IFootballers[],
}

let _state: ClubsState = {
    clubs:[],
    footballers:[],
}

@Injectable()
export class ClubsFacade {

    private store = new BehaviorSubject<ClubsState>(_state)
    private state$ = this.store.asObservable()

    private errorOccurredSubject = new BehaviorSubject<string>('')
    errorMessage$ = this.errorOccurredSubject.asObservable()

    clubs$ = this.state$.pipe(map( state => state.clubs), distinctUntilChanged())
    footballers$ = this.state$.pipe(map(state => state.footballers), distinctUntilChanged())

    constructor(private service: FootballersService, private router:Router){

        this.service.getClubs().subscribe(clubs => {
            this.updateState({..._state, clubs})
        })
    }

    getFootbalers(item: Club) {
        this.service.getClubsFootballers(item.id).subscribe(footballers =>{
            this.updateState({..._state, footballers})
        });
           
    }

    private updateState(state:ClubsState){
        console.log("updateState: ")
        console.table(state)
        this.store.next((_state = state))
    }

    updatClub(item : Club){
        this.service.updateClub(item).subscribe((res: Club) => {
           this.service.getClubs().subscribe(clubs =>{
               this.updateState({..._state, clubs})
              // return DataOperationResult.Done;
           })

        },
            (error: any) => {
               
                // return DataOperationResult.Error;
            }

        ).unsubscribe;
        // return listForupdate;
       // return DataOperationResult.None;
    }

   

    
}

export enum DataOperationResult {
   Done,
   Error,
   None
}
