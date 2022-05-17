import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateClubComponent } from './add-update-club.component';

describe('AddUpdateClubComponent', () => {
  let component: AddUpdateClubComponent;
  let fixture: ComponentFixture<AddUpdateClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateClubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
