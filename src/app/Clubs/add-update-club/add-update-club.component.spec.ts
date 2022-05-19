import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClubDetailsComponent } from '../club-details/club-details.component';

import { AddUpdateClubComponent } from './add-update-club.component';

describe('AddUpdateClubComponent', () => {
  let component: AddUpdateClubComponent;
  let fixture: ComponentFixture<AddUpdateClubComponent>;

  const data = {
    club: {}, operation: 'Update club'
 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateClubComponent ],
      providers: [MatDialogModule, { provide: HttpClient, useValue: {} },{ provide: MatSnackBar, useValue: {} }, { provide: MatDialog, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: data }, { provide: MatDialogRef, useValue: {} }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.data = {
      club: {}, operation: 'Update club'
   };
    console.log("ovo ej log testa", component.data)
    expect(component).toBeTruthy();
  });

  it('should be populated', () =>{
    component.ngOnInit();
    expect(component.operationsName).toBeDefined();
    
  });
});
