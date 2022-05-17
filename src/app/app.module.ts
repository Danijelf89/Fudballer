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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DeleteComponent } from './shared/delete/delete.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SpinnerComponentComponent } from './shared/spinner-component/spinner-component.component';
import { StarcomponentComponent } from './shared/starcomponent/starcomponent.component';

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
    RouterModule.forRoot([
      { path: 'footballersList', component: FootballersList },
      { path: 'welcomePage', component: WelcomeComponent },
      { path: 'clubList', component: ClubsListComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [FootballersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
