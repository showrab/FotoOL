import {Component, Input, OnInit} from '@angular/core';
import {FotoOlService} from "../foto-ol.service";
import {HighScore} from "../model/high-score";

@Component({
  selector: 'app-ziel',
  templateUrl: './ziel.component.html',
  styleUrls: ['./ziel.component.css']
})
export class ZielComponent implements OnInit {
  @Input() isAdmin: boolean | undefined;
  @Input() tourName: string | undefined;

  highScores: any;

  constructor(private fotoOlService: FotoOlService) {
  }
  ngOnInit() {
    this.loadHighScore();
  }

  loadHighScore() {
    this.fotoOlService.getHighScoreTour(this.tourName).subscribe( (highScores: HighScore) => {
      this.highScores = highScores;
    });
  }
  delete(id: number) {
    this.fotoOlService.deleteHighScore(id).subscribe(() => {
      this.loadHighScore();
    });
  }
}
