import {Component, OnInit} from '@angular/core';
import { Center } from "../model/center";
import { Photo } from "../model/photo";
import { FotoOlService } from "../foto-ol.service";
import { HighScore } from "../model/high-score";
import { Tour } from "../model/tour";
import { NgxSpinnerService } from 'ngx-spinner';

export enum FotoOlState {
  showHelp = 'showHelp',
  showFotos = 'showFotos',
  showHighScore ='showHighScore',
  showAllHighScore = 'showAllHighScore',
  showAdmin = 'showAdmin'
};

@Component({
  selector: 'app-foto-ol',
  templateUrl: './foto-ol.component.html',
  styleUrls: ['./foto-ol.component.css']
})
export class FotoOlComponent implements OnInit{
  photos: Photo[] | undefined;

  // aktuelle Koordinaten mit o,o initialisieren
  center: Center = {lng: 0, lat: 0, acc: 0};
  //letzte Distanz separat ausweisen
  lastDistance = 0;
  //Distanz und Richtung
  distanzRichtung: string = '';
  richtung: string = '';

  //Konfiguration
  skipMap = false;
  hintPenalty: number = 50;

  // Ablaufsteuerung
  FotoOlState = FotoOlState;
  state: string = FotoOlState.showHelp;
  showMap = false;
  showHint = false;
  amZiel= false;

  //score wird gefüllt und in DB highScore gespeichert
  score: HighScore = new HighScore();

  private sepChar: string = '';

  tourList: Tour[] | undefined;
  myTourScoreList: HighScore[] | undefined;

  protected readonly Math = Math;
  title: string = 'Foto-OL';

