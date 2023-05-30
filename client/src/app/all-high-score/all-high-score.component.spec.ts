import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHighScoreComponent } from './all-high-score.component';

describe('AllHighScoreComponent', () => {
  let component: AllHighScoreComponent;
  let fixture: ComponentFixture<AllHighScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHighScoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllHighScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
