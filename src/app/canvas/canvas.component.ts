import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BoxComponent } from '../box/box.component';
import { Constants } from '../constants';
import { ToggleService } from '../service/toggle.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  disableEvents: boolean = false;
  subscription: Subscription;

  constructor(private resolver: ComponentFactoryResolver, private toggleService: ToggleService) { }

  ngOnInit() {
    localStorage.setItem("zindex", "0");
    this.subscription = this.toggleService.currentEventToggleStatus.subscribe(disableEvents => this.disableEvents = disableEvents);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @ViewChild("boxContainer", { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  eventToggler(event){
    this.disableEvents = !this.disableEvents;
    this.toggleService.toggleEvent(this.disableEvents);
  }

  addBox() {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(BoxComponent);
    this.componentRef = this.container.createComponent(factory);
    var zindex = parseInt(localStorage.getItem("zindex"));
    localStorage.setItem("zindex", ++zindex +"");
    this.componentRef.instance.zindex = zindex;
    //generate new box in only white area randomly
    this.componentRef.instance.mtop = this.getMargin(0,Constants.MAX_TOP_MARGIN);
    this.componentRef.instance.mleft = this.getMargin(0,Constants.MAX_LEFT_MARGIN);

  }

  getMargin(min, max) {
    return Math.random() * (max - min) + min;
  }


}
