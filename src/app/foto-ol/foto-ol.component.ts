import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-foto-ol',
  templateUrl: './foto-ol.component.html',
  styleUrls: ['./foto-ol.component.css']
})
export class FotoOlComponent {
  @Input() teamName: string ='';
  // aktuelle Koordinaten mit o,o initialisieren
  center: { lng: number; lat: number; } = {lng: 0, lat: 0};

  // Strafpunkte (Summe der Distanz in Meter von den Foto-Koordinaten).
  result = 0;

  // Ablaufsteuerung
  showHelp = true;

  hasStarted = false;
  showFotos = false;
  showMap = false;
  showHint = false;
  amZiel = false;

  // Index des zu suchenden Fotos
  index = 0;

  // Fotos mit ihren Koordinaten und Hilfetexten.
  photos = [
    {
      photoUrl: '../../assets/images/Bild.1.jpg',
      coordinates: {
        lat: 46.773503,
        lng: 7.635052
      },
      hint: 'Bushaltestelle Ziegeieistrasse'
    },
    {
      photoUrl: '../../assets/images/Bild.2.jpg',
      coordinates: {
        lat: 46.774693,
        lng: 7.636625
      },
      hint: 'Obere Ecke Bösbachstrasse'
    },
    {
      photoUrl: '../../assets/images/Bild.3.jpg',
      coordinates: {
        lat: 46.775042,
        lng: 7.634388
      },
      hint: 'Bösbach-Finkenweg'
    },
    {
      photoUrl: '../../assets/images/Bild.4.jpg',
      coordinates: {
        lat: 46.773958,
        lng: 7.633619
      },
      hint: 'Lin Den Weg'
    }
  ];
  lastDistance = 0;
  setTeamName(teamName: string) {
    this.teamName = teamName;
  }

  start() {
    if (this.teamName != '') {
      this.showHelp = false;
      this.hasStarted = true;
      this.showFotos = true;
    }
  }

  getPhotoUrl() {
    return (this.photos)[this.index].photoUrl;
  }
  setCurrentCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log("setCurrentCoordinates center:",this.center);
    });
    this.showMap = true;
  }

  nextPhoto() {
    this.showHint = false;
    this.lastDistance = this.getDistance();
    this.result += this.lastDistance;
    this.showMap = false;
    this.index ++;
    if (this.index >= this.photos.length) {
      this.amZiel = true;
      this.showFotos = false;
    }
  }

  getHint() {
    if (!this.showHint) {
      this.result += 10
    }
    this.showHint = true;
    return (this.photos)[this.index].hint;
  }

  getDistance(): number {
    const x1 = this.center?.lat;
    const x2 = this.photos[this.index].coordinates.lat;
    const y1 = this.center?.lng;
    const y2 = this.photos[this.index].coordinates.lng;

    const a = x1 - x2;
    const b = y1 - y2;
    const c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

    return Math.trunc(c * 1000); //in Meter umrechnen
  }
}
