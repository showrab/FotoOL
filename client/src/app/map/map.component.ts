import {Component, Input, AfterViewInit, SimpleChange} from '@angular/core';
import {Center} from "../model/center";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  @Input() center: Center | undefined;
  zoom = 20;
  map: any;
  marker:any;

  constructor() {
    console.log("Constructor center:", this.center);
  }

  ngAfterViewInit(): void {
    // console.log("ngAfterViewInit center:", this.center);
    //const map = document.getElementById("map");
    // this.map = new google.maps.Map(
    //   document.getElementById("map") as HTMLElement,
    //   {
    //     mapTypeId: 'hybrid',
    //     zoomControl: true,
    //     scrollwheel: false,
    //     disableDoubleClickZoom: true,
    //     maxZoom: 20,
    //     minZoom: 0,
    //     heading: 180,
    //     zoom: this.zoom,
    //     center: this.center
    //   }
    // );
    // this.marker = new google.maps.Marker({
    //   position: {
    //     lat: 46.76213,
    //     lng: 7.63025
    //   },
    //   map: this.map,
    //   title: "Von hier wurde Fotografiert",
    //   draggable: true
    // });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    // Extract changes to the input property by its name
    let change: SimpleChange = changes['center'];
    this.map.center = change.currentValue;
    //this.map.refresh;
    this.marker.center =change.currentValue;
    //this.marker.refresh;
    console.log("changed center=", this.map.center);

    // Whenever the data in the parent changes, this method gets triggered
    // You can act on the changes here. You will have both the previous
    // value and the  current value here.
  }

  // map: google.maps.Map = {
  //   setCenter(this.center, );
  // }
  //
  //   setCenter(latlng: google.maps.LatLng | google.maps.LatLngLiteral) {
  // };

  // options: google.maps.MapOptions = {
  //   mapTypeId: 'hybrid',
  //   zoomControl: true,
  //   scrollwheel: true,
  //   disableDoubleClickZoom: true,
  //   maxZoom: 20,
  //   minZoom: 8,
  //   heading: 180,
  //
  // };

}
