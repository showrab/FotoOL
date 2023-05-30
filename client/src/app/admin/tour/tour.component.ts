import {Component, Input, OnInit} from '@angular/core';
import {Tour} from "../../model/tour";
import {FotoOlService} from "../../foto-ol.service";
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit{
  tourList: Tour[] | undefined;

  constructor(private fotoOlService: FotoOlService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.fotoOlService.getTourList().subscribe((tourList) => {
      this.tourList = tourList;
    })
  }
  save(tour: Tour) {
    console.log("tour: ",tour);
    this.fotoOlService.saveTour(tour).subscribe();
  }

  delete(id: number) {
    this.fotoOlService.deleteTour(id).subscribe(()=>{
      this.load();
    });
  }

  hide(changedTour: Tour) {
    changedTour.hidden = !changedTour.hidden;
    this.fotoOlService.saveTour(changedTour).subscribe(() => {
      console.log("hidden: ", changedTour.tourName);
      this.load();
    });
  }
}
