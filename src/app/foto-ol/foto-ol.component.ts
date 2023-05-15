import { Component, Input } from '@angular/core';
import { fotoList } from './foto-list';

@Component({
  selector: 'app-foto-ol',
  templateUrl: './foto-ol.component.html',
  styleUrls: ['./foto-ol.component.css']
})
export class FotoOlComponent {
  teamName: string = '';

  readonly fotoList = fotoList;
  // Index des zu suchenden Fotos
  index = 0;

  // aktuelle Koordinaten mit o,o initialisieren
  center: { lng: number; lat: number; } = {lng: 0, lat: 0};
  // Strafpunkte (Summe der Distanz in Meter von den Foto-Koordinaten).
  result = 0;
  lastDistance = 0;

  //Konfiguration
  skipMap = true;
  HINT_PENALTY: number = 10;

  // Ablaufsteuerung
  showHelp = true;
  hasStarted = false;
  showFotos = false;
  showMap = false;
  showHint = false;

  amZiel = false;

  /** wird von HelpComponent.setTeamName() bei jedem Buchstaben vom Input aufgerufen.
   *
   * @param teamName
   */
  setTeamName(teamName: string) {
    this.teamName = teamName;
  }

  /** OL Starten */
  start() {
    if (this.teamName != '') {
      this.showHelp = false;
      this.hasStarted = true;
      this.showFotos = true;
    }
  }

  /** URL zum aktuellen Bild. */
  getPhotoUrl() {
    return (fotoList.photos)[this.index].photoUrl;
  }

  /** Aktuelle Koordinaten speichern. */
  setCurrentCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log("setCurrentCoordinates center:",this.center);

      if (this.skipMap) {
        this.nextPhoto();
      } else {
        this.showMap = true;
      }
    });
  }

  /** nächstes Foto anzeigen */
  nextPhoto() {
    this.showHint = false;
    this.lastDistance = this.getDistanceFromLatLonInM();
    this.result += this.lastDistance;
    this.showMap = false;

    this.index ++;
    if (this.index >= fotoList.photos.length) {
      this.amZiel = true;
      this.showFotos = false;
    }
  }

  /** Hilfetext anzeigen
   * Strafpunkte zum resultat hinzufügen
   */
  getHint() {
    if (!this.showHint) {
      this.result += this.HINT_PENALTY;
    }
    this.showHint = true;
    return (fotoList.photos)[this.index].hint;
  }

  /** Bereschne die Distanz von deinem Standpunkt zu dem Foto
   *
   */
  getDistanceFromLatLonInM() {
    const r = 6373.0;
    const lat1 = this.center?.lat;
    const lat2 = fotoList.photos[this.index].coordinates.lat;
    const lon1 = this.center?.lng;
    const lon2 = fotoList.photos[this.index].coordinates.lng;

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

}
