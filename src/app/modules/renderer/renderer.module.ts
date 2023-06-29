import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererRoutingModule } from './renderer.routing.module';
import { AppUnityComponent } from './components/unity/unity.component';
import { UnityService } from './services/unity service/unity.service';
import { SendCustomEventString } from './models/SendCustomEvent';

@NgModule({
  declarations: [AppUnityComponent],
  imports: [CommonModule, RendererRoutingModule],
  exports: [AppUnityComponent],
  providers: [UnityService],
})
export class RendererModule {}

declare global {
  interface WindowEventMap {
    send: CustomEvent<SendCustomEventString>;
  }
}
