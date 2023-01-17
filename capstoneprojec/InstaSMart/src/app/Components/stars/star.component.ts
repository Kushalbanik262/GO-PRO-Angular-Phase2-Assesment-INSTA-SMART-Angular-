import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit,OnChanges {

  @Input() star:number = 0; //Getting The Input as Rating
  width:number = 75;//The Total width
  constructor() { }

  ngOnInit(): void {
  }

  /**
   *
   * @param changes The Changes
   */
  ngOnChanges(changes: SimpleChanges): void {

    this.width =  this.star *15; //Calculating The Width
    console.log(this.width);

  }

}
