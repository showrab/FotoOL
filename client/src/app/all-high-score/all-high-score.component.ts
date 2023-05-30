import {Component, Input} from '@angular/core';
import {FotoOlService} from "../foto-ol.service";
import {Tour} from "../model/tour";

@Component({
  selector: 'app-all-high-score',
  templateUrl: './all-high-score.component.html',
  styleUrls: ['./all-high-score.component.css']
})
export class AllHighScoreComponent {
  @Input() tourList: Tour[] | undefined;
}
