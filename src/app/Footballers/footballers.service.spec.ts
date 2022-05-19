import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { FootballersService } from './footballers.service';
import { IFootballers } from './footballers.model';
import { Club } from '../Clubs/club';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

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
    
    //let spy = spyOn(service, 'getClubs').and.returnValue(of(testGet));
    

    service.getClubs().subscribe((res) =>{
      expect(testGet).toBe(res);
    });

    //pravi poziv i ocekuje rezultat jedan ili ni jedan
    const req = control.expectOne(environment.getClubsUrl);

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

    const req = control.expectOne(environment.getClubsUrl);
    req.flush(errMgsg, {status : 404, statusText : 'Not Found'});
  });

  it('should delete club', ()=>{
    let testGet : Club[] = [{id : 1, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false},
    {id : 2, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false}];

    let deletItem : Club = {id : 1, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false};

    service.deleteClub(1).subscribe((res) =>{
        expect(deletItem).toBe(res);
      });

      testGet.splice(0,1);
     
      for(let item of testGet)
      {
        expect(item).not.toEqual(deletItem);
      }

      const req = control.expectOne(environment.deleteClubUrl + deletItem.id);

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');
 
      req.flush(deletItem);
  });

  it('should add club', ()=>{

    let testGet : Club[] = [{id : 1, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false},
    {id : 2, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false}];

    let club : Club = {id : 3, clubName : 'a', city : '44', founded : '444', owner : 'kkk', budget : 44, isDefault : true};

    
    service.addNewClub(club).subscribe((res) =>{
        expect(club).toBe(res);

        console.log('rezultat je add', res);
      });

      testGet.push(club);

      expect(testGet).toContain(club);

      const req = control.expectOne(environment.addClubUrl);

      expect(req.cancelled).toBeFalsy();
      expect(req.request.responseType).toEqual('json');
 
      req.flush(club);
  });

  it('should update club', ()=>{
    let club : Club = {id : 2, clubName : 'a sasasa', city : '44', founded : '444', owner : 'kkk', budget : 44, isDefault : true};

    let testGet : Club[] = [{id : 1, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false},
    {id : 2, clubName : 'name', city : 'sasa', founded : 'jjj', owner : 's', budget : 44, isDefault : false}];

   

    service.updateClub(club).subscribe((res) =>{
        expect(club).toBe(res);

        console.log('rezultat je add', res);
      });

     testGet[club.id] = club;
     expect(club).toEqual(testGet[club.id]);

     const req = control.expectOne(environment.updateClubUrl);

     expect(req.cancelled).toBeFalsy();
     expect(req.request.responseType).toEqual('json');

     req.flush(club);
  });
});

