import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BoxComponent } from '../box/box.component';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    localStorage.setItem("zindex", "0");
  }

  @ViewChild("boxContainer", { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  addBox() {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(BoxComponent);
    this.componentRef = this.container.createComponent(factory);
    var zindex = parseInt(localStorage.getItem("zindex"));
    localStorage.setItem("zindex", ++zindex +"");
    this.componentRef.instance.zindex = zindex;
    //generate new box in only white area randomly
    this.componentRef.instance.mtop = this.getMargin(0,93);
    this.componentRef.instance.mleft = this.getMargin(0,77);

  }
  
  ngOnDestroy() {
    this.componentRef.destroy();    
  }

  getMargin(min, max) {
    return Math.random() * (max - min) + min;
  }

  deleteBox(){
    this.componentRef.destroy();
    this.ngOnDestroy();
  }

}
