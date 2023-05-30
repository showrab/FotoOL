import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Photo} from "../../model/photo";

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent {
  // @ts-ignore
  @Input() photo: Photo;
  @Output() savePhoto  = new EventEmitter;
  @Output() cancel  = new EventEmitter;
  @Output() delete  = new EventEmitter;

  doSavePhoto() {
    console.log("photo {id: %d, tour: %s, hidden: %s, sortOrder: %d, lat: %f, lng: %f, hint: %s}",this.photo?.id, this.photo?.tourName, this.photo?.hidden, this.photo?.sortOrder, this.photo?.lat, this.photo?.lng, this.photo?.hint)
    this.savePhoto.emit(this.photo);
  }

  doCancel() {
    this.cancel.emit();
  }

  doDelete(id: number) {
    this.delete.emit(id);
  }
}
