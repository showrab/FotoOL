import { Component } from '@angular/core';
import {Center} from "../model/center";
import {Photo} from "../model/photo";
import {FotoOlService} from "../foto-ol.service";
import {HighScore} from "../model/high-score";
import {Tour} from "../model/tour";
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

export enum FotoOlState {
  showHelp = 'showHelp',
  showFotos = 'showFotos',
  amZiel = 'amZiel',
  showHighScore ='showHighScore',
  showAllHighScore = 'showAllHighScore',
  showAdmin = 'showAdmin'
};

@Component({
  selector: 'app-foto-ol',
  templateUrl: './foto-ol.component.html',
  styleUrls: ['./foto-ol.component.css']
})
export class FotoOlComponent {
  photos: Photo[] | undefined;

  // aktuelle Koordinaten mit o,o initialisieren
  center: Center = {lng: 0, lat: 0};
  //letzte Distanz separat ausweisen
  lastDistance = 0;

  //Konfiguration
  skipMap = true;
  hintPenalty: number = 10;

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

  constructor(
    private fotoOlService: FotoOlService,
    private spinner: NgxSpinnerService
    ) {
  }

  init() {
    this.loadTeamList();
    this.loadLocalStorrage();
  }

  loadPhotos(tourName: string) {
    this.fotoOlService.findAllByTour(tourName).subscribe(photos => {
      this.photos = photos;
    });
  }

  loadTeamList() {
    this.fotoOlService.getTour().subscribe((tourList)=> {
      this.tourList = tourList;
      //this.loadPhotos();
    })
  }

  loadLocalStorrage() {
    //------ zuerst tourName laden --------
    let tourName = localStorage.getItem('tourName')
    if (tourName) {
      this.score.tourName = tourName;
      console.log('load tourName=', tourName);
      this.loadPhotos(tourName);
      this.state = FotoOlState.showFotos;
      this.showMap = false;
      this.showHint = false;
    };
    //-----jetzt teamName mit tourName finden und gefundene myTour in score ------
    let teamName = localStorage.getItem('teamName')
    if (teamName) {
      this.score.teamName = teamName;
      console.log('load teamName=', this.score.teamName);
      this.fotoOlService.findTeamName(teamName).subscribe( (team) => {
        this.myTourScoreList = team;
        console.log('loaded tourList.lenght: ', team.length);
        let myTour = team.find( team => {
          return team.tourName == tourName;
        })
        console.log('loaded tour: ', myTour);
        if (myTour) {
          this.score = myTour;
        }

        //weitere gespeicherte Werte laden
        //-------------
        let index = localStorage.getItem('index');
        if (index) this.score.index = Number(index);
        console.log('load index=', this.score.index);
        //-------------
        let scoreId = localStorage.getItem('scoreId');
        if (scoreId) this.score.id = Number(scoreId);
        console.log('load scoreId=', this.score.id);
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
  setCurrentCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
//      console.log("setCurrentCoordinates center:",this.center);

      if (this.skipMap) {
        this.nextPhoto();
      } else {
        this.showMap = true;
      }
    });
  }

  /** nächstes Foto anzeigen */
  nextPhoto() {
    localStorage.setItem('index', String(this.score.index+1));

    this.lastDistance = this.getDistanceFromLatLonInM();
    localStorage.setItem('lastDistance', String(this.lastDistance));

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
      }
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
  getDistanceFromLatLonInM() {
    const r = 6373.0;
    const lat1 = this.center?.lat;
    const lat2 = this.photos?this.photos[this.score.index].lat:0;
    const lon1 = this.center?.lng;
    const lon2 = this.photos?this.photos[this.score.index].lng:0;

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
    return Math.trunc(d * 1000);
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
}
