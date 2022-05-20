import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { Club } from '../Clubs/club';
import { FootballersService } from '../Footballers/footballers.service';
import { SnackBarMock } from '../snack-bar-mock';
import { Base } from './base';
import { MatdialogMock } from './utmocks/matdialog-mock';

describe('Base', () => {
 
  let service: FootballersService;
  let s : MatSnackBar;
  let m  :  MatDialog;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
     
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

  it('should delete',()=>{

    const injector = Injector.create({ providers: [{ provide: MatDialog, useClass: MatdialogMock }] });
    const dialog: MatDialog = injector.get(MatDialog);

    const injectorsna = Injector.create({ providers: [{ provide: MatSnackBar, useClass: SnackBarMock}] });
    const sna: MatSnackBar = injectorsna.get(MatSnackBar);

    let b = new Base(dialog ,sna);

    let club : Club = {id : 2, clubName : 'a sasasa', city : '44', founded : '444', owner : 'kkk', budget : 44, isDefault : true};

    let testGet : Club[] = [{id : 1, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false},
    {id : 2, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false}];

    

    let proSpy = spyOn(service, 'deleteClub').and.returnValue(of(club));

    let sp = spyOn(b.dialog, 'open').and.callThrough();
    let spSnack = spyOn(b.snackBar, 'open').and.callThrough();
    
    let spinnerCloseSpy = spyOn(b, 'closeSpinner').and.callThrough();
    let spinnerOpenSpy = spyOn(b, 'startSpinner').and.callThrough();

    let returnedList : Club[] = [];

    returnedList =  b.delete(service.deleteClub(club.id),testGet, club.id);

    expect(proSpy).toHaveBeenCalled();
    expect(proSpy).toHaveBeenCalledTimes(1);

    expect(sp).toHaveBeenCalled();
    expect(sp).toHaveBeenCalledTimes(1);

    expect(spSnack).toHaveBeenCalled();
    expect(spSnack).toHaveBeenCalledTimes(1);

    expect(testGet).toEqual(returnedList);

    expect(spinnerCloseSpy).toHaveBeenCalled();
    expect(spinnerCloseSpy).toHaveBeenCalledTimes(1);

    expect(spinnerOpenSpy).toHaveBeenCalled();
    expect(spinnerOpenSpy).toHaveBeenCalledTimes(1);

    expect(spinnerOpenSpy).toHaveBeenCalledBefore(spinnerCloseSpy);
  });

  it('should fail', ()=>{

    const injector = Injector.create({ providers: [{ provide: MatDialog, useClass: MatdialogMock }] });
    const dialog: MatDialog = injector.get(MatDialog);

    const injectorsna = Injector.create({ providers: [{ provide: MatSnackBar, useClass: SnackBarMock}] });
    const sna: MatSnackBar = injectorsna.get(MatSnackBar);

    let b = new Base(dialog ,sna);

    let club : Club = {id : 2, clubName : 'a sasasa', city : '44', founded : '444', owner : 'kkk', budget : 44, isDefault : true};

    let testGet : Club[] = [{id : 1, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false},
    {id : 2, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false}];
    
   let returnedList : Club[] = [];
   

   let mockCall = spyOn(service,'deleteClub').and.returnValue(throwError({status : 404}));
    
    returnedList =  b.delete(service.deleteClub(club.id),testGet, club.id);

    expect(mockCall).toHaveBeenCalled();
  });
});
