import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FotoOlService} from "../foto-ol.service";
import {Tour} from "../model/tour";
import {HighScore} from "../model/high-score";

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  @Input() anzBilder: any;
  @Input() hintPenalty: number | undefined;
  @Input() teamName: string | undefined;
  @Output() teamNameEmitter = new EventEmitter<string>();
  @Output() teamErr = new EventEmitter<HighScore[]>();
  @Output() showHighScore = new EventEmitter<string>();

  teamNameError: string = '';
  tourList: Tour[] | undefined;

  constructor(private fotoOlService: FotoOlService){
    fotoOlService.getTour().subscribe((tourList) => {
       this.tourList = tourList;
    });
  }

  /** wird von HelpComponent.setTeamName() bei jedem Buchstaben vom Input aufgerufen.
   *
   * @param teamName
   */
  setTeamName(teamName: string) {
    this.teamNameEmitter.emit(teamName);
    if (teamName) {
      this.fotoOlService.findTeamName(teamName).subscribe( (team) => {
        console.log("team ", team.length );
        if (team.length <= 0) {
          this.teamErr.emit(team);
          this.teamNameEmitter.emit(teamName);
          this.teamNameError = '';
        } else {
          this.teamErr.emit(team);
          this.teamNameError = 'Team schon unterwegs, wähle anderen Namen.';
        }
      },error => {
        this.teamErr.emit(undefined);
        this.teamNameEmitter.emit('');
        this.teamNameError = '';
      });
    } else {
      this.teamErr.emit(undefined);
      this.teamNameError = '';
    }
  }

  doShowHighScore() {
    this.showHighScore.emit("all");
  }
}
