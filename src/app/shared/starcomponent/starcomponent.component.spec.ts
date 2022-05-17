import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarcomponentComponent } from './starcomponent.component';

describe('StarcomponentComponent', () => {
  let component: StarcomponentComponent;
  let fixture: ComponentFixture<StarcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
