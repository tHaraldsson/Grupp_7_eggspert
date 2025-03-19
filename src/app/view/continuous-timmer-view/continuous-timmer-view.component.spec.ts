import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousTimmerViewComponent } from './continuous-timmer-view.component';

describe('ContinuousTimmerViewComponent', () => {
  let component: ContinuousTimmerViewComponent;
  let fixture: ComponentFixture<ContinuousTimmerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinuousTimmerViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuousTimmerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
