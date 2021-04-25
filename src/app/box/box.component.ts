import { Component, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from '../constants';
import { ToggleService } from '../service/toggle.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  disableEvents: boolean = false;
  subscription: Subscription;
  // generate box id as unique timestamp
  boxId: any = Date.now();
  @Input() zindex: number = 1;
  // New box gets generated at a random margins for top and left
  @Input() mtop = 0 ;
  @Input() mleft = 0 ;
  colour = this.getRandomColour();

  constructor(private toggleService: ToggleService) { }

  ngOnInit() {
    this.subscription = this.toggleService.currentEventToggleStatus.subscribe(disableEvents => this.disableEvents = disableEvents);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleKeyboardEvent(event: KeyboardEvent) { 
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
      case "ArrowDown": this.mtop= (this.mtop+1)<Constants.MAX_TOP_MARGIN?this.mtop+1:this.mtop; 
                      box.style.marginTop = this.mtop.toString();
                      break;
      case "a":;
      case "A":;
      case "ArrowLeft": this.mleft= (this.mleft-1)>0?this.mleft-1:this.mleft; 
                      box.style.marginLeft = this.mtop.toString();
                      break;
      case "d":;
      case "D":;
      case "ArrowRight": this.mleft= (this.mleft+1)<Constants.MAX_LEFT_MARGIN?this.mleft+1:this.mleft;
                      box.style.marginLeft = this.mtop.toString(); 
                      break;
      case "Delete": box.parentElement.outerHTML = ""; break;
      default: console.log(key +" pressed. Did nothing"); break;
    }

  }

  getRandomColour(){
    let colourArray = ["#007bff", "#ff9400","#fffe00", "#28a745", "#dc3545", "#ffc107", "#17a2b8", "#263f58", "#ad6d6d"];
    return colourArray[Math.floor(Math.random()*colourArray.length)];
  }


}
