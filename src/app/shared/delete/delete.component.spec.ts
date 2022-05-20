import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatdialogMock } from '../utmocks/matdialog-mock';

import { DeleteComponent } from './delete.component';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteComponent ],
      providers: [MatDialogModule, { provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: dialogMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    
  });

  it('should create', () => {
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should set message and title', ()=>{
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;

    component.data.message = 'test';
    component.data.name = 'test name';

    component.ngOnInit();

    expect(component.name).toBeDefined();
    expect(component.name).toBe(component.data.name);
    expect(component.message).toBeDefined();
    expect(component.message).toBe(component.data.message);
  });

  it('should cancell', ()=>{
    
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    let spy = spyOn(dialogMock, 'close').and.callThrough();

    component.no();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);

  });

  it('should confirm', ()=>{
    
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    let spy = spyOn(dialogMock, 'close').and.callThrough();

    component.yes();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);

  });
});
