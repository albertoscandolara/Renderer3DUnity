import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RendererModule } from './modules/renderer/renderer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RendererModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
