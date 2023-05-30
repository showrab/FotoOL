import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Photo} from "../../model/photo";

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent {
  @Input() photos: Photo[] | undefined;
  @Output() deletePhoto = new EventEmitter;
  @Output() updatePhoto = new EventEmitter;
  tour: any;

  delete(id: number) {
    this.deletePhoto.emit(id)
  }

  update(photo: Photo) {
    //photo.tour = this.photos?.[0].tour;
    console.log("photo {id: %d, tour: %s, hidden: %s, sortOrder: %d, lat: %f, lng: %f, hint: %s}",photo.id, this.photos?.[0].tourName, photo.hidden, photo.sortOrder, photo.lat, photo.lng, photo.hint)

    this.updatePhoto.emit(photo);
  }
}
