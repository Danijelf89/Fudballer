import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'fu-starcomponent',
  templateUrl: './starcomponent.component.html',
  styleUrls: ['./starcomponent.component.css']
})
export class StarcomponentComponent implements OnChanges {

  @Input() rating: number = 0;

  cropWidth: number = 0;

  hideStars: boolean = this.rating == 0 ? true : false;

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75 / 5;
    this.hideStars = this.rating == 0 || this.rating == null ? true : false;
  }
}

