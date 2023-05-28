import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoOlComponent } from './foto-ol.component';

describe('FotoOlComponent', () => {
  let component: FotoOlComponent;
  let fixture: ComponentFixture<FotoOlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoOlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoOlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
