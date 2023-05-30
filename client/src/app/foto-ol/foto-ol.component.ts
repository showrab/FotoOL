import { Component, Input } from '@angular/core';
import {Center} from "../model/center";
import {Photo} from "../model/photo";
import {FotoOlService} from "../foto-ol.service";
import {HighScore} from "../model/high-score";
import {Tour} from "../model/tour";

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
  teamName: string = '';
  tourName: string = '';

  photos: Photo[] | undefined;
  // Index des zu suchenden Fotos
  index = 0;

  // aktuelle Koordinaten mit o,o initialisieren
  center: Center = {lng: 0, lat: 0};
  // Strafpunkte (Summe der Distanz in Meter von den Foto-Koordinaten).
  result = 0;
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

  //upload
  private lastHistory: string = '';
  private sepChar: string = '';
  private scoreId: number = 0;
  tourList: Tour[] | undefined;
  teamError: HighScore[] | undefined;


  constructor(private fotoOlService: FotoOlService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loadTeamList();

    this.state = FotoOlState.showHelp;
    this.showMap = false;
    this.showHint = false;
    this.amZiel = false;

    this.index = 0;
    this.lastHistory = '';
    this.scoreId = 0;
    this.sepChar = ''

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
    let teamName = localStorage.getItem('teamName')
    if (teamName) {
      this.teamName = teamName;
      this.fotoOlService.findTeamName(teamName).subscribe( (team) => {
        this.teamError = team;
      });
      console.log('load teamName=', this.teamName);
    };
    let index = localStorage.getItem('index');
    if (index) {
      this.index = Number(index);
      console.log('load index=', this.index);
    };
    let scoreId = localStorage.getItem('scoreId');
    if (scoreId) {
      this.scoreId = Number(scoreId);
      console.log('load scoreId=', this.scoreId);
    }
    let tourName = localStorage.getItem('tourName')
    if (tourName) {
      this.tourName = tourName;
      console.log('load tourName=', this.tourName);
      this.loadPhotos(tourName);
      this.state = FotoOlState.showFotos;
      this.showMap = false;
      this.showHint = false;
      return;
    };
  }

  // Ablaufsteuerung
  show(state: string) {
    return this.state == state;
  }
  setTeamName(teamName: string) {
    if (teamName === 'admin') {
      this.state = FotoOlState.showAdmin
      this.teamName = '';
        localStorage.removeItem('teamName');
    } else {
      this.teamName = teamName;
      localStorage.setItem('teamName',teamName);
    }
  }

  /** OL Starten */
  start(tourName: string) {
    localStorage.setItem('tourName', tourName);
    this.loadPhotos(tourName);
    this.tourName = tourName;
    if (this.teamName != '') {
      this.state = FotoOlState.showFotos;
    }
  }

  /** URL zum aktuellen Bild. */
  getPhotoUrl() {
    if (this.photos && this.index < this.photos?.length) {
      return this.photos?.[this.index].photoUrl;
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
    localStorage.setItem('index', String(this.index+1));
    this.lastDistance = this.getDistanceFromLatLonInM();
    this.result += this.lastDistance;

    this.showHint = false;
    this.showMap = false;

    //History schreiben
    this.lastHistory = this.lastHistory + this.sepChar + this.lastDistance + 'm'
    this.sepChar = ', ';
    let score: HighScore = {
      id: this.scoreId,
      tourName: this.tourName,
      index: this.index,
      teamName: this.teamName,
      score: this.result,
      history: this.lastHistory
    };
    this.fotoOlService.saveScore(score).subscribe( (id: any) => {
      this.index ++;
      this.scoreId = id;
      localStorage.setItem('scoreId', id)

      //sind wir am Ziel
      // @ts-ignore
      if (this.index >= this.photos.length) {
        this.doShowHighScore('one');
        this.amZiel = true;
        //gespeicherte Werte zurücksetzen
        localStorage.removeItem('tourName');
        localStorage.removeItem('index');
        localStorage.removeItem('scoreId');
      }
      console.log("index: %d, anzPhotos: %d", this.index, this.photos?.length)
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
      this.result += this.hintPenalty;
    }
    this.showHint = true;
    return this.photos?(this.photos)[this.index].hint:'';
  }

  /** Bereschne die Distanz von deinem Standpunkt zu dem Foto
   * @return distanz in Meter
   */
  getDistanceFromLatLonInM() {
    const r = 6373.0;
    const lat1 = this.center?.lat;
    const lat2 = this.photos?this.photos[this.index].lat:0;
    const lon1 = this.center?.lng;
    const lon2 = this.photos?this.photos[this.index].lng:0;

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

  setTeamError(err: HighScore[]) {
    this.teamError = err;
  }

  hasTour(tourName: string): boolean {
    if (this.teamError) {
      let team = this.teamError.find((tour) => {
        return tour.tourName === tourName;
      });
      if (team) return true;
    }
    return false;
  }

  doShowHelp() {
    this.init();
  }
}