  constructor(
    private fotoOlService: FotoOlService,
    private spinner: NgxSpinnerService
    ) {
  }
  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loadTeamList();
    this.loadLocalStorrage();
    this.setCurrentCoordinates(true);
  }

  loadTeamList() {
    this.fotoOlService.getTour().subscribe((tourList)=> {
      this.tourList = tourList;
    })
  }

  loadPhotos(tourName: string) {
    console.log("loadPhotos(%s)", tourName);
    this.fotoOlService.findAllByTour(tourName).subscribe(photos => {
      this.photos = photos;
      //Koordinaten laden um distanz und Richtung zu berechnen
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          acc: position.coords.accuracy,
        };
        this.getDistanceFromLatLonInM(this.center);
      });
    });
  }

  loadLocalStorrage() {
    console.log('loadLocalStorrage() Lokal gespeicherte Werte laden');
    //------ zuerst tourName laden --------
    let tourName = localStorage.getItem('tourName')
    if (tourName) {
      this.score.tourName = tourName;
      //console.log('  load tourName=', tourName);
      this.loadPhotos(tourName);
      this.state = FotoOlState.showFotos;
      this.showMap = false;
      this.showHint = false;
    };
    //-----jetzt teamName mit tourName finden und gefundene myTour in score ------
    let teamName = localStorage.getItem('teamName')
    if (teamName) {
      this.score.teamName = teamName;
      //console.log('  load teamName=', this.score.teamName);
      this.fotoOlService.findTeamName(teamName).subscribe( (team) => {
        this.myTourScoreList = team;
        //console.log('  loaded tourList.lenght: ', team.length);
        //console.log('  loaded tourList[0]: ', team[0]);
        let myTour = team.find( team => {
          return team.tourName == tourName;
        })
        //console.log('  loaded tour: ', myTour);
        if (myTour) {
          this.score = myTour;
        } else {
          this.score.score = 0;
        }
        //console.log('  score:', this.score);

        //weitere gespeicherte Werte laden
        //-------------
        let index = localStorage.getItem('index');
        if (index) this.score.index = Number(index);
        //console.log('  load index=', this.score.index);
        //-------------
        let scoreId = localStorage.getItem('scoreId');
        if (scoreId) this.score.id = Number(scoreId);
        //console.log('  load scoreId=', this.score.id);
        //-------------
        let lastDistance = localStorage.getItem('lastDistance');
        if (lastDistance) {
          this.lastDistance = Number(lastDistance);
          this.sepChar = ', ';
        }
      });
    };
  }

  // Ablaufsteuerung
  show(state: string) {
    return this.state == state;
  }
  setTeamName(teamName: string) {
    if (teamName === 'admin') {
      this.state = FotoOlState.showAdmin
      this.score.teamName = '';
        localStorage.removeItem('teamName');
    } else {
      this.score.teamName = teamName;
      localStorage.setItem('teamName',teamName);
    }
  }

  /** OL Starten */
  start(tourName: string) {
    console.log("Starte Tour ", tourName);
    localStorage.setItem('tourName', tourName);
    this.loadPhotos(tourName);
    this.score.tourName = tourName;
    if (this.score.teamName != '') {
      this.state = FotoOlState.showFotos;
    }
  }

  /** URL zum aktuellen Bild. */
  getPhotoUrl() {
    if (this.photos && this.score.index < this.photos?.length) {
      return this.photos?.[this.score.index].photoUrl;
    }
    return '';
  }

  /** Aktuelle Koordinaten speichern. */
  setCurrentCoordinates(init: boolean) {
    this.spinner.show();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        acc: position.coords.accuracy,
      };
      //console.log("setCurrentCoordinates center:",this.center);
      if (init) {
        console.log("Ich starte hier: %0.6f, %0.6f", this.center.lat, this.center.lng);
      } else {
        if (this.skipMap) {
          this.nextPhoto();
        } else {
          this.spinner.hide();
          this.showMap = true;
        }
      }
    });
  }

  /** nächstes Foto anzeigen */
  nextPhoto() {
    this.spinner.show();
    localStorage.setItem('index', String(this.score.index+1));

    //Berechne Distanz zu aktuellem Foto
    this.lastDistance = this.getDistanceFromLatLonInM(this.center);
    localStorage.setItem('lastDistance', String(this.lastDistance));
    console.log("meine Koordinaten: %0.6f, %0.6f bei Bild %d. Distanz %dm", this.center.lat, this.center.lng, this.score.index+1, this.lastDistance);

    this.score.score += this.lastDistance;

    this.showHint = false;
    this.showMap = false;

    //History schreiben
    this.score.history = this.score.history + this.sepChar + this.lastDistance + 'm'
    this.sepChar = ', ';

    this.fotoOlService.saveScore(this.score).subscribe( (id: any) => {
      this.score.index ++;
      this.score.id = id;
      localStorage.setItem('scoreId', id)

      //sind wir am Ziel
      // @ts-ignore
      if (this.score.index >= this.photos.length) {
        this.doShowHighScore('one');
        this.amZiel = true;
        //gespeicherte Werte zurücksetzen
        localStorage.removeItem('tourName');
        localStorage.removeItem('index');
        localStorage.removeItem('scoreId');
        localStorage.removeItem('lastDistance');
        this.spinner.hide();
        return;
      }
      //Berechne die Distanz und Richtung zu neuem Foto
      this.getDistanceFromLatLonInM(this.center);
      console.log("Distanz %s zu Bild %d", this.distanzRichtung, this.score.index+1);
      console.log("index: %d, anzPhotos: %d", this.score.index, this.photos?.length)
    });

  }

  doShowHighScore(allHighScore: string) {
    if (allHighScore === 'all') {
      this.state = FotoOlState.showAllHighScore;
    } else {
      this.state = FotoOlState.showHighScore;
    }
  }

  /** Hilfetext anzeigen
   * Strafpunkte zum resultat hinzufügen
   */
  getHint() {
    if (!this.showHint) {
      this.score.score += this.hintPenalty;
    }
    this.showHint = true;
    return this.photos?(this.photos)[this.score.index].hint:'';
  }

  /** Bereschne die Distanz von deinem Standpunkt zu dem Foto
   * @return distanz in Meter
   */
  getDistanceFromLatLonInM(center: Center) {
    //const r = 6373.0;
    const lat1 = center.lat;
    const lat2 = this.photos?this.photos[this.score.index].lat:0;
    const lon1 = center.lng;
    const lon2 = this.photos?this.photos[this.score.index].lng:0;
    console.log("Koordinate Bild %s: %0.6f, %0.6f", this.score.index+1, this.photos?this.photos[this.score.index].lat:0, this.photos?this.photos[this.score.index].lng:0)

    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km

    let distanz: number = Math.trunc(d * 1000);

    //Richtung
    //console.log("dLat: %f / dLon: %f = %f", lat2-lat1, lon2-lon1, (lat2-lat1) / (lon2-lon1));
    //console.log("dLat: %f, dLon: %f = %f", dLat, dLon, dLat/dLon);
    this.richtung = this.getRichtung(dLon, dLat);
    this.distanzRichtung = distanz + "m in Richtung " + this.richtung;

    return distanz;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI/180)
  }

  setMyTourScoreList(scores: HighScore[]) {
    this.myTourScoreList = scores;
  }

  hasTour(tourName: string): boolean {
    if (this.score.teamName === '') return true;
    if (this.myTourScoreList) {
      let team = this.myTourScoreList.find((tour) => {
        return tour.tourName === tourName;
      });
      if (team) return true;
    }
    return false;
  }

  doShowHelp() {
    this.init();

    this.state = FotoOlState.showHelp;
    this.showMap = false;
    this.showHint = false;
    this.amZiel = false;

    this.score.index = 0;
    this.score.id = 0;
    this.score.history = '';
    this.sepChar = ''
    this.lastDistance = 0;
  }

  getRichtung(x: number, y: number): string {
    let rad = Math.atan(x/y);
    //console.log("Richtung rad", rad);

    let grad = rad * (180 / Math.PI);
    if (y < 0 && x >= 0) grad += 180;
    if (y < 0 && x < 0) grad += 180;
    if (y >= 0 && x < 0) grad += 360;

    //console.log("Richtung grad", grad);
    let pm = 11.25;
    if (grad > 360 - pm && grad <= 0 + pm) return "Nord";
    if (grad > 22.5 - pm && grad <= 22.5 + pm) return "Nordnordost";
    if (grad > 45 - pm && grad <= 45 + pm) return "Nordost";
    if (grad > 67.5 - pm && grad <= 67.5 + pm) return "Ostnordost";
    if (grad > 90 - pm && grad <= 90 + pm) return "Osten";
    if (grad > 112.5 - pm && grad <= 112.5 + pm) return "Ostsüdost";
    if (grad > 135 - pm && grad <= 135 + pm) return "Südost";
    if (grad > 157.5 - pm && grad <= 157.5 + pm) return "Südsüdost";
    if (grad > 180 - pm && grad <= 180 + pm) return "Süden";
    if (grad > 202.5 - pm && grad <= 202.5 + pm) return "Südsüdwest";
    if (grad > 225 - pm && grad <= 225 + pm) return "Südwest";
    if (grad > 247.5 - pm && grad <= 247.5 + pm) return "Westsüdwest";
    if (grad > 270 - pm && grad <= 270 + pm) return "Westen";
    if (grad > 292.5 - pm && grad <= 292.5 + pm) return "Westnordwest";
    if (grad > 315 - pm && grad <= 315 + pm) return "Nordwest";
    if (grad > 337.5 - pm && grad <= 337.5 + pm) return "Nordnordwest";
    return grad + '°';
  }

  setNewCenter(center: Center) {
    this.center = center;
  }
}
