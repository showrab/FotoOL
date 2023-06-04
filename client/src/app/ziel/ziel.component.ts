import {Component, Input, OnInit} from '@angular/core';
import {FotoOlService} from "../foto-ol.service";
import {HighScore} from "../model/high-score";
import {Observable, startWith, Subject, Subscription, switchMap, timer} from "rxjs";

@Component({
  selector: 'app-ziel',
  templateUrl: './ziel.component.html',
  styleUrls: ['./ziel.component.css']
})
export class ZielComponent implements OnInit {
  @Input() isAdmin: boolean | undefined;
  @Input() tourName: string | undefined;

  highScores: any;
  private reset$ = new Subject();
  timer$: Observable<any>;
  subscription: Subscription | undefined;

  constructor(private fotoOlService: FotoOlService) {
    //Timer von 30s starten
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(0, 30000))
    );
  }
  ngOnInit() {
    this.loadHighScore();
    // Timer wird alle 30s aufgerufen
    this.subscription = this.timer$.subscribe((i) => {
      this.loadHighScore();
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
