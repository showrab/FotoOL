import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Photo} from "../model/photo";
import {FotoOlService} from "../foto-ol.service";
import {Tour} from "../model/tour";

export enum AdminState {
  camera = 'camera',
  capturedPhoto = 'capturedPhoto',
  photoList = 'photoList',
  tourList = 'tourList',
  highScore = 'highScore',
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Output() start = new EventEmitter;

  // Ablaufsteuerung
  AdminState = AdminState;
  private state: string = AdminState.highScore;

  // Lists der Fotos vom Server
  photoList: Photo[] | undefined;
  // Liste der Touren
  tourList: Tour[] | undefined;
  // Foto mit Metadaten zum editieren
  photo: Photo = new Photo();


  constructor(private fotoOlService: FotoOlService) {}

  ngOnInit(): void {
    this.loadAllTours();
    this.doShowHighScore();
  }

  /**
   * lade Liste aller Fotos mit Metadaten
   */
  loadAllPhotos() {
    this.fotoOlService.findAll().subscribe(photos => {
      this.photoList = photos;
      this.photo.sortOrder = photos.length + 1;
    });
  }

  /**
   * lade Liste aller Touren
   */
  private loadAllTours() {
    this.fotoOlService.getTour().subscribe(tours => {
      this.tourList = tours;
      let defaultTour = tours.find( (tour ) => {
        return tour.hidden === false;
      })?.tourName;
      if (defaultTour) {
        this.photo.tourName = defaultTour;
      }
    });
  }

  // Ablaufsteuerung
  show(state: string) {
    return this.state == state;
  }
  doShowPhotoList() {
    this.loadAllPhotos();
    this.state = AdminState.photoList;
  }
  doShowCamera() {
    this.state = AdminState.camera;
  }
  doShowCapturedPhoto() {
    this.state = AdminState.capturedPhoto;
  }
  doShowHighScore() {
    this.state = AdminState.highScore;
  }
  doShowTourList() {
    this.loadAllTours();
    this.state = AdminState.tourList;
  }
  doCancelPhotoEdit() {
    this.doShowPhotoList();
  }
  doStartFotoOl() {
    this.start.emit();
  }

  // Foto von Kamera behandeln
  setCapturedPhoto(photo: string) {
    this.photo.photoUrl = photo;
    console.log("photo.length", this.photo.photoUrl.length);
    this.setCurrentCoordinates();

    this.doShowCapturedPhoto();
  }

  /**
   * Aktuelle Koordinaten speichern.
   * */
  setCurrentCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.photo.lat = position.coords.latitude;
      this.photo.lng = position.coords.longitude;
      this.photo.acuracy = position.coords.accuracy;
      console.log("Koordinaten %f, %f. Abweichung %0.0fm",this.photo.lng, this.photo.lat, this.photo.acuracy);
    });
  }

  /**
   * Foto mit Metadaten speichern
   * @param photo
   */
  savePhoto(photo: Photo) {
    //gibt es diese Tour schon?
    console.log("photo.tour: ", photo.tourName);
    let hasTour = this.tourList?.find((tour)=> {
      return tour.tourName === photo.tourName;
    })
    console.log("hasTour: ", hasTour);
    if (hasTour == undefined) {
      let tour: Tour = {
        id: 0,
        tourName: photo.tourName,
        hidden: false
      }
      console.log('Tour %s speichern', photo.tourName);
      this.fotoOlService.saveTour(tour).subscribe(()=> {
        console.log("saved tour: ", tour);
      });
    }

    console.log('Speichere neues Bild');
    this.fotoOlService.savePhoto(photo).subscribe((response) => {
      this.photo.hint = '';
      this.doShowPhotoList();
    });
  }

  /**
   * Lösche Photo
   * @param id
   */
  deletePhoto(id: number) {
    this.fotoOlService.deletePhoto(id).subscribe( () => {
      this.loadAllPhotos();
      this.doShowPhotoList();
    });
  }

  /**
   * Bearbeite Metadaten zu Foto
   * @param photo
   */
  editPhoto(photo: Photo) {
    console.log("photo {id: %d, tour: %s, hidden: %s, sortOrder: %d, lat: %f, lng: %f, hint: %s}",this.photoList?.[0].id, this.photoList?.[0].tourName, photo.hidden, photo.sortOrder, photo.lat, photo.lng, photo.hint)
    this.photo = photo;
    this.doShowCapturedPhoto();
  }

  /**
   * Selektierte Tabs anders färben
   * @param state
   */
  getClass(state: string): string {
    if (state === this.state) {
      return 'w3-bar-item w3-button w3-red';
    }
    return 'w3-bar-item w3-button';
  }
}
