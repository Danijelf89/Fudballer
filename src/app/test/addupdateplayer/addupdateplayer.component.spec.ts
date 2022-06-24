import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateplayerComponent } from './addupdateplayer.component';

describe('AddupdateplayerComponent', () => {
  let component: AddupdateplayerComponent;
  let fixture: ComponentFixture<AddupdateplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddupdateplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddupdateplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
