import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { SnackBarMock } from './snack-bar-mock';

describe('SnackBarMock', () => {
  it('should create an instance', () => {
    expect(new SnackBarMock()).toBeTruthy();
  });

  it('should return true', () => {
    let snack = new SnackBarMock();
    let spy = spyOn(snack, 'open').and.callThrough();

    let test = snack.open();
  
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(test).toBeDefined();

    let res = snack.open().close().subscribe(res =>{
      return res.valueOf();
    });

   expect(res.closed).toBeTrue()

  });
});
