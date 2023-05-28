import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ziel',
  templateUrl: './ziel.component.html',
  styleUrls: ['./ziel.component.css']
})
export class ZielComponent implements OnInit {
  @Input() result: any;
  @Input() teamName: any;

  index: number = 0;

  hightScores = [
    {
      result: 10,
      teamName: 'Andre'
    },
    {
      result: 25,
      teamName: 'Äxu'
    },
    {
      result: 30,
      teamName: 'Tinu'
    },
  ];

  ngOnInit() {
    this.hightScores.push({teamName: this.teamName, result: this.result});
    this.hightScores.sort( (a, b) => {
      return a.result - b.result;
    })
  }

}
