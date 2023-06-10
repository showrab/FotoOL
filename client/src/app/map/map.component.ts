import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import * as L from "leaflet";
import {LayerGroup, MapOptions, Marker, MarkerOptions, tileLayer} from "leaflet";
import {Center} from "../model/center";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() center: Center = {lat: 46.7719464, lng: 7.6138311, acc: 0};
  @Output() newCenter = new EventEmitter<Center>();

  map: L.Map | undefined;
  markersLayer = new L.LayerGroup();
  sMarkersLayer: LayerGroup | undefined;
  zoomLevel = 19;
  iconUrl = "../assets/images/marker2.png";
  marker: Marker | undefined;

  options: L.MapOptions = {
    zoom: this.zoomLevel,
    touchZoom: false,
    scrollWheelZoom: false,
    zoomControl: false,
    boxZoom: false,
    center: L.latLng(this.center.lat, this.center.lng),
    layers: [
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ]
  };

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes: ", changes);
    // Karte neu zuentrieren
    this.map?.setView(this.center);

    this.sMarkersLayer?.clearLayers();
    let icon = new L.DivIcon({
      html: `<img src='${this.iconUrl}'/> <span>${''}</span>`
    });
    //Marker hinzufügen
    // @ts-ignore
    this.marker = L.marker([this.center.lat, this.center.lng], {icon}).addTo(this.map);
    // @ts-ignore
    this.sMarkersLayer.addLayer(this.marker);
    // @ts-ignore
    this.sMarkersLayer?.addLayer(L.circle([this.center.lat, this.center.lng], {radius: this.center.acc /2 }).addTo(this.map));
  }

  onMapReady(map: L.Map) {
    setTimeout(() => {
      // Karte neu zuentrieren
      this.map?.setView(this.center, this.zoomLevel);

      map.invalidateSize();
      this.map = map;
      map.addLayer(this.markersLayer);
      this.createStations();

      // @ts-ignore
      this.map.on('click', (e) => {
        let icon = new L.DivIcon({
          html: `<img src='${this.iconUrl}'/> <span>${''}</span>`
        });
        this.sMarkersLayer?.clearLayers();
        this.marker = L.marker([e.latlng.lat, e.latlng.lng], {icon});
        this.sMarkersLayer?.addLayer(this.marker);
        this.newCenter.emit({lat: e.latlng.lat, lng: e.latlng.lng, acc: 0});
      });
    }, 200);
  }

  createStations() {
    this.sMarkersLayer = new L.LayerGroup();

    let icon = new L.DivIcon({
      html: `<img src='${this.iconUrl}'/> <span>${''}</span>`
    });
    this.marker = L.marker([this.center.lat, this.center.lng], {icon});


    this.sMarkersLayer.addLayer(this.marker);
    // @ts-ignore
    this.sMarkersLayer?.addLayer(L.circle([this.center.lat, this.center.lng], {radius: this.center.acc /2 }).addTo(this.map));

    this.markersLayer.addLayer(this.sMarkersLayer);
  }


  ngOnInit() {
    // Karte neu zuentrieren
    this.map?.setView(this.center, this.zoomLevel);
    this.options = {
      zoom: this.zoomLevel,
      center: L.latLng(this.center.lat, this.center.lng),
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    };
  }
}

