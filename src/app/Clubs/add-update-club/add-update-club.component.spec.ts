import { HttpClient } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isEqual } from 'igniteui-angular/lib/core/utils';
import { MatdialogMock } from 'src/app/shared/utmocks/matdialog-mock';
import { SnackBarMock } from 'src/app/snack-bar-mock';
import { Club } from '../club';
import { ClubDetailsComponent } from '../club-details/club-details.component';

import { AddUpdateClubComponent } from './add-update-club.component';

describe('AddUpdateClubComponent', () => {
  let component: AddUpdateClubComponent;
  let fixture: ComponentFixture<AddUpdateClubComponent>;

  const data = {
    club: {}, operation: 'Update club'
  };

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateClubComponent],
      providers: [{ provide: MatSnackBar, useClass: SnackBarMock }, { provide: HttpClient, useValue: {} }, { provide: MatDialog, useClass: MatdialogMock }, { provide: MAT_DIALOG_DATA, useValue: data }, { provide: MatDialogRef, useValue: dialogMock }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    // fixture = TestBed.createComponent(AddUpdateClubComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(AddUpdateClubComponent);
    component = fixture.componentInstance;
    component.data = {
      club: {}, operation: 'Update club'
    };
    console.log("ovo ej log testa", component.data)
    expect(component).toBeTruthy();
  });

  it('should be populated', () => {
    fixture = TestBed.createComponent(AddUpdateClubComponent);
    component = fixture.componentInstance;
    //let clubTest: Club = { id: 2, clubName: 'a sasasa', city: '44', founded: '444', owner: 'kkk', budget: 44, isDefault: false };
    //component.data.club = clubTest;
    component.ngOnInit();
    expect(component.operationsName).toBeDefined();
    expect(component.data).toBeDefined();

    console.log('component form', component.addUpdateForm.value);
    console.log('component data club', component.data.club);

    expect(component.addUpdateForm.value).toEqual(component.data.club);
  });

  it('should not be populated', () => {

    fixture = TestBed.createComponent(AddUpdateClubComponent);
    component = fixture.componentInstance;

    component.data.club = {};
    component.data.operation = 'Add new club';
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.operationsName).toBeDefined();
    expect(component.data).toBeDefined();
    expect(component.operationsName).toBe('Add new club');

    expect(component.addUpdateForm.valid).toBeFalsy();
  });

  it('should not be saved', () => {
    fixture = TestBed.createComponent(AddUpdateClubComponent);
    component = fixture.componentInstance;

    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    let spySnack = spyOn(component.snack, 'open').and.callThrough();

    //let clubTest: Club = { id: 2, clubName: '', city: '44', founded: '444', owner: 'kkk', budget: 44, isDefault: false };
    //component.addUpdateForm.patchValue(clubTest);

    console.log('componetn value', component.addUpdateForm.value);

    component.save();

    expect(component.addUpdateForm.valid).toBeFalse();
    expect(spySnack).toBeTruthy();

    expect(spy).toHaveBeenCalledTimes(0);
    expect(spySnack).toHaveBeenCalled();
  });

  it('should be saved', () => {
    fixture = TestBed.createComponent(AddUpdateClubComponent);
    component = fixture.componentInstance;

    let spy = spyOn(component.dialogRef, 'close').and.callThrough();
    let spySnack = spyOn(component.snack, 'open').and.callThrough();

    //let clubTest: Club = { id: 2, clubName: 'sasasa', city: '44', founded: '444', owner: 'kkk', budget: 44, isDefault: false };
    //component.addUpdateForm.patchValue(clubTest);

    component.save();

    expect(component.addUpdateForm.valid).toBeTrue();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spySnack).toHaveBeenCalledTimes(0);
  });

  it('should cancell', () => {

    fixture = TestBed.createComponent(AddUpdateClubComponent);
    component = fixture.componentInstance;

    let spy = spyOn(component.dialogRef, 'close').and.callThrough();

    component.cancel();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);

  })
});
