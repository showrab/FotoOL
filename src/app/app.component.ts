import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
//import {getAllTags, getData, getTag} from "exif-js";
import * as EXIF from 'exifr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  output: any;
  ngAfterViewInit(): void {
    this.getExif();
  }
  title = 'Foto Orientierungslauf 2023';



  // Kamera
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';
  private video: HTMLElement | null | undefined;
  private canvas: HTMLElement | null | undefined;

  ngOnInit() {

    //this.initCamera();

    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.center = {
    //     lat: position.coords.latitude,
    //     lng: position.coords.longitude,
    //     //lat: 46.76213,
    //     //lng: 7.63025
    //   };
    // });

    // this.video = document.getElementById("video");
    // this.canvas = document.getElementById("canvas");
  }
  //
  // initCamera() {
  //   // Get the video element and canvas
  //   navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
  //     // @ts-ignore
  //     video.srcObject = stream;
  //     // @ts-ignore
  //     video.play();
  //   });
  // }
  takePicture() {
    // // When the user clicks the "Take Picture" button, capture a still image from the video stream and upload it to the server
    // // @ts-ignore
    //   this.canvas.width = this.video.videoWidth;
    //   // @ts-ignore
    // this.canvas.height = this.video.videoHeight;
    //   // @ts-ignore
    // this.canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

      // // Convert the canvas image to a blob
      // this.canvas.toBlob(function (blob) {
      //   // Create a FormData object and append the blob to it
      //   var formData = new FormData();
      //   formData.append("picture", blob);
      //
      //   // Send the FormData to the server using an AJAX request
      //   var xhr = new XMLHttpRequest();
      //   xhr.open("POST", "upload.php");
      //   xhr.send(formData);
      //
      //   // Display a message to the user
      //   alert("Picture uploaded successfully!");
      //
      //   // Stop the media stream
      //   stream.getTracks().forEach(function (track) {
      //     track.stop();
      //   });
      // }, "image/png");

  }

  initMap() {
    // Initialize the map here
    // this.googleMap = new google.maps.Map(document.getElementById("map"), {
    //   center: { lat: 46.76213, lng: 7.63025 },
    //   zoom: 20,
    // });
  }



  // Kamera
  public getSnapshot(): void {
    this.trigger.next(void 0);
    //this.getCoordinates();
  }
  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }
  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  //Exif
  getExif() {
    // const img1 = document.getElementById("img1");
    // // @ts-ignore
    //   const make = EXIF.getTag(img1, "Make");
    //   const model = EXIF.getTag(img1, "Model");
    //   const makeAndModel = document.getElementById("makeAndModel");
    //   makeAndModel!.innerHTML = `${make} ${model}`;
    //
    // const img2 = document.getElementById("img2");
    // // @ts-ignore
    //   const allMetaData = EXIF.getAllTags(img2);
    //   const allMetaDataSpan = document.getElementById("allMetaDataSpan");
    //   allMetaDataSpan!.innerHTML = JSON.stringify(allMetaData, null, "\t");
  }
  @ViewChild('img') imgEl: ElementRef | undefined;

  async getExif2() {
    let allMetaData: any;
    let img1 = document.getElementById("img1");
    let {latitude, longitude} = await EXIF.gps('assets/images/lucas.jpeg');
    this.output = latitude;
    console.log(latitude);

  }


}
