import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  boxId: any = Date.now();
  @Input() zindex: number = 1;
  @Input() mtop = 0 ;
  @Input() mleft = 0 ;
  @Output() output = new EventEmitter();

  logDetails(event){
    console.log(event);
    // console.log(event.target.id);
    
  }


}
