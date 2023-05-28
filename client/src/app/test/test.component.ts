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
}
// @NgModule({
//   imports: [
//     BrowserModule,
//     AgmCoreModule.forRoot({
//       apiKey: 'js?key=AIzaSyDgis2iX80pwT7BLUSTPGrGRMK-jKMMjxI'
//     })
//   ],
//   declarations: [ AppComponent ],
//   bootstrap: [ AppComponent ]
// }) ;
