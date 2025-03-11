import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerButtonComponent } from './timer-button.component';

describe('TimerButtonComponent', () => {
  let component: TimerButtonComponent;
  let fixture: ComponentFixture<TimerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
