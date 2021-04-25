import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { Subscription } from 'rxjs';
import { ToggleService } from '../service/toggle.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  disableEvents: boolean = false;
  subscription: Subscription;

  constructor(private toggleService: ToggleService) { }

  ngOnInit() {
    this.subscription = this.toggleService.currentEventToggleStatus.subscribe(disableEvents => this.disableEvents = disableEvents);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // generate box id as unique timestamp
  boxId: any = Date.now();
  @Input() zindex: number = 1;
  @Input() mtop = 0 ;
  @Input() mleft = 0 ;
  @Output() output = new EventEmitter();

  handleKeyboardEvent(event: KeyboardEvent) { 
    console.log(this.disableEvents);
    // if toggle is clicked(false value), do not move the box
    if(!this.disableEvents){
      return;
    }
    this.moveBox(event.key, (event.target as HTMLElement).id, event);
  }

  moveBox(key, id, event){
    var box = document.getElementById(id);
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
      case "Delete": box.outerHTML = ""; break;
      default: console.log(key +" pressed. Did nothing");
    }

  }


}
