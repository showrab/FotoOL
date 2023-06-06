import { Component } from '@angular/core';
//import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  lat: number = 51.678418;
  lng: number = 7.809007;




  getRichtung(b: number, a: number): string {
    let rad = Math.atan(b/a);
    console.log("Richtung rad", rad);

    let grad = rad * (180 / Math.PI);
    if (a < 0 && b >= 0) grad += 180;
    if (a < 0 && b < 0) grad += 180;
    if (a >= 0 && b < 0) grad += 360;

    console.log("Richtung grad", grad);
    let pm = 11.25;
    if (grad > 0 - pm && grad <= 0 + pm) return "Nord N";
    if (grad > 22.5 - pm && grad <= 22.5 + pm) return "Nordnordost NNO";
    if (grad > 45 - pm && grad <= 45 + pm) return "Nordost NO";
    if (grad > 67.5 - pm && grad <= 67.5 + pm) return "Ostnordost ONO";
    if (grad > 90 - pm && grad <= 90 + pm) return "Osten O";
    if (grad > 112.5 - pm && grad <= 112.5 + pm) return "Ostsüdost OSO";
    if (grad > 135 - pm && grad <= 135 + pm) return "Südost SO";
    if (grad > 157.5 - pm && grad <= 157.5 + pm) return "Südsüdost	SSO";
    if (grad > 180 - pm && grad <= 180 + pm) return "Süden	S";
    if (grad > 202.5 - pm && grad <= 202.5 + pm) return "Südsüdwest	SSW";
    if (grad > 225 - pm && grad <= 225 + pm) return "Südwest	SW";
    if (grad > 247.5 - pm && grad <= 247.5 + pm) return "Westsüdwest	WSW";
    if (grad > 270 - pm && grad <= 270 + pm) return "Westen	W";
    if (grad > 292.5 - pm && grad <= 292.5 + pm) return "Westnordwest	WNW";
    if (grad > 315 - pm && grad <= 315 + pm) return "Nordwest	NW";
    if (grad > 337.5 - pm && grad <= 337.5 + pm) return "Nordnordwest	NNW";
    return grad + '°';
  }

  protected readonly Math = Math;
}

