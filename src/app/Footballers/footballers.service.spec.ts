import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { FootballersService } from './footballers.service';
import { IFootballers } from './footballers.model';
import { Club } from '../Clubs/club';

describe('TestserviceService', () => {
  let service: FootballersService;
  let control : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
     
    });

    

    service = TestBed.get(FootballersService);
    control = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resturn all from get clubs', () =>{

    const testGet : Club[] = [{id : 1, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false}];

    service.getClubs().subscribe((res) =>{
      expect(testGet).toBe(res, "isti su");
    });

    //pravi poziv i ocekuje rezultat jedan ili ni jedan
     const req = control.expectOne('https://localhost:44307/clubs/GetClubs');

     expect(req.cancelled).toBeFalsy();
     expect(req.request.responseType).toEqual('json');

     req.flush(testGet);
  })

  it('should fail', ()=>{
    const errMgsg = 'mock 404 error';

    service.getClubs().subscribe((res)=>{
      fail('with error 400');
    },
    (error : HttpErrorResponse) =>{
      expect(error.status).toEqual(404);
      expect(error.error).toEqual(errMgsg);
    }
    
    );

    const req = control.expectOne('https://localhost:44307/clubs/GetClubs');
    req.flush(errMgsg, {status : 404, statusText : 'Not Found'});
  });
});

