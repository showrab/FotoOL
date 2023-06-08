import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Photo } from "../../model/photo";
import { NgxSpinnerService } from 'ngx-spinner';
import {Center} from "../../model/center";
import {FotoOlService} from "../../foto-ol.service";

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit{
  // @ts-ignore
  @Input() photo: Photo;
  @Output() savePhoto  = new EventEmitter;
  @Output() cancel  = new EventEmitter;
  @Output() delete  = new EventEmitter;
  realUrl: boolean = true;
  photoUrl: string = '';
  center: Center = { lat: 0, lng: 0, acc: 0};

  constructor(
    private spinner: NgxSpinnerService,
    private fotoOlService: FotoOlService,
  ) {}

  ngOnInit(): void {
    if (this.photo.photoUrl.startsWith('data:image')) this.realUrl = false;
    this.center.lat = this.photo.lat;
    this.center.lng = this.photo.lng;
  }

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

  onFileChange(event: Event) {
    this.spinner.show();
    this.realUrl = false;
    this.photoUrl = '';
    const reader = new FileReader();
    // @ts-ignore
    if(event.target.files && event.target.files.length) {
      // @ts-ignore
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.photo.photoUrl = reader.result as string;
        // this.myForm.patchValue({
        //   fileSource: reader.result
        // });
        this.spinner.hide();
      };
    }
  }

  setPhotoUrl(value:string) {
    this.spinner.show();
    this.realUrl = true;
    this.photo.photoUrl=value;
    this.spinner.hide();
  }

  setNewCenter(center: Center) {
    console.log("setNewCenter: ",center);
    this.center = center;
    this.photo.lat = center.lat;
    this.photo.lng = center.lng;
  }
}
