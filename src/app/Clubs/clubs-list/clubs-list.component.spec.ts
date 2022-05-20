
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
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { atmDollar } from '@igniteui/material-icons-extended';



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
      providers: [{provide: MatDialogRef, useValue: {}}, 
        {provide: FootballersService, useClass : FootballersService }
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

    let proSpy = spyOn(service, 'getClubs').and.returnValue(of(mockList));
    let Spy = spyOn(app, 'getClubs').and.callThrough();

    
    app.ngOnInit();

    expect(Spy).toHaveBeenCalled();
    expect(Spy).toHaveBeenCalledTimes(1);
    expect(Spy).toHaveBeenCalledBefore(proSpy);

    expect(proSpy).toHaveBeenCalled();
    expect(proSpy).toHaveBeenCalledTimes(1);
    expect(app.clubs).toBeDefined();
    expect(app.clubs.length).toBeGreaterThan(0);
    expect(app.clubs.length).toBeGreaterThanOrEqual(proSpy.length);

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
    
  });

  it('should delete', ()=>{
    const fixture = TestBed.createComponent(ClubsListComponent);
    const app = fixture.componentInstance;

    let spy  = spyOn(app.mat, 'open')
    .and
    .returnValue({
        afterClosed: () => of(true)
    } as MatDialogRef<typeof app>);

app.deleteClub(mockList[0]);

expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledTimes(2);

  });

  it('should open details', ()=>{
    const fixture = TestBed.createComponent(ClubsListComponent);
    const app = fixture.componentInstance;

    let sp = spyOn(app.dialog, 'open');

    app.openDetails(mockList[0]);

    expect(sp).toHaveBeenCalled();
    expect(sp).toHaveBeenCalledTimes(1);
  });

  it('should call add', ()=>{
    const fixture = TestBed.createComponent(ClubsListComponent);
    const app = fixture.componentInstance;

    let spy  = spyOn(app.mat, 'open')
    .and
    .returnValue({
        afterClosed: () => of({item : mockList[0]}
         
        )
    } as MatDialogRef<typeof app>);

    console.log('add test', spy);

    let s = spyOn(app, 'add');

    app.addClub();

    expect(s).toHaveBeenCalled();
    expect(s).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call update', ()=>{
    const fixture = TestBed.createComponent(ClubsListComponent);
    const app = fixture.componentInstance;

    let spy  = spyOn(app.mat, 'open')
    .and
    .returnValue({
        afterClosed: () => of({item : mockList[0]}
         
        )
    } as MatDialogRef<typeof app>);

    let s = spyOn(app, 'update');

    app.updateClub(mockList[0]);

    expect(s).toHaveBeenCalled();
    expect(s).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  })
});
