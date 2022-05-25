import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FootballersList } from './Footballers/footballers-list/footballers-list.component';
import { AddOrUpdateFootballer } from './Footballers/add-update-footballer/add-update-footballer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FootballersService } from './Footballers/footballers.service';
import { HttpClientModule } from '@angular/common/http';
import { FootballerDetails } from './Footballers/footballer-details/footballer-details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { IgxComboModule } from "igniteui-angular";
import { ClubsListComponent } from './Clubs/clubs-list/clubs-list.component';
import { ClubDetailsComponent } from './Clubs/club-details/club-details.component';
import { AddUpdateClubComponent } from './Clubs/add-update-club/add-update-club.component';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DeleteComponent } from './shared/delete/delete.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { SpinnerComponentComponent } from './shared/spinner-component/spinner-component.component';
import { StarcomponentComponent } from './shared/starcomponent/starcomponent.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SettingsComponent } from './settings/settings.component';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import { AuthguardService } from './authguard.service';

export function tokkentGetter(){
  return localStorage.getItem("jwt")
}

@NgModule({
  declarations: [
    AppComponent,
    FootballersList,
    AddOrUpdateFootballer,
    FootballerDetails,
    WelcomeComponent,
    ClubsListComponent,
    ClubDetailsComponent,
    AddUpdateClubComponent,
    DeleteComponent,
    SpinnerComponentComponent,
    StarcomponentComponent,
    SettingsComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    IgxComboModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule.forRoot([
      { path: 'welcomePage/footballersList', component: FootballersList , canActivate: [AuthguardService]},
      { path: 'welcomePage', component: WelcomeComponent , canActivate: [AuthguardService]},
      { path: 'welcomePage/clubList', component: ClubsListComponent , canActivate: [AuthguardService]},
      { path: 'logIn', component: LoginComponent},
    ]),

    JwtModule.forRoot({
        config:{
          tokenGetter : tokkentGetter,
          allowedDomains : ["localhost:44307"],
          disallowedRoutes : []
        }
    }),
    BrowserAnimationsModule
  ],
  providers: [FootballersService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
