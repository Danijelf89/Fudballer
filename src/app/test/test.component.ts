import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fu-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  pointsSum: number = 0;

  ngOnInit(): void {
  }

  payerForm = new FormGroup({
    points: new FormControl(Validators.required),
  });

  Addpoints(){
    this.pointsSum = this.pointsSum + this.payerForm.value.points;
  }

}
