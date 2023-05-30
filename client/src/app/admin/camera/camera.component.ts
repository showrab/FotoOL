import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {WebcamImage} from "ngx-webcam";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @Output() photo = new EventEmitter;

  private trigger: Subject<any> = new Subject();

  // Kamera
  public webcamImage!: WebcamImage;
  sysImage: string = '';
  public innerWidth: any;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log('innerWidth: ', this.innerWidth)
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
    this.photo.emit(this.sysImage)
  }

  public get invokeObservable(): Observable<any> {
    let observable = this.trigger.asObservable();
    return observable;
  }

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }
}
