import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousTimerButtonComponent } from './continuous-timer-button.component';

describe('ContinuousTimerButtonComponent', () => {
  let component: ContinuousTimerButtonComponent;
  let fixture: ComponentFixture<ContinuousTimerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinuousTimerButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuousTimerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
