import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  @Output() teamName = new EventEmitter<string>();
  setTeamName(teamName: string) {
    this.teamName.emit(teamName);
  }
}
