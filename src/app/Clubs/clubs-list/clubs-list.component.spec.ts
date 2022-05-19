
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Club } from '../club';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClubsListComponent } from './clubs-list.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FootballersService } from 'src/app/Footballers/footballers.service';
import { EMPTY, of } from 'rxjs';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatdialogMock } from 'src/app/shared/utmocks/matdialog-mock';



const moc : Club[] = [{id : 1, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false}];


describe('ClubsListComponent', () => {
  let component: ClubsListComponent;
  let fixture: ComponentFixture<ClubsListComponent>;
  let mockList: Club[] = [{id : 1, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false}];
  let service: FootballersService;

  //const spySampleService = jasmine.createSpyObj('FootballersService', ['getClubs']);

 
  let club: Club;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ ClubsListComponent ],
      imports: [
        HttpClientTestingModule 
      ],

      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [FootballersService ,{provide: MatDialogRef, useValue: {}}, 
        {provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>(['get']) }
        , { provide: MatSnackBar, useValue: {} }, { provide: MatDialog, useClass: MatdialogMock }]
    })
    .compileComponents();

    service = TestBed.get(FootballersService);
  });

  beforeEach(() => {
   // fixture = TestBed.createComponent(ClubsListComponent);
    //component = fixture.componentInstance;
   // fixture.detectChanges();
    service = TestBed.get(FootballersService);
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ClubsListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();

    //let proSpy = spyOn(service, 'getClubs').and.returnValue(of(mockList));
   //fixture.detectChanges();

    //expect(proSpy).toHaveBeenCalled();

   console.log('appFootballer',app.clubs);
   console.log('mock',mockList);

   //expect(app.clubs.length).toBeGreaterThan(0);
    //expect(dialog.open.calls.count()).toBe(1);
  });

  it('should get clubs',() =>{
    
    const fixture = TestBed.createComponent(ClubsListComponent);
    const app = fixture.componentInstance;

   
    let proSpy = spyOn(service, 'getClubs').and.returnValue(of(mockList));
    

    
    app.getClubs();

    expect(proSpy).toHaveBeenCalled();
    expect(proSpy).toHaveBeenCalledTimes(1);
    expect(app.clubs).toBeDefined();
    expect(app.clubs.length).toBeGreaterThan(0);
    expect(app.clubs.length).toBeGreaterThanOrEqual(proSpy.length);
    
  })
});
