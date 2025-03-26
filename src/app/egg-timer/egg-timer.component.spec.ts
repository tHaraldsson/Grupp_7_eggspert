import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EggTimerComponent } from './egg-timer.component';

describe('EggTimerComponent', () => {
  let component: EggTimerComponent;
  let fixture: ComponentFixture<EggTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EggTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EggTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
