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
   
  });

  it('should create', () => {
    fixture = TestBed.createComponent(StarcomponentComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should change', ()=>{
    fixture = TestBed.createComponent(StarcomponentComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    component.rating = 4;

    component.ngOnChanges();

    expect(component.cropWidth).toBeDefined();
    expect(component.cropWidth).toBeGreaterThan(0);
  });


  it('should show starts', ()=>{
    fixture = TestBed.createComponent(StarcomponentComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    component.rating = 4;

    component.ngOnChanges();

    expect(component.hideStars).toBeDefined();
    expect(component.hideStars).toBeFalse()
  });

  it('should hide starts', ()=>{
    fixture = TestBed.createComponent(StarcomponentComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
    component.rating = 0;

    component.ngOnChanges();

    expect(component.hideStars).toBeDefined();
    expect(component.hideStars).toBeTrue()
  });
});
