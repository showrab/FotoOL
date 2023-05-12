import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZielComponent } from './ziel.component';

describe('ZielComponent', () => {
  let component: ZielComponent;
  let fixture: ComponentFixture<ZielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
