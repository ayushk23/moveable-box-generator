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
  }

  @ViewChild("boxContainer", { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  addBox() {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(BoxComponent);
    this.componentRef = this.container.createComponent(factory);

  }
  
  ngOnDestroy() {
    this.componentRef.destroy();    
  }

  deleteBox(){
    this.componentRef.destroy();
    this.ngOnDestroy();
  }

}
