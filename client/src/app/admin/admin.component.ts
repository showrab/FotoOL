import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { WebcamImage } from "ngx-webcam";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  @Output() adminPhoto = new EventEmitter;
  @Output() clearPhotos = new EventEmitter;
  showCapturedImage=false;

  // Kamera
  private trigger: Subject<any> = new Subject();
  //webcamImage = WebcamImage;
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';
  private video: HTMLElement | null | undefined;
  private canvas: HTMLElement | null | undefined;
  center: { lat: number; lng: number; } = {lng: 0, lat: 0};
  skipMap: any;
  hint: string = "";

  // Kamera
  initCamera() {
    //this.trigger.next(void 0);
    this.clearPhotos.emit();
  }
  
  public getSnapshot(): void {
    this.trigger.next(void 0);
    this.showCapturedImage = true;
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
    this.setCurrentCoordinates();
  }
  
  public get invokeObservable(): Observable<any> {
    let observable = this.trigger.asObservable();
    return observable;
  }
  
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  nextPhoto() {
    throw new Error('Method not implemented.');
  }

  /** Aktuelle Koordinaten speichern. */
  setCurrentCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log("setCurrentCoordinates center:",this.center);

      let photo = {
        photoUrl: this.sysImage,
        coordinates: this.center,
        hint: this.hint
      };

      //console.log(photo);
      this.adminPhoto.emit(photo);
    });
  }

  setHint(hint: string) {
    this.hint = hint;
  }
}
