import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { BoxComponent } from './box/box.component';
import { ToggleService } from './service/toggle.service';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ ToggleService ],
  bootstrap: [AppComponent],
  entryComponents: [BoxComponent]
})
export class AppModule { }
