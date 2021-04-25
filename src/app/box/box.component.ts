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
  // geenrate box id as unique timestamp
  boxId: any = Date.now();
  @Input() zindex: number = 1;
  @Input() mtop = 0 ;
  @Input() mleft = 0 ;
  @Output() output = new EventEmitter();

  logDetails(event){
    // console.lsog(event);
    // console.log(event.target.id);
  }

  handleKeyboardEvent(event: KeyboardEvent) { 
    console.log(event);
    console.log((event.target as HTMLElement).id);
    this.moveBox(event.key, (event.target as HTMLElement).id, event);
  }

  moveBox(key, id, event){
    // console.log(key , "pressed with id"+id );
    // console.log(event.target.id);
    var box = document.getElementById(id);
    console.log(box);
    switch(key){
      case "w":;
      case "W":;
      case "ArrowUp": this.mtop= (this.mtop-1)>0?this.mtop-1:this.mtop; 
                      box.style.marginTop = this.mtop.toString();
                      break;
      case "s":;
      case "S":;
      case "ArrowDown": this.mtop= (this.mtop+1)<93?this.mtop+1:this.mtop; 
                      box.style.marginTop = this.mtop.toString();
                      break;
      case "a":;
      case "A":;
      case "ArrowLeft": this.mleft= (this.mleft-1)>0?this.mleft-1:this.mleft; 
                      box.style.marginLeft = this.mtop.toString();
                      break;
      case "d":;
      case "D":;
      case "ArrowRight": this.mleft= (this.mleft+1)<77?this.mleft+1:this.mleft;
                      box.style.marginLeft = this.mtop.toString(); 
                      break;
      default: console.log(key +" pressed. did nothing");
    }
    



  }


}
