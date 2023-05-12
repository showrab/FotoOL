import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { WebcamModule } from 'ngx-webcam';
import { AppComponent } from './app.component';
import { HelpComponent } from './help/help.component';
import { AppRoutingModule } from './app-routing.module';
import { FotoOlComponent } from './foto-ol/foto-ol.component';
import { MapComponent } from './map/map.component';
import { AdminComponent } from './admin/admin.component';
import { ZielComponent } from './ziel/ziel.component';
import { HintComponent } from './hint/hint.component';
import { TestComponent } from './test/test.component';
//import {AgmCoreModule} from "@agm/core"; // CLI imports AppRoutingModule

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    FotoOlComponent,
    MapComponent,
    AdminComponent,
    ZielComponent,
    HintComponent,
    TestComponent
  ],
  imports: [
    BrowserModule, GoogleMapsModule, WebcamModule, AppRoutingModule,
    // AgmCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
