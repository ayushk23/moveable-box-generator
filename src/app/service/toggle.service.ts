import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable()
export class ToggleService{

    constructor(){  }

    
  private enableEvents = new BehaviorSubject(true);
  currentEventToggleStatus = this.enableEvents.asObservable();

  toggleEvent(message: boolean) {
    this.enableEvents.next(message);
  }

}