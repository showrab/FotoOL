import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { AppComponent } from './app.component';
import { HelpComponent } from './help/help.component';
import { FotoOlComponent } from './foto-ol/foto-ol.component';
import { MapComponent } from './map/map.component';
import { AdminComponent } from './admin/admin.component';
import { ZielComponent } from './ziel/ziel.component';
import { HintComponent } from './hint/hint.component';
import { TestComponent } from './test/test.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PhotosListComponent } from './admin/photos-list/photos-list.component';
import { FormsModule } from "@angular/forms";
import { CameraComponent } from './admin/camera/camera.component';
import { PhotoEditComponent } from './admin/photo-edit/photo-edit.component';
import { TourComponent } from './admin/tour/tour.component';
import { ENVIRONMENT } from "./environment.service";
import { environment } from "../environments/environment";
import { AllHighScoreComponent } from './all-high-score/all-high-score.component';
import { InterceptorService } from './interceptor.service';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    FotoOlComponent,
    MapComponent,
    AdminComponent,
    ZielComponent,
    HintComponent,
    TestComponent,
    PhotosListComponent,
    CameraComponent,
    PhotoEditComponent,
    TourComponent,
    AllHighScoreComponent,
  ],
  imports: [
    BrowserModule,
    WebcamModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: ENVIRONMENT, useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
