# MoveableBoxGenerator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## App UI

![APP Interface](src/assets/BoxGeneratorUI.PNG?raw=true "App UI")

## How to use

:small_orange_diamond: Click `Add a Box` to generate a coloured box at a random place in white area.<br/>
:small_orange_diamond: Click on a box to select it.<br/>
:small_orange_diamond: Use arrow keys OR `W,A,S,D` to move the selected box inside the white area.<br/>
:small_orange_diamond: Press `Delete` key to delete the selected box.<br/>
:small_orange_diamond: Toggle keyboard controls using the toggle checkbox.<br/>

## Technical Specifications

### Creating Multiple Boxes

First, we create a `Box` component which will get rendered on UI. This accepts a z-index and margins
```javascript
  boxId: any = Date.now();
  @Input() zindex: number = 1;
  // New box gets generated at a random margins for top and left
  @Input() marginTop = 0 ;
  @Input() marginLeft = 0 ;
```
Our Box component is a button in which we assign dynamic values

```html
<button id={{boxId}} 
  [style.z-index]="zindex"
  [style.margin-left.vw]="marginLeft"
  [style.margin-top.vh]="marginTop"
  >
  {{zindex}}
</button>

```
Next, we need a container where we tell angular to create the new boxes. This will be like this. Notice the `#boxContainer`

```html
<div class="col-10">
    <template #boxContainer></template>
</div>
```

Now, we create a ref of this container in our canvas.component.ts file with `ViewChild ` decorator

```javascript
@ViewChild("boxContainer", { read: ViewContainerRef }) container;
```

`ViewContainerRef` is a reference to a container. It stores a reference to the template element and allws us to create components.<br />

```javascript
constructor(private resolver: ComponentFactoryResolver) {}
```

We'll also use `ComponentFactoryResolver` service which exposes a primary method named `resolveComponentFactory()` that takes a component and returns a `ComponentFactory`.<br />
<br />
This `ComponentFactory` exposes the `create()` method that will be used by the container `ViewContainerRef` to craete the container.
<br /><br />
Now, with all the services we are ready to create the boxes in our `addBox()` method.

```javascript
  addBox() {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(BoxComponent);
    this.componentRef = this.container.createComponent(factory);
    //generate new box in only white area randomly
    this.componentRef.instance.mtop = this.getMargin(0,Constants.MAX_TOP_MARGIN);
    this.componentRef.instance.mleft = this.getMargin(0,Constants.MAX_LEFT_MARGIN);
  }

```
The `resolveComponentFactory()` method takes a component and returns the solution to create a similar component.
We are calling the `createComponent()` method with the solution which will internally call the `create()` method from the factory and will append the component as a sibling to our container.





